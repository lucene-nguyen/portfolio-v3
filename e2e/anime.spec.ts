import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const strip = (page: Page) => page.getByRole("region", { name: "The story so far" });

test.beforeEach(async ({ page }) => {
  await page.goto("/?theme=anime");
  await expect(strip(page)).toBeVisible();
});

test("one panel per role with alt text and speech bubbles", async ({ page }) => {
  const panels = strip(page)
    .getByRole("listitem")
    .filter({ has: page.getByRole("img") });
  await expect(panels).toHaveCount(3);
  await expect(strip(page).getByRole("img")).toHaveCount(3);
  for (const img of await strip(page).getByRole("img").all()) {
    await expect(img).toHaveAttribute("aria-label", /Abstract manga panel for .+ No characters\./);
  }
  await expect(strip(page).locator("blockquote").first()).toContainText("Founding engineer");
});

test("story is also available as plain text", async ({ page }) => {
  await strip(page).getByText("Read the story as plain text").click();
  const text = strip(page).locator("details ol");
  await expect(text).toBeVisible();
  await expect(text.getByRole("listitem")).toHaveCount(3);
  await expect(text).toContainText("FPT Software");
});

test("bubble text contrast, axe clean, 375px", async ({ page }) => {
  const bubble = strip(page).locator("blockquote").first();
  await expect(bubble).toHaveCSS("color", "rgb(17, 17, 17)");
  await expect(bubble).toHaveCSS("background-color", "rgb(255, 255, 255)");
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await page.setViewportSize({ width: 375, height: 800 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
