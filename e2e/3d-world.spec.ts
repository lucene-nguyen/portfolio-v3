import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const world = (page: Page) => page.getByRole("dialog", { name: "3D world" });
const canvas = (page: Page) => page.getByTestId("world-canvas");

async function collectScripts(page: Page) {
  const bodies: string[] = [];
  page.on("response", async (r) => {
    if (r.request().resourceType() === "script") bodies.push(await r.text().catch(() => ""));
  });
  return bodies;
}

test("Three.js loads only in this theme; no model/texture assets", async ({ page }) => {
  const scripts = await collectScripts(page);
  const assets: string[] = [];
  page.on("request", (r) => {
    if (/\.(glb|gltf|fbx|obj|hdr|exr|ktx2|basis|bin)(\?|$)/.test(r.url())) assets.push(r.url());
  });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Terminal" })).toBeVisible();
  expect(scripts.some((s) => s.includes("WebGLRenderer"))).toBe(false);

  await page.goto("/?theme=3d-world");
  await expect(canvas(page)).toHaveAttribute("data-status", "ready", { timeout: 20_000 });
  expect(scripts.some((s) => s.includes("WebGLRenderer"))).toBe(true);
  expect(assets).toEqual([]);
});

test("Skip to content exits to the standard layout and focuses main", async ({ page }) => {
  await page.goto("/?theme=3d-world");
  await expect(world(page)).toBeVisible();
  await world(page).getByRole("button", { name: "Skip to content" }).click();
  await expect(world(page)).toBeHidden();
  await expect(page.locator("#main")).toBeFocused();
  await expect(page.getByRole("button", { name: "Enter 3D world" })).toBeVisible();
  // Stays closed for the session; can be reopened.
  await page.reload();
  await expect(page.getByRole("button", { name: "Enter 3D world" })).toBeVisible();
  await expect(world(page)).toBeHidden();
});

test("Esc also exits", async ({ page }) => {
  await page.goto("/?theme=3d-world");
  await expect(world(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(world(page)).toBeHidden();
});

test("reduced motion falls back to the standard layout automatically", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?theme=3d-world");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(world(page)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Enter 3D world" })).toHaveCount(0);
});

test("keyboard: walking onto a pad opens that section", async ({ page }) => {
  await page.goto("/?theme=3d-world");
  await expect(canvas(page)).toHaveAttribute("data-status", "ready", { timeout: 20_000 });
  await canvas(page).focus();
  await page.keyboard.down("ArrowRight");
  await expect(page).toHaveURL(/#lab$/, { timeout: 15_000 });
  await page.keyboard.up("ArrowRight");
  await expect(world(page)).toBeHidden();
  await expect(page.locator("#lab")).toBeFocused();
});

test("zone buttons and touch pad are labelled; axe clean", async ({ page }) => {
  await page.goto("/?theme=3d-world");
  await expect(canvas(page)).toHaveAttribute("data-status", "ready", { timeout: 20_000 });
  for (const name of ["Walk forward", "Walk back", "Walk left", "Walk right"]) {
    await expect(world(page).getByRole("button", { name })).toBeVisible();
  }
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await world(page).getByRole("button", { name: "Contact" }).click();
  await expect(page).toHaveURL(/#contact$/);
});

test("frame rate ≥ 30 fps", async ({ page }) => {
  await page.goto("/?theme=3d-world");
  await expect(canvas(page)).toHaveAttribute("data-status", "ready", { timeout: 20_000 });
  await page.waitForTimeout(2500);
  const fps = Number(await canvas(page).getAttribute("data-fps"));
  test.info().annotations.push({ type: "fps", description: String(fps) });
  expect(fps).toBeGreaterThanOrEqual(30);
});
