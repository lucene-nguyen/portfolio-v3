import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, info) => {
  await page.setExtraHTTPHeaders({
    "x-forwarded-for": `198.18.${info.workerIndex}.${Date.now() % 250}`,
  });
});

const button = (page: import("@playwright/test").Page) =>
  page.getByRole("button", { name: /Achievements \d\/3/ });

test("pixel font on headings only; body stays readable", async ({ page }) => {
  await page.goto("/?theme=pixel");
  await expect(button(page)).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-family", /Press Start 2P/);
  const body = await page
    .locator("#top p")
    .nth(1)
    .evaluate((el) => getComputedStyle(el).fontFamily);
  expect(body).not.toMatch(/Press Start/);
  expect(body).toMatch(/Inter Tight/);
});

test("achievements: list shows locked/unlocked; unlocking announces a toast", async ({ page }) => {
  await page.goto("/?theme=pixel");
  await button(page).click();
  const dialog = page.getByRole("dialog", { name: "Achievements" });
  await expect(dialog.getByRole("listitem").filter({ hasText: "Slow down!" })).toContainText(
    "Locked",
  );
  await dialog.getByRole("button", { name: "Close" }).click();

  await page.locator("#lab").getByRole("button", { name: "Burst × 10" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Achievement unlocked" })).toContainText(
    "Slow down!",
  );
  await button(page).click();
  await expect(dialog.getByRole("listitem").filter({ hasText: "Slow down!" })).toContainText(
    "Unlocked",
  );
  expect(
    JSON.parse((await page.evaluate(() => localStorage.getItem("achievements:v1")))!).hit429,
  ).toBe(true);
});

test("reading a case study unlocks Bookworm (tracked in any theme)", async ({ page }) => {
  await page.goto("/work/pharmacy-inventory");
  await page.goto("/?theme=pixel");
  await button(page).click();
  await expect(
    page.getByRole("dialog").getByRole("listitem").filter({ hasText: "Bookworm" }),
  ).toContainText("Unlocked");
});

test("explorer tracks themes seen", async ({ page }) => {
  await page.goto("/?theme=pixel");
  await button(page).click();
  await expect(
    page.getByRole("dialog").getByRole("listitem").filter({ hasText: "Explorer" }),
  ).toContainText(/Locked · 1\/\d+/);
});

test("sound is off by default, has a visible toggle that persists", async ({ page }) => {
  await page.goto("/?theme=pixel");
  await button(page).click();
  const toggle = page.getByRole("checkbox", { name: "Sound effects" });
  await expect(toggle).toBeVisible();
  await expect(toggle).not.toBeChecked();
  await toggle.check();
  expect(await page.evaluate(() => localStorage.getItem("pixel:sound"))).toBe("on");
});

test("mana bar, axe clean, 375px", async ({ page }) => {
  await page.goto("/?theme=pixel");
  await expect(button(page)).toBeVisible();
  // The fixed button must not cover the end of the page.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const btn = await button(page).boundingBox();
  const last = await page.locator("footer span").last().boundingBox();
  expect(last!.y + last!.height).toBeLessThanOrEqual(btn!.y + 1);
  const label = await page
    .locator("#lab-meter-label")
    .evaluate((el) => getComputedStyle(el, "::before").content);
  expect(label).toContain("MANA");
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await page.setViewportSize({ width: 375, height: 800 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
