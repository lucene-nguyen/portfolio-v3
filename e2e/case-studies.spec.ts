import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const studies = [
  { slug: "pharmacy-inventory", title: "Cutting inventory latency 15× for 2,500+ pharmacy stores" },
  { slug: "ai-image-pipeline", title: "A non-blocking AI image pipeline on Databricks" },
  { slug: "aws-file-ingestion", title: "Hands-off file ingestion on AWS S3 and Lambda" },
];

for (const { slug, title } of studies) {
  test(`${slug}: renders sections, diagram, no axe violations`, async ({ page }) => {
    const res = await page.goto(`/work/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.getByRole("heading", { level: 2 })).toHaveText([
      "Context",
      "Problem",
      "Constraints",
      "Architecture",
      "Decisions & trade-offs",
      "Results",
      "Learnings",
    ]);
    const flow = page.getByRole("list", { name: /request flow/ });
    expect(await flow.getByRole("listitem").count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator("figure svg").first()).toBeVisible();
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations.map((v) => v.id)).toEqual([]);
  });
}

test("home cards open the matching case study", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: /Read case study: A non-blocking AI image pipeline/ })
    .click();
  await expect(page).toHaveURL(/\/work\/ai-image-pipeline$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(studies[1].title);
});

test("unknown slug is a 404", async ({ page }) => {
  const res = await page.goto("/work/does-not-exist");
  expect(res?.status()).toBe(404);
});

test("no horizontal scroll at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/work/ai-image-pipeline");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
