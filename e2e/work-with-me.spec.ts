import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { themes } from "../themes/registry";

const services = [
  ["End-to-end web apps", "Discuss a web app", "freelance"],
  ["Backend, API and AWS", "Discuss a backend", "freelance"],
  ["Industry starter kits", "Ask about a kit", "freelance"],
  ["Architecture consulting", "Request a review", "consulting"],
] as const;

test("services with CTAs that preselect a collaboration type; steps in order; no prices", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator("#work-with-me");
  await expect(section.locator('[data-part="eyebrow"]')).toHaveText("04 / work with me");
  for (const [name, cta, type] of services) {
    const card = section.locator('[data-part="kit"]').filter({ hasText: name });
    await expect(card.getByRole("heading", { level: 3, name })).toBeVisible();
    await expect(card.getByRole("link", { name: cta })).toHaveAttribute(
      "href",
      `/?type=${type}#contact`,
    );
  }
  // Kit availability comes from the kits data, not from the copy.
  await expect(section).toContainText("TableTap: in progress");
  await expect(section).not.toContainText(/[$€£₫]|\bprice/i);
  await expect(section.locator('[data-part="role"] h4')).toHaveText([
    "Discuss",
    "Proposal",
    "Build",
    "Hand-over and support",
  ]);
  await expect(section.getByText("Spec → code → test → review")).toBeVisible();
});

test("hero CTA and nav lead here; search knows it; section sits before Contact", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator("#top").getByRole("link", { name: "Work with me" })).toHaveAttribute(
    "href",
    "#work-with-me",
  );
  await expect(
    page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Work with me" }),
  ).toHaveAttribute("href", "/#work-with-me");
  const ids = await page
    .locator("main > section[id], footer#contact")
    .evaluateAll((els) => els.map((e) => e.id));
  expect(ids.slice(-2)).toEqual(["work-with-me", "contact"]);
  const docs: { href: string }[] = await (await request.get("/search-index.json")).json();
  expect(docs.some((d) => d.href === "/#work-with-me")).toBe(true);
});

for (const { id } of themes) {
  test(`375px and axe: ${id}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/?theme=${id}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", id);
    await expect(page.locator("#work-with-me")).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    const { violations } = await new AxeBuilder({ page }).include("#work-with-me").analyze();
    expect(violations.map((v) => v.id)).toEqual([]);
  });
}

test("dashboard and IDE label the steps, not the career", async ({ page }) => {
  const pseudo = (sel: string, which: "::before" | "::after") =>
    page.locator(sel).evaluate((e, w) => getComputedStyle(e, w).content, which);
  await page.goto("/?theme=dashboard");
  // The theme layout remounts the page once it loads; measure after that.
  await expect(page.getByTestId("panel-github")).toBeVisible();
  expect(await pseudo('#work-with-me [data-part="roles"]', "::before")).toContain("STEP");
  expect(await pseudo('#experience [data-part="roles"]', "::before")).toContain("PERIOD");
  await page.goto("/?theme=ide");
  expect(await pseudo('#work-with-me [data-part="roles"]', "::before")).toContain("PROCESS");
});
