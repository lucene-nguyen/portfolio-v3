import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const grid = (page: Page) => page.getByRole("region", { name: "At a glance" });
const order = (page: Page) =>
  grid(page)
    .locator("[data-tile]")
    .evaluateAll((els) => els.map((e) => e.getAttribute("data-tile")));

test.beforeEach(async ({ page }) => {
  await page.goto("/?theme=bento");
  await expect(grid(page)).toBeVisible();
});

test("keyboard: move controls reorder, keep focus, announce, persist; reset restores", async ({
  page,
}) => {
  const initial = await order(page);
  expect(initial.slice(0, 3)).toEqual(["about", "photo", "stats"]);
  const down = grid(page).getByRole("button", { name: "Move About later" });
  await down.focus();
  await page.keyboard.press("Enter");
  expect((await order(page)).slice(0, 2)).toEqual(["photo", "about"]);
  await expect(grid(page).getByRole("button", { name: "Move About later" })).toBeFocused();
  await expect(grid(page).getByRole("status")).toHaveText("About moved to position 2 of 9.");
  await page.reload();
  await expect(grid(page)).toBeVisible();
  expect((await order(page)).slice(0, 2)).toEqual(["photo", "about"]);
  // A keyboard move followed by Reset: focus stays on Reset (no jump back into the grid).
  await grid(page).getByRole("button", { name: "Move About earlier" }).focus();
  await page.keyboard.press("Enter");
  const reset = grid(page).getByRole("button", { name: "Reset layout" });
  await reset.focus();
  await page.keyboard.press("Enter");
  expect(await order(page)).toEqual(initial);
  await expect(reset).toBeFocused();
});

test("first tile cannot move earlier", async ({ page }) => {
  await expect(grid(page).getByRole("button", { name: "Move About earlier" })).toHaveAttribute(
    "aria-disabled",
    "true",
  );
});

test("drag and drop reorders", async ({ page }) => {
  // Real DOM drag events (mouse-driven HTML5 drag is unreliable in headless Chromium).
  const dt = await page.evaluateHandle(() => new DataTransfer());
  const src = grid(page).locator("[data-tile=contact]");
  const dst = grid(page).locator("[data-tile=about]");
  await src.dispatchEvent("dragstart", { dataTransfer: dt });
  await dst.dispatchEvent("dragover", { dataTransfer: dt });
  await dst.dispatchEvent("drop", { dataTransfer: dt });
  await src.dispatchEvent("dragend", { dataTransfer: dt });
  expect((await order(page))[0]).toBe("contact");
});

test("single column at 375px; no horizontal scroll; axe clean", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  const lefts = await grid(page)
    .locator("[data-tile]")
    .evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().left)));
  expect(new Set(lefts).size).toBe(1);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("desktop: mixed sizes and axe clean", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const about = await grid(page).locator("[data-tile=about]").boundingBox();
  const stats = await grid(page).locator("[data-tile=stats]").boundingBox();
  expect(about!.width).toBeGreaterThan(stats!.width * 1.8);
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("shared sections are restyled as tiles", async ({ page }) => {
  const cards = page.locator('#work [data-part="case-card"]');
  await expect(cards.first()).toHaveCSS("border-top-left-radius", "24px");
  await expect(cards.first()).toHaveCSS("border-top-width", "0px");
  await expect(page.locator('#work [data-part="eyebrow"]')).toHaveCSS(
    "border-top-left-radius",
    "999px",
  );
  await expect(page.locator('[data-part="role"]').first()).toHaveCSS(
    "border-top-left-radius",
    "24px",
  );
  await expect(page.locator('[data-part="kit"] > *').first()).toHaveCSS(
    "border-top-left-radius",
    "24px",
  );
  await expect(page.locator('[data-part="stat"]').first()).toHaveCSS(
    "border-top-left-radius",
    "16px",
  );
  // Wide feature tile: the first study spans both columns at desktop width.
  const [a, b] = await cards.evaluateAll((els) =>
    els.slice(0, 2).map((e) => e.getBoundingClientRect()),
  );
  expect(a.width).toBeGreaterThan(b.width * 1.8);
  // One column on phones.
  await page.setViewportSize({ width: 375, height: 800 });
  const widths = await cards.evaluateAll((els) =>
    els.map((e) => Math.round(e.getBoundingClientRect().width)),
  );
  expect(new Set(widths).size).toBe(1);
});
