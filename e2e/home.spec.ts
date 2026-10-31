import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders sections in mockup order", async ({ page }) => {
  await page.goto("/");
  const ids = await page
    .locator("#top, #work, #lab, #kits, #experience, #contact")
    .evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(["top", "work", "lab", "kits", "experience", "contact"]);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I build backends");
  for (const name of [
    "Case studies",
    "Try to break my rate limiter",
    "Starter kits & labs",
    "Where I've shipped",
    "Have a system that needs to scale? Let's talk.",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
});

test("case study cards link to their pages", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page
    .getByRole("link", { name: /Read case study/ })
    .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
  expect(hrefs).toEqual([
    "/work/pharmacy-inventory",
    "/work/ai-image-pipeline",
    "/work/aws-file-ingestion",
  ]);
});

test("no horizontal scroll at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("has no axe violations", async ({ page }) => {
  await page.goto("/");
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
});

test("keyboard: skip link first, then nav, with visible focus ring", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Tab");
  const home = page.getByRole("link", { name: "cuong.dev" });
  await expect(home).toBeFocused();
  await expect(home).toHaveCSS("outline-style", "solid");
  await expect(home).toHaveCSS("outline-color", "rgb(126, 231, 135)");
});

test("keyboard: every link and control is reachable and shows a focus ring", async ({ page }) => {
  await page.goto("/");
  // Theme features load lazily; wait so the count is stable.
  await expect(page.getByRole("button", { name: "Terminal" })).toBeVisible();
  // Closed dialogs are not tabbable; the Next.js dev-tools button exists only in dev.
  const expected = await page
    .locator("a[href], button, select")
    .evaluateAll(
      (els) =>
        els.filter((e) => !e.closest("dialog:not([open])") && !e.hasAttribute("data-next-mark"))
          .length,
    );
  const seen = new Set<string>();
  for (let i = 0; i < expected + 10; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const all = [...document.querySelectorAll("a[href], button, select")];
      return { key: `${all.indexOf(el)} ${el.outerHTML.slice(0, 80)}`, outline: s.outlineStyle };
    });
    // Skip nothing-focused and dev-only overlays (e.g. the Next.js dev tools portal).
    if (!info || info.key.startsWith("-1 ")) continue;
    expect(info.outline, info.key).toBe("solid");
    seen.add(info.key);
  }
  expect(seen.size).toBe(expected);
});
