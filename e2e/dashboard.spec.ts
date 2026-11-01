import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const github = {
  user: "lucene-nguyen",
  publicRepos: 7,
  events: [{ type: "Push", repo: "lucene-nguyen/x", at: "2026-10-30T10:00:00Z" }],
};

test.beforeEach(async ({ page }, info) => {
  await page.setExtraHTTPHeaders({
    "x-forwarded-for": `198.20.${info.workerIndex}.${Date.now() % 250}`,
  });
  await page.route("**/api/github", (r) => r.fulfill({ json: github }));
});

test("every panel states its source", async ({ page }) => {
  await page.goto("/?theme=dashboard");
  const panels = page.locator("[aria-labelledby=dashboard-title] section");
  await expect(panels).toHaveCount(5);
  for (const p of await panels.all()) await expect(p).toContainText("Source:");
});

test("live traffic reflects /api/ping across visitors; chart has a text alternative", async ({
  page,
  request,
}) => {
  for (let i = 0; i < 7; i++)
    await request.get("/api/ping?algo=window", { headers: { "x-forwarded-for": "203.0.113.250" } });
  await page.goto("/?theme=dashboard");
  const traffic = page.getByTestId("panel-traffic");
  await expect(traffic.getByTestId("stat-limited")).not.toHaveText("—");
  expect(Number(await traffic.getByTestId("stat-limited").textContent())).toBeGreaterThanOrEqual(2);
  await expect(
    traffic.getByRole("img", { name: /Requests per second.*dashed line/ }),
  ).toBeVisible();
  await expect(traffic.locator("table caption")).toHaveText(/Requests per second/);
  await expect(traffic.locator("polyline[stroke-dasharray]")).toHaveCount(1);
});

test("derived panels come from content", async ({ page }) => {
  await page.goto("/?theme=dashboard");
  await expect(page.getByRole("region", { name: "Career uptime" })).toContainText(
    "5+ years shipping",
  );
  await expect(page.getByRole("region", { name: "Career uptime" })).toContainText("since Jan 2021");
  await expect(
    page.getByRole("region", { name: "Stack usage" }).getByRole("listitem").first(),
  ).toContainText("NestJS2");
  await expect(page.getByTestId("panel-github")).toContainText("7 public repos");
});

test("degrades gracefully when APIs are unavailable", async ({ page }) => {
  await page.route("**/api/stats", (r) => r.fulfill({ status: 503, json: { error: "x" } }));
  await page.route("**/api/github", (r) => r.fulfill({ status: 503, json: { error: "x" } }));
  await page.goto("/?theme=dashboard");
  await expect(page.getByTestId("panel-traffic").getByRole("status")).toContainText("Unavailable");
  await expect(page.getByTestId("panel-github").getByRole("status")).toContainText("Unavailable");
  await expect(page.getByRole("region", { name: "Timeline" })).toContainText("FPT Software");
});

test("axe clean; 375px", async ({ page }) => {
  await page.goto("/?theme=dashboard");
  await expect(page.getByTestId("panel-traffic")).toBeVisible();
  const { violations } = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
  await page.setViewportSize({ width: 375, height: 800 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
