import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { experience } from "../content/home";

const strip = (page: Page) => page.getByRole("region", { name: "The story so far" });

test.beforeEach(async ({ page }) => {
  // No fade-in: axe must see final colours.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?theme=anime");
  await expect(strip(page)).toBeVisible();
});

test("one panel per role with alt text and speech bubbles", async ({ page }) => {
  const panels = strip(page)
    .getByRole("listitem")
    .filter({ has: page.getByRole("img") });
  await expect(panels).toHaveCount(experience.roles.length);
  await expect(strip(page).getByRole("img")).toHaveCount(experience.roles.length);
  for (const img of await strip(page).getByRole("img").all()) {
    await expect(img).toHaveAttribute("aria-label", /Abstract manga panel for .+ No characters\./);
  }
  await expect(strip(page).locator(".mg-bubble").first()).toContainText("Founding engineer");
});

test("story is also available as plain text", async ({ page }) => {
  await strip(page).getByText("Read the story as plain text").click();
  const text = strip(page).locator("details ol");
  await expect(text).toBeVisible();
  await expect(text.getByRole("listitem")).toHaveCount(experience.roles.length);
  await expect(text).toContainText("FPT Software");
});

test("bubble text contrast, axe clean, 375px", async ({ page }) => {
  const bubble = strip(page).locator(".mg-bubble").first();
  await expect(bubble).toHaveCSS("color", "rgb(17, 17, 17)");
  await expect(bubble).toHaveCSS("background-color", "rgb(255, 255, 255)");
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await page.setViewportSize({ width: 375, height: 800 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("shared sections are restyled as manga panels", async ({ page }) => {
  await page.goto("/?theme=anime");
  await expect(page.locator('#work [data-part="eyebrow"]')).toHaveCSS(
    "background-color",
    "rgb(194, 24, 91)",
  );
  await expect(page.locator('[data-part="stack"] h3')).toHaveCSS("color", "rgb(17, 17, 17)");
  const card = page.locator('#work [data-part="case-card"]').first();
  await expect(card).toHaveCSS("border-top-width", "4px");
  await expect(card).toHaveCSS("box-shadow", "rgb(26, 26, 26) 5px 5px 0px 0px");
  const meta = page.locator('#work [data-part="case-meta"]').first();
  await expect(meta).toHaveCSS("background-image", /radial-gradient/);
  const [c, m] = await Promise.all([card.boundingBox(), meta.boundingBox()]);
  expect(m!.x - c!.x).toBeCloseTo(4, 0);
  await expect(page.locator('[data-part="case-metrics"]').first()).toHaveCSS(
    "border-top-left-radius",
    "28px",
  );
  await expect(page.locator('[data-part="stats"]')).toHaveCSS(
    "background-color",
    "rgb(26, 26, 26)",
  );
  await expect(page.locator('[data-part="role"]').first()).toHaveCSS(
    "background-color",
    "rgb(255, 241, 224)",
  );
  await expect(page.locator('[data-part="contact-actions"]')).toHaveCSS(
    "border-top-left-radius",
    "28px",
  );
});
