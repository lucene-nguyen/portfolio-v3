import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, info) => {
  await page.setExtraHTTPHeaders({
    "x-forwarded-for": `198.19.${info.workerIndex}.${Date.now() % 250}`,
  });
});

test("no glow; glitch and scanlines run with motion allowed", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/?theme=cyberpunk");
  await expect(page.getByTestId("cp-hud")).toBeAttached();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("text-shadow", "none");
  expect(await page.locator("body").evaluate((b) => getComputedStyle(b).backgroundImage)).toContain(
    "gradient",
  );
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(page.locator("#work")).toHaveClass(/cp-glitch/);
  await expect(page.locator("#work h2")).toHaveCSS("animation-name", "cp-glitch");
});

test("reduced motion: no scanlines, no glitch", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?theme=cyberpunk");
  await expect(page.getByTestId("cp-hud")).toBeAttached();
  await expect(page.locator("body")).toHaveCSS("background-image", "none");
  await page.locator("#work").scrollIntoViewIfNeeded();
  await expect(page.locator("#work h2")).toHaveCSS("animation-name", "none");
});

test("burst: packets and a BLOCKED packet; firewall flashes ≤ 3 per second", async ({ page }) => {
  await page.goto("/?theme=cyberpunk");
  const hud = page.getByTestId("cp-hud");
  await expect(hud).toBeAttached();
  await page.evaluate(() => {
    const w = window as unknown as { flashes: number[] };
    w.flashes = [];
    const wall = document.querySelector(".cp-hud__wall")!;
    new MutationObserver(() => {
      if (wall.getAttribute("data-hit") === "true") w.flashes.push(performance.now());
    }).observe(wall, { attributes: true });
  });
  const lab = page.locator("#lab");
  await lab.getByRole("button", { name: "Burst × 10" }).click();
  await expect(hud.getByText("BLOCKED 429").first()).toBeAttached();
  await expect(hud.getByText("PKT 200").first()).toBeAttached();
  await lab.getByRole("button", { name: "Burst × 10" }).click();
  await page.waitForTimeout(1500);
  const flashes: number[] = await page.evaluate(
    () => (window as unknown as { flashes: number[] }).flashes,
  );
  expect(flashes.length).toBeGreaterThanOrEqual(1);
  for (const t of flashes)
    expect(flashes.filter((u) => u >= t && u < t + 1000).length).toBeLessThanOrEqual(3);
  await expect(hud).toHaveAttribute("aria-hidden", "true");
});

test("axe clean; 375px", async ({ page }) => {
  await page.goto("/?theme=cyberpunk");
  await expect(page.getByTestId("cp-hud")).toBeAttached();
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await page.setViewportSize({ width: 375, height: 800 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
