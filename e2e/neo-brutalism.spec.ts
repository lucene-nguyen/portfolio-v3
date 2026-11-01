import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const region = (page: Page) => page.getByRole("region", { name: "Sticker board" });
const board = (page: Page) => page.getByTestId("sticker-board");
const list = (page: Page) => page.getByRole("list", { name: "Filter projects by skill" });

test.beforeEach(async ({ page }) => {
  await page.goto("/?theme=neo-brutalism");
  await expect(region(page)).toBeVisible();
});

test("clicking a sticker filters projects; clicking again clears", async ({ page }) => {
  await board(page).getByRole("button", { name: "Databricks" }).click();
  await expect(region(page).getByRole("status")).toHaveText("1 project using Databricks");
  await expect(region(page).getByRole("link", { name: /Read case study/ })).toHaveCount(1);
  await board(page).getByRole("button", { name: "Databricks" }).click();
  await expect(region(page).getByRole("status")).toHaveText("All 3 projects");
});

test("plain list of filter buttons does the same, by keyboard", async ({ page }) => {
  const nest = list(page).getByRole("button", { name: "NestJS" });
  await nest.focus();
  await page.keyboard.press("Enter");
  await expect(nest).toHaveAttribute("aria-pressed", "true");
  await expect(board(page).getByRole("button", { name: "NestJS" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(region(page).getByRole("status")).toHaveText("2 projects using NestJS");
  await list(page).getByRole("button", { name: "Show all" }).click();
  await expect(region(page).getByRole("status")).toHaveText("All 3 projects");
});

test("dragging a sticker moves it without filtering", async ({ page }) => {
  const sticker = board(page).getByRole("button", { name: "Redis" });
  // The board sits below the hero: bring it on screen before using the mouse.
  await sticker.scrollIntoViewIfNeeded();
  const before = (await sticker.boundingBox())!;
  await page.mouse.move(before.x + 10, before.y + 10);
  await page.mouse.down();
  await page.mouse.move(before.x + 90, before.y + 50, { steps: 5 });
  await page.mouse.up();
  const after = (await sticker.boundingBox())!;
  expect(after.x - before.x).toBeGreaterThan(50);
  await expect(sticker).toHaveAttribute("aria-pressed", "false");
  // Dragging far past the edge stays inside the board; no page overflow; Enter still filters.
  const now = (await sticker.boundingBox())!;
  await page.mouse.move(now.x + 10, now.y + 10);
  await page.mouse.down();
  await page.mouse.move(now.x + 2000, now.y + 10, { steps: 5 });
  await page.mouse.up();
  const box = (await board(page).boundingBox())!;
  const end = (await sticker.boundingBox())!;
  expect(end.x + end.width).toBeLessThanOrEqual(box.x + box.width + 8);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  await sticker.focus();
  await page.keyboard.press("Enter");
  await expect(sticker).toHaveAttribute("aria-pressed", "true");
});

test("axe clean; 375px", async ({ page }) => {
  await board(page).getByRole("button", { name: "Redis" }).click();
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await page.setViewportSize({ width: 375, height: 800 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("shared sections are restyled as stickers", async ({ page }) => {
  const shadow = "rgb(0, 0, 0) 6px 6px 0px 0px";
  await expect(page.locator('#work [data-part="eyebrow"]')).toHaveCSS(
    "background-color",
    "rgb(255, 214, 10)",
  );
  const metas = page.locator('#work [data-part="case-meta"]');
  await expect(metas.nth(0)).toHaveCSS("background-color", "rgb(255, 214, 10)");
  await expect(metas.nth(1)).toHaveCSS("background-color", "rgb(124, 242, 156)");
  await expect(metas.nth(2)).toHaveCSS("background-color", "rgb(94, 200, 255)");
  // Header strip runs edge to edge inside the card's 3px border.
  const [card, meta] = await Promise.all([
    page.locator('#work [data-part="case-card"]').first().boundingBox(),
    metas.first().boundingBox(),
  ]);
  expect(meta!.x - card!.x).toBe(3);
  expect(card!.width - meta!.width).toBe(6);
  const fills = [
    "rgb(255, 214, 10)",
    "rgb(124, 242, 156)",
    "rgb(94, 200, 255)",
    "rgb(255, 169, 77)",
  ];
  for (const [i, fill] of fills.entries())
    await expect(page.locator('[data-part="stat"]').nth(i)).toHaveCSS("background-color", fill);
  await expect(page.locator('[data-part="case-metrics"]').first()).toHaveCSS(
    "border-top-width",
    "3px",
  );
  const contact = page.locator('[data-part="contact-actions"] [data-part="button"]').first();
  await expect(contact).toHaveCSS("border-top-width", "3px");
  await expect(contact).toHaveCSS("box-shadow", "rgb(0, 0, 0) 4px 4px 0px 0px");
  const stat = page.locator('[data-part="stat"]').first();
  await expect(stat).toHaveCSS("border-top-width", "3px");
  await expect(stat).toHaveCSS("box-shadow", shadow);
  await expect(page.locator('[data-part="role"]').first()).toHaveCSS("box-shadow", shadow);
  await expect(page.locator('[data-part="stack"]')).toHaveCSS(
    "background-color",
    "rgb(255, 227, 246)",
  );
  await expect(page.locator('[data-part="role"] > span:first-child').first()).toHaveCSS(
    "background-color",
    "rgb(0, 0, 0)",
  );
});
