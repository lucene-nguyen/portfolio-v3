import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { features } from "../lib/features";

test("renders sections in the round-2 order; parked sections are absent", async ({ page }) => {
  await page.goto("/");
  const ids = await page
    .locator("#top, #work, #lab, #kits, #experience, #contact")
    .evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(["top", "experience", "kits", "contact"]);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "I build web products that bring real value to users and businesses.",
  );
  for (const name of ["Where I've shipped", "Starter kits & labs"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  // Eyebrow numbers follow the visible order (no gaps for parked sections).
  await expect(page.locator('#experience [data-part="eyebrow"]')).toHaveText("01 / experience");
});

test("hero: subline, bio, CTAs; no avatar or placeholder resume; avatar in contact", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator("#top");
  await expect(hero).toContainText(
    "My goal is to become an expert in web development, so I keep learning and improving every day.",
  );
  await expect(hero).toContainText("Fullstack Software Engineer with 5+ years building web apps");
  await expect(hero.getByRole("link", { name: "See my experience" })).toHaveAttribute(
    "href",
    "#experience",
  );
  await expect(hero.getByRole("link", { name: "Work with me" })).toBeVisible();
  await expect(hero.getByRole("link", { name: /resume/i })).toHaveCount(0);
  await expect(hero.locator("img")).toHaveCount(0);
  const avatar = page.locator('#contact [data-part="avatar"]');
  await expect(avatar).toBeVisible();
  const box = (await avatar.boundingBox())!;
  expect(Math.round(box.width)).toBe(Math.round(box.height));
  await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link").first()).toHaveText(
    "Cuong Nguyen",
  );
});

test("no link anywhere on home points to a parked section", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
  if (!features.caseStudies) expect(hrefs.filter((h) => /\/work\/|#work$/.test(h))).toEqual([]);
  if (!features.lab) expect(hrefs.filter((h) => h.endsWith("#lab"))).toEqual([]);
});

test("parked case-study pages render but are noindex", async ({ page }) => {
  test.skip(features.caseStudies, "case studies are live");
  const res = await page.goto("/work/pharmacy-inventory");
  expect(res?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("case study cards link to their pages", async ({ page }) => {
  test.skip(!features.caseStudies, "case studies parked (LEARNING-164)");
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
  const home = page.getByRole("link", { name: "Cuong Nguyen" });
  await expect(home).toBeFocused();
  await expect(home).toHaveCSS("outline-style", "solid");
  await expect(home).toHaveCSS("outline-color", "rgb(126, 231, 135)");
});

test("keyboard: every link and control is reachable and shows a focus ring", async ({ page }) => {
  await page.goto("/");
  // Theme features load lazily; wait so the count is stable.
  await expect(page.getByRole("button", { name: "Terminal" })).toBeVisible();
  // Only visible controls are tabbable (closed dialogs, other-breakpoint controls); dev-tools button is dev only.
  const expected = await page
    .locator("a[href], button, select")
    .evaluateAll(
      (els) => els.filter((e) => e.checkVisibility() && !e.hasAttribute("data-next-mark")).length,
    );
  const seen = new Set<string>();
  // Headroom: dev-only overlays (Next.js dev tools) can take a few Tab stops.
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
