import { expect, test } from "@playwright/test";
import { features } from "../lib/features";

test("defaults to Night terminal", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night-terminal");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(11, 15, 20)");
});

test("unknown ?theme falls back to the default", async ({ page }) => {
  await page.goto("/?theme=does-not-exist");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night-terminal");
});

test("switcher is labelled and keyboard-focusable", async ({ page }) => {
  test.skip(!features.themes, "themes locked (LEARNING-184)");
  await page.goto("/");
  const select = page.getByLabel("Theme");
  await select.focus();
  await expect(select).toBeFocused();
  await expect(select).toHaveValue("night-terminal");
});

test("locked: no switcher; ?theme= and a saved theme are ignored", async ({ page }) => {
  test.skip(features.themes, "themes unlocked");
  await page.goto("/?theme=pixel");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night-terminal");
  await expect(page.getByLabel("Theme")).toHaveCount(0);
  await page.evaluate(() => localStorage.setItem("theme", "editorial"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night-terminal");
  // The terminal's theme command only knows the active theme.
  await expect(page.getByRole("button", { name: "Terminal" })).toBeVisible();
  await page.keyboard.press("Control+k");
  await page.getByRole("textbox", { name: "$ command" }).fill("theme pixel");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("log")).toContainText('unknown theme "pixel"');
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night-terminal");
});

test("reduced motion disables transitions and animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const durations = await page.evaluate(() => {
    const el = document.createElement("div");
    el.style.transition = "opacity 2s";
    el.style.animation = "x 3s infinite";
    document.body.append(el);
    const s = getComputedStyle(el);
    return [s.transitionDuration, s.animationDuration, s.animationIterationCount];
  });
  expect(durations).toEqual(["1e-05s", "1e-05s", "1"]);
});
