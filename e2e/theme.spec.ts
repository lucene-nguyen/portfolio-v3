import { expect, test } from "@playwright/test";

test("defaults to Night terminal", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night-terminal");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(11, 15, 20)");
});

test("unknown ?theme falls back to the default", async ({ page }) => {
  await page.goto("/?theme=does-not-exist");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night-terminal");
});

test("theme is set by the inline head script, before any app JS", async ({ page }) => {
  await page.route("**/_next/static/**/*.js", (route) => route.abort());
  await page.addInitScript(() => localStorage.setItem("theme", "night-terminal"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night-terminal");
});

test("switcher is labelled and keyboard-focusable", async ({ page }) => {
  await page.goto("/");
  const select = page.getByLabel("Theme");
  await page.keyboard.press("Tab");
  await expect(select).toBeFocused();
  await expect(select).toHaveValue("night-terminal");
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
