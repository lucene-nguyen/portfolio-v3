import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const study = "/work/pharmacy-inventory?theme=editorial";

test("measure 60–75ch and line-height ≥ 1.6", async ({ page }) => {
  await page.goto(study);
  await expect(page.getByRole("radiogroup", { name: "Text size" })).toBeVisible();
  const { chars, lh } = await page
    .locator(".prose-body p")
    .first()
    .evaluate((p) => {
      const probe = document.createElement("span");
      probe.textContent = "0".repeat(100);
      probe.style.font = getComputedStyle(p).font;
      probe.style.position = "absolute";
      document.body.append(probe);
      const ch = probe.getBoundingClientRect().width / 100;
      probe.remove();
      const s = getComputedStyle(p);
      return {
        chars: p.getBoundingClientRect().width / ch,
        lh: parseFloat(s.lineHeight) / parseFloat(s.fontSize),
      };
    });
  expect(chars).toBeGreaterThanOrEqual(60);
  expect(chars).toBeLessThanOrEqual(75);
  expect(lh).toBeGreaterThanOrEqual(1.6);
});

test("text size: keyboard radio group, applies and persists", async ({ page }) => {
  await page.goto(study);
  const group = page.getByRole("radiogroup", { name: "Text size" });
  const p = page.locator(".prose-body p").first();
  const before = parseFloat(await p.evaluate((el) => getComputedStyle(el).fontSize));
  // One tab stop (the checked radio); arrows move and select.
  await expect(group.getByRole("radio", { name: "Medium" })).toHaveAttribute("tabindex", "0");
  await expect(group.getByRole("radio", { name: "Large" })).toHaveAttribute("tabindex", "-1");
  await group.getByRole("radio", { name: "Medium" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(group.getByRole("radio", { name: "Large" })).toBeFocused();
  await expect(group.getByRole("radio", { name: "Large" })).toHaveAttribute("aria-checked", "true");
  expect(parseFloat(await p.evaluate((el) => getComputedStyle(el).fontSize))).toBeGreaterThan(
    before,
  );
  // Applied before any app JS on reload (no size jump).
  await page.route("**/_next/static/**/*.js", (route) => route.abort());
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-reading-size", "l");
  expect(parseFloat(await p.evaluate((el) => getComputedStyle(el).fontSize))).toBeGreaterThan(
    before,
  );
  await page.unroute("**/_next/static/**/*.js");
  await page.reload();
  await expect(
    page.getByRole("radiogroup", { name: "Text size" }).getByRole("radio", { name: "Large" }),
  ).toHaveAttribute("aria-checked", "true");
});

test("read time, table of contents, progress bar", async ({ page }) => {
  await page.goto(study);
  await expect(page.getByText(/^\d+ min read$/)).toBeVisible();
  const toc = page.getByRole("navigation", { name: "On this page" });
  await expect(toc.getByRole("link")).toHaveText([
    "Context",
    "Problem",
    "Constraints",
    "Architecture",
    "Decisions & trade-offs",
    "Results",
  ]);
  await toc.getByRole("link", { name: "Results" }).click();
  await expect(page).toHaveURL(/#results$/);
  const bar = page.getByRole("progressbar", { name: "Reading progress" });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(bar).toHaveAttribute("aria-valuenow", "100");
});

for (const path of ["/?theme=editorial", study]) {
  test(`axe clean and 375px: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-family", /Libre Bodoni/);
    const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
    expect(violations.map((v) => v.id)).toEqual([]);
    await page.setViewportSize({ width: 375, height: 800 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("design rules are persisted with the exact tokens", async () => {
  const fs = await import("node:fs/promises");
  const md = await fs.readFile("design-system/portfolio-v3/pages/editorial.md", "utf8");
  const { editorial } = await import("../themes/editorial");
  const { fontHeading, radius, ...colors } = editorial.tokens;
  void [fontHeading, radius];
  for (const hex of Object.values(colors)) expect(md).toContain(hex);
});

test("shared sections are restyled as a magazine, not just recolored", async ({ page }) => {
  await page.goto("/?theme=editorial");
  const card = page.locator('[data-part="case-card"]').first();
  await expect(card).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(card).toHaveCSS("border-top-width", "2px");
  await expect(card.locator("h3")).toHaveCSS("font-family", /Libre Bodoni/);
  await expect(page.locator('[data-part="stat"] dd').first()).toHaveCSS(
    "font-family",
    /Libre Bodoni/,
  );
  await expect(page.locator('[data-part="case-meta"]').first()).toHaveCSS(
    "font-variant-caps",
    "small-caps",
  );
});
