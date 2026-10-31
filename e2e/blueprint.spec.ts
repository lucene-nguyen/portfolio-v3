import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const map = (page: import("@playwright/test").Page) =>
  page.getByRole("region", { name: "System map" });

test("keyboard switch to Blueprint keeps focus and announces it", async ({ page }) => {
  await page.goto("/");
  const select = page.getByLabel("Theme");
  await select.focus();
  await select.press("ArrowDown");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "blueprint");
  await expect(page.getByRole("status").filter({ hasText: "Theme:" })).toHaveText(
    "Theme: Blueprint",
  );
  await expect(select).toBeFocused();
  await expect(map(page)).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("blueprint");
});

test("stored theme is applied by the head script before any app JS", async ({ page }) => {
  await page.route("**/_next/static/**/*.js", (route) => route.abort());
  await page.addInitScript(() => localStorage.setItem("theme", "blueprint"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "blueprint");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 37, 64)");
});

test("?theme=blueprint applies without persisting", async ({ page }) => {
  await page.goto("/?theme=blueprint");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "blueprint");
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
});

test("terminal `theme blueprint` switches and unloads the command bar", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Terminal" })).toHaveAttribute(
    "data-shortcuts",
    "on",
  );
  await page.keyboard.press("/");
  await page.getByRole("textbox", { name: "$ command" }).fill("theme blueprint");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "blueprint");
  await expect(page.getByRole("button", { name: "Terminal" })).toHaveCount(0);
});

test.describe("system map", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?theme=blueprint");
    await expect(map(page)).toBeVisible();
  });

  test("nodes are focusable links with tech and impact; focus reveals details", async ({
    page,
  }) => {
    const node = map(page).getByRole("link", {
      name: /A non-blocking AI image pipeline.*Databricks.*0 OOM/,
    });
    await node.focus();
    await expect(node).toBeFocused();
    await expect(node.getByText("0 OOM on large uploads")).toBeVisible();
    await node.press("Enter");
    await expect(page).toHaveURL(/\/work\/ai-image-pipeline$/);
  });

  test("list view offers the same links", async ({ page }) => {
    await map(page).getByText("View as list").click();
    const listHrefs = await map(page)
      .locator("details ul a")
      .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    const nodeHrefs = await map(page)
      .locator("div.relative > ul > li > a")
      .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    expect(listHrefs).toHaveLength(4);
    expect(listHrefs).toEqual(nodeHrefs);
  });

  test("no axe violations; no horizontal scroll at 375px", async ({ page }) => {
    const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
    expect(violations.map((v) => v.id)).toEqual([]);
    await page.setViewportSize({ width: 375, height: 800 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
