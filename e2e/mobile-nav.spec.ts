import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { themes } from "../themes/registry";

test.use({ viewport: { width: 375, height: 812 } });

for (const { id } of themes) {
  test(`375px header is one line and floating buttons never cover content: ${id}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/?theme=${id}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", id);
    const nav = page.getByRole("navigation", { name: "Main" });
    const tops = await Promise.all(
      [
        nav.getByRole("link", { name: "cuong.dev" }),
        page.getByLabel("Theme"),
        nav.getByRole("button", { name: "Menu" }),
      ].map(async (l) => (await l.boundingBox())!),
    );
    const mid = (b: { y: number; height: number }) => b.y + b.height / 2;
    for (const b of tops) expect(Math.abs(mid(b) - mid(tops[0]))).toBeLessThan(12);
    await expect(nav.getByRole("link", { name: "Work" })).toBeHidden();
    // No fixed-position control on mobile.
    const fixed = await page.evaluate(
      () =>
        [...document.querySelectorAll("button, a")].filter(
          // offsetParent is always null for fixed elements; checkVisibility is the real test.
          (el) => getComputedStyle(el).position === "fixed" && el.checkVisibility(),
        ).length,
    );
    expect(fixed).toBe(0);
  });
}

test("menu opens and closes; keyboard and screen-reader operable", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const toggle = nav.getByRole("button", { name: "Menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(nav.getByRole("link", { name: "Work" })).toBeVisible();
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("Pixel achievements open from the menu on mobile", async ({ page }) => {
  await page.goto("/?theme=pixel");
  const nav = page.getByRole("navigation", { name: "Main" });
  await nav.getByRole("button", { name: "Menu" }).click();
  const entry = nav.getByRole("button", { name: /Achievements \d\/3/ });
  await entry.click();
  const dialog = page.getByRole("dialog", { name: "Achievements" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  // Focus returns to the (still open) menu entry, not <body>; Esc again closes the menu onto its toggle.
  await expect(entry).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nav.getByRole("button", { name: "Menu" })).toBeFocused();
});

test("desktop keeps the inline nav (no menu button)", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("button", { name: "Menu" })).toBeHidden();
  await expect(nav.getByRole("link", { name: "Work" })).toBeVisible();
});
