import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { features } from "../lib/features";
import { activeThemes as themes } from "../themes/registry";

test("/ is English, /vi is Vietnamese: lang, copy, hreflang, canonical", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('link[rel="alternate"][hreflang="vi"]')).toHaveAttribute(
    "href",
    /\/vi$/,
  );
  await page.goto("/vi");
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Tôi xây dựng những sản phẩm web mang lại giá trị thật cho người dùng và doanh nghiệp.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/vi$/);
  // Next renders the root URL without a trailing slash.
  for (const [lang, href] of [
    ["en", /^https?:\/\/[^/]+\/?$/],
    ["vi", /\/vi$/],
    ["x-default", /^https?:\/\/[^/]+\/?$/],
  ] as const)
    await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveAttribute(
      "href",
      href,
    );
  await expect(page.locator('#skills [data-part="eyebrow"]')).toHaveText("01 / kỹ năng");
});

test("the switcher sits next to the theme switcher and swaps languages", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const toVi = nav.getByRole("link", { name: "Xem trang bằng tiếng Việt" });
  await expect(toVi).toHaveAttribute("hreflang", "vi");
  await expect(toVi).toHaveAttribute("lang", "vi");
  await toVi.click();
  await expect(page).toHaveURL(/\/vi$/);
  // The nav is named in the page's language.
  await page
    .getByRole("navigation", { name: "Điều hướng chính" })
    .getByRole("link", { name: "View this page in English" })
    .click();
  await expect(page).toHaveURL(/:\d+\/$/);
});

test("Vietnamese links stay on /vi; /en redirects to /", async ({ page, request }) => {
  await page.goto("/vi");
  const hrefs = await page
    .getByRole("navigation", { name: "Điều hướng chính" })
    .getByRole("link")
    .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
  const sectionLinks = hrefs.filter((h) => h?.includes("#"));
  expect(sectionLinks.length).toBeGreaterThan(3);
  expect(sectionLinks.every((h) => h!.startsWith("/vi#"))).toBe(true);
  await expect(page.locator("#top").getByRole("link", { name: "Hợp tác với tôi" })).toHaveAttribute(
    "href",
    "#work-with-me",
  );
  const res = await request.get("/en", { maxRedirects: 0 });
  expect([307, 308]).toContain(res.status());
  expect(res.headers()["location"]).toMatch(/\/$/);
});

test("Vietnamese contact form: errors in Vietnamese; search index in Vietnamese", async ({
  page,
  request,
}) => {
  await page.goto("/vi#contact");
  await page.waitForLoadState("networkidle");
  const form = page.getByRole("form", { name: "Gửi tin nhắn" });
  await form.getByRole("button", { name: "Gửi tin nhắn" }).click();
  await expect(page.locator("#contact-name-error")).toHaveText("Vui lòng nhập họ và tên.");
  await expect(form.getByRole("radio", { name: "Tư vấn" })).toBeVisible();
  const docs: { title: string; href: string }[] = await (
    await request.get("/vi/search-index.json")
  ).json();
  expect(docs.find((d) => d.href === "/vi#skills")?.title).toBe("Kỹ năng");
});

for (const { id } of themes) {
  test(`/vi in ${id}: axe clean, no horizontal scroll at 375px`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/vi?theme=${id}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", id);
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
    expect(violations.map((v) => v.id)).toEqual([]);
  });
}

test("public files are served in both locales (the avatar loads)", async ({ page, request }) => {
  expect((await request.get("/avatar.jpg")).status()).toBe(200);
  for (const path of ["/", "/vi"]) {
    await page.goto(path);
    const avatar = page.locator('#contact [data-part="avatar"]');
    await avatar.scrollIntoViewIfNeeded();
    await expect
      .poll(() => avatar.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth), {
        message: path,
      })
      .toBeGreaterThan(0);
  }
});

test("Vietnamese chrome: theme label and nav name", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/vi");
  await expect(page.getByRole("navigation", { name: "Điều hướng chính" })).toBeVisible();
  if (features.themes) await expect(page.getByLabel("Giao diện")).toBeVisible();
});

test("/vi: experience stays English, CV link in Vietnamese", async ({ page }) => {
  await page.goto("/vi");
  await expect(page.locator("#experience h2")).toHaveText("Những nơi tôi đã làm việc");
  await expect(
    page.getByText("Designed and implemented Redis-backed inventory services.", { exact: true }),
  ).toBeVisible();
  const cv = page.locator("#top").getByRole("link", { name: /Tải CV/ });
  await expect(cv).toHaveAttribute("target", "_blank");
  await expect(cv).toHaveAttribute("rel", "noopener noreferrer");
});
