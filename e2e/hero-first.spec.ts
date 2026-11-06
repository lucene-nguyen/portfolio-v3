import { expect, test } from "@playwright/test";
import { activeThemes as themes } from "../themes/registry";

// Themes whose signature block lives directly below the shared hero.
const withBlock = new Set([
  "blueprint",
  "dashboard",
  "bento",
  "neo-brutalism",
  "anime",
  "3d-world",
]);

for (const { id } of themes) {
  test(`hero first: ${id}`, async ({ page }) => {
    await page.goto(`/?theme=${id}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", id);
    // The hero is the first element of <main>, the theme slot right after it.
    const order = await page
      .locator("main")
      .evaluate((m) => [...m.children].slice(0, 2).map((c) => c.id));
    expect(order).toEqual(["top", "theme-slot-home"]);
    const slot = page.locator("#theme-slot-home > *");
    if (withBlock.has(id)) await expect(slot).not.toHaveCount(0);
    else {
      // Give lazy theme chunks time to mount before asserting the slot stays empty.
      await page.waitForTimeout(500);
      await expect(slot).toHaveCount(0);
    }
  });
}
