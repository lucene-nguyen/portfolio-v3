import { expect, test } from "@playwright/test";

const pngSize = (buf: Buffer) => ({ width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) });

test("home: title, description, canonical, Open Graph image", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Nguyen Manh Cuong — Fullstack Software Engineer");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Case studies/);
  // Next renders the root canonical without a trailing slash.
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https?:\/\/[^/]+\/?$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/opengraph-image/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
});

test("case study: own title, description, canonical and OG image", async ({ page, request }) => {
  await page.goto("/work/aws-file-ingestion");
  await expect(page).toHaveTitle(
    "Hands-off file ingestion on AWS S3 and Lambda — Nguyen Manh Cuong",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Scheduled Lambdas/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/work\/aws-file-ingestion$/,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(og).toMatch(/\/work\/aws-file-ingestion\/opengraph-image/);
  const res = await request.get(new URL(og!).pathname + new URL(og!).search);
  expect(res.headers()["content-type"]).toBe("image/png");
  expect(pngSize(await res.body())).toEqual({ width: 1200, height: 630 });
});

test("home OG image is a 1200×630 PNG", async ({ request }) => {
  const res = await request.get("/opengraph-image");
  expect(res.ok()).toBe(true);
  expect(pngSize(await res.body())).toEqual({ width: 1200, height: 630 });
});

test("sitemap and robots", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of [
    "/",
    "/work/pharmacy-inventory",
    "/work/ai-image-pipeline",
    "/work/aws-file-ingestion",
  ]) {
    expect(sitemap).toContain(`${path}</loc>`);
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /api/");
  expect(robots).toMatch(/Sitemap: .+\/sitemap\.xml/);
});
