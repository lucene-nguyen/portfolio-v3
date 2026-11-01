import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Each test is its own "visitor" so parallel workers never share a bucket.
test.beforeEach(async ({ page }, info) => {
  await page.setExtraHTTPHeaders({
    "x-forwarded-for": `192.0.2.${info.workerIndex}-${Date.now()}`,
  });
  await page.goto("/#lab");
});

const lab = (page: Page) => page.locator("#lab");
const meter = (page: Page) => lab(page).getByRole("meter");
const rows = (page: Page) =>
  lab(page)
    .getByRole("list", { name: /Request log/ })
    .getByRole("listitem");

test("controls and repo link", async ({ page }) => {
  for (const name of ["Token bucket", "Fixed window", "Send request", "Burst × 10", "Reset"]) {
    await expect(lab(page).getByRole("button", { name })).toBeVisible();
  }
  await expect(lab(page).getByRole("button", { name: "Token bucket" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await lab(page).getByRole("button", { name: "Fixed window" }).click();
  await expect(lab(page).getByRole("button", { name: "Fixed window" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(lab(page).getByRole("link", { name: "rate-limiting-lab" })).toHaveAttribute(
    "href",
    "https://github.com/lucene-nguyen/rate-limiting-lab",
  );
});

test("send one request", async ({ page }) => {
  await lab(page).getByRole("button", { name: "Send request" }).click();
  await expect(rows(page).first()).toContainText("200");
  await expect(rows(page).first()).toContainText("X-RateLimit-Remaining: 4");
  await expect(meter(page)).toHaveAttribute("aria-valuenow", "4");
});

test("burst of 10 produces at least one 429, keeps 8 rows, counters add to 10", async ({
  page,
}) => {
  await lab(page).getByRole("button", { name: "Burst × 10" }).click();
  await expect(page.getByRole("status").filter({ hasText: "10 sent" })).toHaveText(/10 sent/);
  await expect(rows(page)).toHaveCount(8);
  const ok = Number((await page.getByTestId("count-200").textContent())!.split("×")[1]);
  const blocked = Number((await page.getByTestId("count-429").textContent())!.split("×")[1]);
  expect(blocked).toBeGreaterThanOrEqual(1);
  expect(ok + blocked).toBe(10);
  await expect(rows(page).filter({ hasText: "429" }).first()).toContainText("Retry-After");

  // Drained (a slow burst under load may already have refilled one token), then refills without a request.
  const start = Number(await meter(page).getAttribute("aria-valuenow"));
  expect(start).toBeLessThanOrEqual(1);
  await expect
    .poll(async () => Number(await meter(page).getAttribute("aria-valuenow")), { timeout: 3000 })
    .toBeGreaterThan(start);

  const { violations } = await new AxeBuilder({ page }).include("#lab").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("reset clears the log and the limiter", async ({ page }) => {
  await lab(page).getByRole("button", { name: "Fixed window" }).click();
  await lab(page).getByRole("button", { name: "Burst × 10" }).click();
  await expect(page.getByTestId("count-429")).not.toHaveText("429 × 0");
  await lab(page).getByRole("button", { name: "Reset" }).click();
  await expect(page.getByTestId("count-200")).toHaveText("200 × 0");
  await expect(rows(page)).toHaveCount(1); // the "waiting" placeholder
  await lab(page).getByRole("button", { name: "Send request" }).click();
  await expect(rows(page).first()).toContainText("200");
});
