import { expect, test } from "@playwright/test";

test("home renders with Portfolio v3 tokens and fonts", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const body = page.locator("body");
  await expect(body).toHaveCSS("background-color", "rgb(11, 15, 20)");
  expect(await body.evaluate((el) => getComputedStyle(el).fontFamily)).toMatch(/Inter Tight/);
});
