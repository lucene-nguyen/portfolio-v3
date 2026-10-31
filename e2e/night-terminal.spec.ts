import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function ready(page: Page) {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Terminal" })).toHaveAttribute(
    "data-shortcuts",
    "on",
  );
}

const dialog = (page: Page) => page.getByRole("dialog", { name: "Command line" });
const input = (page: Page) => page.getByRole("textbox", { name: "$ command" });

test("design rules are persisted", async () => {
  const fs = await import("node:fs/promises");
  const md = await fs.readFile("design-system/portfolio-v3/pages/night-terminal.md", "utf8");
  for (const hex of ["#0B0F14", "#121821", "#1F2A37", "#E6EDF3", "#8B98A9", "#7A8798", "#7EE787"]) {
    expect(md).toContain(hex);
  }
});

test("/ opens, Esc closes and restores focus", async ({ page }) => {
  await ready(page);
  const link = page.getByRole("link", { name: "Work", exact: true });
  await link.focus();
  await page.keyboard.press("/");
  await expect(dialog(page)).toBeVisible();
  await expect(input(page)).toBeFocused();
  await expect(input(page)).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Escape");
  await expect(dialog(page)).toBeHidden();
  await expect(link).toBeFocused();
});

test("Ctrl+K opens; commands print to the log; tab completion and history", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("Control+k");
  await expect(input(page)).toBeFocused();
  const log = page.getByRole("log");

  await input(page).fill("ls projects");
  await page.keyboard.press("Enter");
  await expect(log).toContainText("pharmacy-inventory");

  await input(page).fill("cat resume");
  await page.keyboard.press("Enter");
  await expect(log).toContainText("FPT Software");

  await input(page).fill("sudo");
  await page.keyboard.press("Enter");
  await expect(log).toContainText("error: command not found: sudo");

  await input(page).fill("th");
  await page.keyboard.press("Tab");
  await expect(input(page)).toHaveValue("theme ");
  await expect(input(page)).toBeFocused();

  await input(page).fill("");
  await page.keyboard.press("ArrowUp");
  await expect(input(page)).toHaveValue("sudo");
  await page.keyboard.press("ArrowUp");
  await expect(input(page)).toHaveValue("cat resume");
});

test("contact navigates to the contact section", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("/");
  await input(page).fill("contact");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contact$/);
  await expect(dialog(page)).toBeHidden();
});

test("open <slug> navigates to the case study", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("/");
  await input(page).fill("open pharmacy-inventory");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/pharmacy-inventory$/);
});

test("slash inside a text field does not open the terminal", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("/");
  await input(page).fill("a/b");
  await expect(input(page)).toHaveValue("a/b");
});

test("375px: button only, opens the command line, no horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await ready(page);
  await expect(page.getByText("press / or ⌘K")).toBeHidden();
  await page.getByRole("button", { name: "Terminal" }).click();
  await expect(input(page)).toBeFocused();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("open command line has no axe violations", async ({ page }) => {
  await ready(page);
  await page.keyboard.press("/");
  await input(page).fill("help");
  await page.keyboard.press("Enter");
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});
