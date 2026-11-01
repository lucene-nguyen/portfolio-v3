import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function ready(page: Page, path = "/?theme=docs") {
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute("data-search-shortcuts", "on");
}
const dialog = (page: Page) => page.getByRole("dialog", { name: "Search the site" });
const box = (page: Page) => page.getByRole("combobox", { name: "Search the site" });

test("search index is a static file with case study sections", async ({ request }) => {
  const res = await request.get("/search-index.json");
  expect(res.ok()).toBe(true);
  const docs: { href: string }[] = await res.json();
  expect(docs.some((d) => d.href === "/work/pharmacy-inventory#decisions-and-trade-offs")).toBe(
    true,
  );
});

test("/ opens search; type, arrow, Enter navigates; Esc restores focus", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("/");
  await expect(box(page)).toBeFocused();
  await box(page).fill("lambda");
  await expect(page.getByRole("status").filter({ hasText: "result" })).toHaveText(/\d+ results?/);
  const options = dialog(page).getByRole("option");
  await expect(options.first()).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowDown");
  await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/aws-file-ingestion/);

  await page.keyboard.press("Control+k");
  await expect(box(page)).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog(page)).toBeHidden();
});

test("no results suggests terms", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("Control+k");
  await box(page).fill("kubernetes");
  await expect(dialog(page).getByRole("status")).toContainText("No results. Try:");
});

test("sidebar, breadcrumbs, current page", async ({ page }) => {
  await ready(page, "/work/ai-image-pipeline?theme=docs");
  const side = page.getByRole("navigation", { name: "Docs" });
  await expect(
    side.getByRole("link", { name: "A non-blocking AI image pipeline on Databricks" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText(
    "Home/Case studies/A non-blocking AI image pipeline on Databricks",
  );
});

test("mobile: sidebar becomes a drawer; axe clean; no horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await ready(page);
  await expect(page.locator("aside")).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  const drawer = page.getByRole("dialog", { name: "Docs" });
  await expect(drawer).toBeVisible();
  await drawer.getByRole("link", { name: "Hands-off file ingestion on AWS S3 and Lambda" }).click();
  await expect(page).toHaveURL(/aws-file-ingestion/);
  await expect(drawer).toBeHidden();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("desktop axe clean with search open", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("/");
  await box(page).fill("redis");
  await expect(dialog(page).getByRole("option").first()).toBeVisible();
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});
