import { expect, test } from "@playwright/test";

// Runs alone (`npm run test:perf`): frame rate is meaningless while other test workers compete for the CPU.
test("frame rate ≥ 30 fps", async ({ page }) => {
  await page.goto("/?theme=3d-world");
  await page.getByRole("button", { name: "Enter 3D world" }).click();
  await expect(page.getByTestId("world-canvas")).toHaveAttribute("data-status", "ready", {
    timeout: 20_000,
  });
  await page.waitForTimeout(2500);
  const fps = Number(await page.getByTestId("world-canvas").getAttribute("data-fps"));
  test.info().annotations.push({ type: "fps", description: String(fps) });
  expect(fps).toBeGreaterThanOrEqual(30);
});
