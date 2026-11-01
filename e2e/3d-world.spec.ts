import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const world = (page: Page) => page.getByRole("dialog", { name: "3D world" });
const canvas = (page: Page) => page.getByTestId("world-canvas");

async function enterWorld(page: Page, path = "/?theme=3d-world") {
  await page.goto(path);
  await page.getByRole("button", { name: "Enter 3D world" }).click();
  await expect(world(page)).toBeVisible();
}

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
  // Not loaded until the visitor enters the world.
  await expect(page.getByRole("button", { name: "Enter 3D world" })).toBeVisible();
  expect(scripts.some((s) => s.includes("WebGLRenderer"))).toBe(false);
  await page.getByRole("button", { name: "Enter 3D world" }).click();
  await expect(canvas(page)).toHaveAttribute("data-status", "ready", { timeout: 20_000 });
  expect(scripts.some((s) => s.includes("WebGLRenderer"))).toBe(true);
  expect(assets).toEqual([]);
});

test("entry sits below the hero; Skip to content exits and focuses main", async ({ page }) => {
  await page.goto("/?theme=3d-world");
  await expect(world(page)).toHaveCount(0);
  const entry = page.getByRole("region", { name: "Explore in 3D" });
  expect(await entry.evaluate((el) => el.parentElement?.previousElementSibling?.id)).toBe("top");
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await entry.getByRole("button", { name: "Enter 3D world" }).click();
  await world(page).getByRole("button", { name: "Skip to content" }).click();
  await expect(world(page)).toBeHidden();
  await expect(page.locator("#main")).toBeFocused();
});

test("Esc also exits", async ({ page }) => {
  await enterWorld(page);
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
  await enterWorld(page);
  await expect(canvas(page)).toHaveAttribute("data-status", "ready", { timeout: 20_000 });
  await canvas(page).focus();
  await page.keyboard.down("ArrowRight");
  await expect(page).toHaveURL(/#lab$/, { timeout: 15_000 });
  await page.keyboard.up("ArrowRight");
  await expect(world(page)).toBeHidden();
  await expect(page.locator("#lab")).toBeFocused();
});

test("zone buttons and touch pad are labelled; axe clean", async ({ page }) => {
  await enterWorld(page);
  await expect(canvas(page)).toHaveAttribute("data-status", "ready", { timeout: 20_000 });
  for (const name of ["Walk forward", "Walk back", "Walk left", "Walk right"]) {
    await expect(world(page).getByRole("button", { name })).toBeVisible();
  }
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await world(page).getByRole("button", { name: "Contact" }).click();
  await expect(page).toHaveURL(/#contact$/);
});

test("pad buttons work from the keyboard", async ({ page }) => {
  await enterWorld(page);
  await expect(canvas(page)).toHaveAttribute("data-status", "ready", { timeout: 20_000 });
  const right = world(page).getByRole("button", { name: "Walk right" });
  await right.focus();
  for (let i = 0; i < 12; i++) {
    if (await world(page).isHidden()) break;
    await page.keyboard.press("Enter");
    await page.waitForTimeout(250);
  }
  await expect(page).toHaveURL(/#lab$/);
});

test("shared sections are restyled with depth", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); // the world never opens
  await page.goto("/?theme=3d-world");
  const card = page.locator('#work [data-part="case-card"]').first();
  await expect(card).toHaveCSS("background-image", /linear-gradient/);
  await expect(card).toHaveCSS("box-shadow", /inset/);
  await expect(page.locator('[data-part="case-metrics"]').first()).toHaveCSS(
    "background-color",
    "rgb(15, 22, 38)",
  );
  const eyebrowPad = await page
    .locator('#work [data-part="eyebrow"]')
    .evaluate((e) => getComputedStyle(e, "::before").backgroundColor);
  expect(eyebrowPad).toBe("rgb(255, 181, 71)");
  const stats = page.locator('[data-part="stat"]');
  await expect(stats.first()).toHaveCSS("box-shadow", /inset/);
  await expect(page.locator('[data-part="stat"][data-highlight]')).toHaveCSS(
    "box-shadow",
    /0px 0px 28px/,
  );
  await expect(page.locator('[data-part="role"]').first()).toHaveCSS(
    "background-color",
    "rgb(18, 26, 44)",
  );
  await expect(page.locator('[data-part="stack"]')).toHaveCSS(
    "background-image",
    /linear-gradient/,
  );
  await expect(page.locator('[data-part="contact-actions"]')).toHaveCSS(
    "box-shadow",
    /0px 0px 28px/,
  );
});
