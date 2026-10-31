import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const study = "/work/pharmacy-inventory?theme=editorial";

test("measure 60–75ch and line-height ≥ 1.6", async ({ page }) => {
  await page.goto(study);
  await expect(page.getByRole("radiogroup", { name: "Text size" })).toBeVisible();
  const { chars, lh } = await page
    .locator("article p")
    .nth(3)
    .evaluate((p) => {
      const probe = document.createElement("span");
      probe.textContent = "0".repeat(100);
      probe.style.font = getComputedStyle(p).font;
      probe.style.position = "absolute";
      document.body.append(probe);
      const ch = probe.getBoundingClientRect().width / 100;
      probe.remove();
      const s = getComputedStyle(p);
      return {
        chars: p.getBoundingClientRect().width / ch,
        lh: parseFloat(s.lineHeight) / parseFloat(s.fontSize),
      };
    });
  expect(chars).toBeGreaterThanOrEqual(60);
  expect(chars).toBeLessThanOrEqual(75);
  expect(lh).toBeGreaterThanOrEqual(1.6);
});

test("text size: keyboard radio group, applies and persists", async ({ page }) => {
  await page.goto(study);
  const group = page.getByRole("radiogroup", { name: "Text size" });
  const p = page.locator("article p").nth(3);
  const before = parseFloat(await p.evaluate((el) => getComputedStyle(el).fontSize));
  await group.getByRole("radio", { name: "Large" }).focus();
  await page.keyboard.press("Enter");
  await expect(group.getByRole("radio", { name: "Large" })).toHaveAttribute("aria-checked", "true");
  expect(parseFloat(await p.evaluate((el) => getComputedStyle(el).fontSize))).toBeGreaterThan(
    before,
  );
  await page.reload();
  await expect(
    page.getByRole("radiogroup", { name: "Text size" }).getByRole("radio", { name: "Large" }),
  ).toHaveAttribute("aria-checked", "true");
});

test("read time, table of contents, progress bar", async ({ page }) => {
  await page.goto(study);
  await expect(page.getByText(/^\d+ min read$/)).toBeVisible();
  const toc = page.getByRole("navigation", { name: "On this page" });
  await expect(toc.getByRole("link")).toHaveText([
    "Context",
    "Problem",
    "Constraints",
    "Architecture",
    "Decisions & trade-offs",
    "Results",
    "Learnings",
  ]);
  await toc.getByRole("link", { name: "Results" }).click();
  await expect(page).toHaveURL(/#results$/);
  const bar = page.getByRole("progressbar", { name: "Reading progress" });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(bar).toHaveAttribute("aria-valuenow", "100");
});

for (const path of ["/?theme=editorial", study]) {
  test(`axe clean and 375px: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("font-family", /Libre Bodoni/);
    const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
    expect(violations.map((v) => v.id)).toEqual([]);
    await page.setViewportSize({ width: 375, height: 800 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
