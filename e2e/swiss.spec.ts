import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("12-column grid is visible and aligned with content at 1440px", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/?theme=swiss-minimal");
  const grid = page.getByTestId("swiss-grid");
  // Hidden by default; the nav toggle shows it and remembers the choice.
  await expect(grid).toBeAttached();
  await expect(grid).toBeHidden();
  const toggle = page.getByRole("button", { name: "Show grid" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(grid).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("swiss-grid")).toBeVisible();
  const cols = grid.locator("span");
  await expect(cols).toHaveCount(12);
  const first = (await cols.first().boundingBox())!;
  const last = (await cols.last().boundingBox())!;
  const h1 = (await page.getByRole("heading", { level: 1 }).boundingBox())!;
  const cards = await page
    .locator("#work article")
    .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().right));
  expect(Math.abs(h1.x - first.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(cards.at(-1)! - (last.x + last.width))).toBeLessThanOrEqual(1);
});

test("grid hidden below 1024px", async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto("/?theme=swiss-minimal");
  await expect(page.getByTestId("swiss-grid")).toBeHidden();
  await expect(page.getByRole("button", { name: "Show grid" })).toBeHidden();
});

for (const format of ["A4", "Letter"] as const) {
  test(`prints as a one-page CV (${format})`, async ({ page }) => {
    await page.goto("/?theme=swiss-minimal");
    await expect(page.getByTestId("swiss-grid")).toBeAttached();
    const pdf = await page.pdf({ format, printBackground: true });
    const pages = pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [];
    expect(pages).toHaveLength(1);
  });
}

test("print view has no nav or interactive elements, keeps CV content", async ({ page }) => {
  await page.goto("/?theme=swiss-minimal");
  await expect(page.getByTestId("swiss-grid")).toBeAttached();
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header").first()).toBeHidden();
  await expect(page.getByLabel("Theme")).toBeHidden();
  await expect(page.locator("#lab")).toBeHidden();
  for (const el of await page.locator("button, select").all()) await expect(el).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#experience")).toContainText("FPT Software");
  await expect(page.locator("#contact")).toContainText("manhcuongmvc@gmail.com");
  const github = await page
    .locator('#contact a[href^="https://github.com"]')
    .evaluate((el) => getComputedStyle(el, "::after").content);
  expect(github).toContain("https://github.com/lucene-nguyen");
  await expect(page.locator("#contact").getByText(/PLACEHOLDER/)).toBeHidden();
});

test("print rules do not touch case study pages", async ({ page }) => {
  await page.goto("/work/ai-image-pipeline?theme=swiss-minimal");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "swiss-minimal");
  await page.goto("/?theme=swiss-minimal");
  await expect(page.getByTestId("swiss-grid")).toBeAttached();
  await page.getByRole("link", { name: /Read case study: A non-blocking/ }).click();
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("figure").first()).toBeVisible();
});

test("axe clean; 375px", async ({ page }) => {
  await page.goto("/?theme=swiss-minimal");
  await expect(page.getByTestId("swiss-grid")).toBeAttached();
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await page.setViewportSize({ width: 375, height: 800 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("print CV styles apply without JS", async ({ page }) => {
  await page.route("**/_next/static/**/*.js", (route) => route.abort());
  await page.goto("/?theme=swiss-minimal");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header").first()).toBeHidden();
  await expect(page.locator("#lab")).toBeHidden();
});

test("shared sections are restyled typographically", async ({ page }) => {
  await page.goto("/?theme=swiss-minimal");
  const eyebrow = page.locator('#work [data-part="eyebrow"]');
  await expect(eyebrow).toHaveCSS("text-transform", "uppercase");
  await expect(eyebrow).toHaveCSS("border-top-color", "rgb(208, 2, 27)");
  const card = page.locator('#work [data-part="case-card"]').first();
  await expect(card).toHaveCSS("border-top-width", "4px");
  await expect(card).toHaveCSS("border-left-width", "0px");
  await expect(card).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(page.locator('[data-part="kit"] > *').first()).toHaveCSS("border-top-width", "4px");
  await expect(page.locator('[data-part="stats"]')).toHaveCSS("border-left-width", "0px");
  await expect(page.locator('[data-part="stat"] dd').first()).toHaveCSS("font-size", "36px");
  await expect(page.locator('[data-part="stat"] dd').first()).toHaveCSS(
    "font-family",
    /Inter Tight/,
  );
  await expect(page.locator('[data-part="stack"]')).toHaveCSS("border-top-width", "4px");
});
