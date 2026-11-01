import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { ide } from "../themes/ide";

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${n >> 16}, ${(n >> 8) & 255}, ${n & 255})`;
};

async function ready(page: Page, path = "/?theme=ide") {
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute("data-ide-shortcuts", "on");
}
const explorer = (page: Page) => page.getByRole("navigation", { name: "Explorer" }).first();
const tabs = (page: Page) => page.getByRole("navigation", { name: "Open editors" });

test("explorer opens files as tabs; tabs are real deep links", async ({ page }) => {
  await ready(page);
  await expect(tabs(page).getByRole("link")).toHaveText(["about.ts"]);
  await explorer(page)
    .getByRole("link", { name: /ai-image-pipeline\.md/ })
    .click();
  await expect(page).toHaveURL(/\/work\/ai-image-pipeline$/);
  await expect(tabs(page).getByRole("link", { name: "ai-image-pipeline.md" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(tabs(page).getByRole("link", { name: "about.ts" })).toHaveAttribute("href", "/#top");
  // Deep link straight to a file.
  await ready(page, "/work/aws-file-ingestion?theme=ide");
  await expect(tabs(page).getByRole("link", { name: "aws-file-ingestion.md" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("keyboard: explorer links, tab links and close buttons are reachable", async ({ page }) => {
  await ready(page);
  const link = explorer(page).getByRole("link", { name: /resume\.json/ });
  await link.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#experience$/);
  const close = tabs(page).getByRole("button", { name: "Close resume.json" });
  await close.focus();
  await page.keyboard.press("Enter");
  await expect(tabs(page).getByRole("link", { name: "resume.json" })).toHaveCount(0);
  // Focus stays in the tab bar, not lost to <body>.
  expect(await page.evaluate(() => document.activeElement?.tagName)).not.toBe("BODY");
  await expect(page.locator(":focus")).toHaveAttribute("data-close", /.+/);
});

test("Ctrl+K palette filters files; Enter opens; Esc closes", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("Control+k");
  const box = page.getByRole("combobox", { name: "Go to file" });
  await expect(box).toBeFocused();
  await box.fill("pharm");
  await expect(page.getByRole("listbox", { name: "Go to file" }).getByRole("option")).toHaveText([
    "work/pharmacy-inventory.md",
  ]);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/pharmacy-inventory$/);
  await page.keyboard.press("Control+k");
  await expect(box).toHaveValue("");
  await page.keyboard.press("Escape");
  await expect(box).toBeHidden();
});

test("unknown locations mark no file as current", async ({ page }) => {
  await ready(page, "/?theme=ide#nowhere");
  await expect(
    page.getByRole("navigation", { name: "Explorer" }).first().locator("[aria-current]"),
  ).toHaveCount(0);
});

test("content stays readable prose", async ({ page }) => {
  await ready(page, "/work/ai-image-pipeline?theme=ide");
  const p = page.locator(".prose-body p").first();
  await expect(p).toHaveCSS("font-family", /Inter Tight/);
  await expect(page.locator(".prose-body pre")).toHaveCount(0);
});

test("mobile: explorer becomes a drawer; axe clean; no horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await ready(page);
  await expect(page.locator("aside")).toBeHidden();
  await page.getByRole("button", { name: "Explorer" }).click();
  const drawer = page.getByRole("dialog", { name: "Explorer" });
  await expect(drawer).toBeVisible();
  await drawer.getByRole("link", { name: /contact\.md/ }).click();
  await expect(drawer).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("desktop axe clean", async ({ page }) => {
  await ready(page);
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("shared sections are restyled in editor language", async ({ page }) => {
  await ready(page);
  const pseudo = (sel: string) =>
    page
      .locator(sel)
      .first()
      .evaluate((el) => getComputedStyle(el, "::before").content);
  expect(await pseudo('#work [data-part="eyebrow"]')).toContain("//");
  await expect(page.locator('[data-part="case-meta"]').first()).toHaveCSS(
    "border-top-width",
    "2px",
  );
  await expect(page.locator('[data-part="stats"]')).toHaveCSS(
    "background-color",
    rgb(ide.tokens.accent),
  );
  expect(await pseudo('[data-part="roles"]')).toContain("TIMELINE");
  expect(await pseudo('[data-part="contact-actions"]')).toContain("TERMINAL");
});
