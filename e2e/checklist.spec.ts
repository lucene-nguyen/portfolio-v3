import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// ui-ux-pro-max pre-delivery checklist, the parts that can be measured (UI round 1, restyled themes).
const THEMES = ["blueprint", "pixel"];

const overflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

for (const id of THEMES) {
  test.describe(`pre-delivery checklist: ${id}`, () => {
    test("375px, landscape phone and 200% zoom: no horizontal scroll", async ({ page }) => {
      for (const size of [
        { width: 375, height: 812 },
        { width: 812, height: 375 },
      ]) {
        await page.setViewportSize(size);
        await page.goto(`/?theme=${id}`);
        await expect(page.locator("html")).toHaveAttribute("data-theme", id);
        // Measure the settled page (theme layouts and features mount after hydration).
        await page.waitForLoadState("networkidle").catch(() => {});
        expect(await overflow(page), `${size.width}x${size.height}`).toBeLessThanOrEqual(0);
      }
      // 200% browser zoom on a 1440px screen = a 720px CSS viewport.
      await page.setViewportSize({ width: 720, height: 450 });
      await page.goto(`/?theme=${id}`);
      await page.waitForLoadState("networkidle").catch(() => {});
      expect(await overflow(page), "200% zoom").toBeLessThanOrEqual(0);
    });

    test("reduced motion: nothing animates", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/?theme=${id}`);
      await page.waitForTimeout(800);
      const running = await page.evaluate(
        () =>
          document
            .getAnimations()
            .filter(
              (a) => a.playState === "running" && (a.effect?.getTiming().duration as number) > 50,
            ).length,
      );
      expect(running).toBe(0);
    });

    test("touch targets ≥ 44px for buttons; axe clean", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(`/?theme=${id}`);
      await page.waitForTimeout(500);
      const small = await page.evaluate(() =>
        [...document.querySelectorAll("button, select")]
          .filter((el) => el.checkVisibility())
          .map((el) => ({
            el: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30),
            r: el.getBoundingClientRect(),
          }))
          .filter(({ r }) => r.height < 44 || r.width < 44)
          .map(({ el }) => el),
      );
      expect(small).toEqual([]);
      const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
      expect(violations.map((v) => v.id)).toEqual([]);
    });
  });
}
