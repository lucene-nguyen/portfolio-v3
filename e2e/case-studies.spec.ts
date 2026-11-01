import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { features } from "../lib/features";

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
    ]);
    const nodes = page.getByRole("list", { name: /request flow/ }).getByRole("listitem");
    expect(await nodes.count()).toBeGreaterThanOrEqual(3);
    for (const node of await nodes.all()) await expect(node.locator("svg")).toHaveCount(1);
    const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
    expect(violations.map((v) => v.id)).toEqual([]);
  });

  test(`${slug}: home card opens it`, async ({ page }) => {
    test.skip(!features.caseStudies, "case studies parked (LEARNING-164)");
    await page.goto("/");
    await page.getByRole("link", { name: `Read case study: ${title}` }).click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  });

  test(`${slug}: no horizontal scroll at 375px`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(`/work/${slug}`);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("unknown slug is a 404", async ({ page }) => {
  const res = await page.goto("/work/does-not-exist");
  expect(res?.status()).toBe(404);
});
