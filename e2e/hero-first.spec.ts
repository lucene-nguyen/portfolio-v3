import { expect, test } from "@playwright/test";
import { themes } from "../themes/registry";

// Every theme opens with the shared hero; a theme's signature block comes directly after it.
for (const { id } of themes) {
  test(`hero first: ${id}`, async ({ page }) => {
    await page.goto(`/?theme=${id}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", id);
    await page.waitForLoadState("networkidle").catch(() => {});
    const order = await page
      .locator("main")
      .evaluate((m) =>
        [...m.children]
          .filter((c) => c.id === "top" || c.id === "theme-slot-home")
          .map((c) => c.id),
      );
    expect(order).toEqual(["top", "theme-slot-home"]);
    const firstVisible = await page
      .locator("main")
      .evaluate((m) => [...m.querySelectorAll("section")].find((s) => s.offsetParent !== null)?.id);
    expect(firstVisible).toBe("top");
  });
}
