import { expect, test } from "@playwright/test";
import { themes } from "../themes/registry";

// Unfinished owner facts ([PLACEHOLDER…]) must never render (production build, flag off).
const pages = [
  "/",
  "/work/pharmacy-inventory",
  "/work/ai-image-pipeline",
  "/work/aws-file-ingestion",
];

for (const { id } of themes) {
  test(`no placeholder text in ${id}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" }); // 3D world stays closed
    for (const path of pages) {
      await page.goto(`${path}?theme=${id}`);
      await expect(page.locator("html")).toHaveAttribute("data-theme", id);
      await page.waitForLoadState("networkidle").catch(() => {});
      expect(await page.locator("body").innerText(), `${id} ${path}`).not.toContain("PLACEHOLDER");
    }
  });
}

test("search index has no placeholder text", async ({ request }) => {
  expect(await (await request.get("/search-index.json")).text()).not.toContain("PLACEHOLDER");
});

test("LinkedIn link uses the owner's profile", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#contact").getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/cuong-m-nguyen/",
  );
});
