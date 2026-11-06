import { expect, test } from "@playwright/test";

// No console errors, page errors or hydration mismatches on load, and none from an autofill-style
// keydown (Chrome fires keydown events without a `key` when it autofills a form).
for (const path of ["/", "/vi"]) {
  test(`clean console: ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error" || /hydrat/i.test(m.text())) errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.dispatchEvent(new KeyboardEvent("keydown", {})));
    await page.getByRole("form").getByLabel(/Email/).first().press("Tab");
    expect(errors).toEqual([]);
  });
}
