import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { themes } from "../themes/registry";

const groups = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  Backend: ["Node.js", "NestJS", "GraphQL", "REST", "WebSocket"],
  "Data & messaging": [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Elasticsearch",
    "RabbitMQ",
    "Kafka",
  ],
  "Cloud & DevOps": ["AWS", "Docker", "GitHub Actions", "Grafana"],
};

test("every skill has a visible label and a decorative icon; generic icons where no brand", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator("#skills");
  await expect(section.getByRole("heading", { level: 2, name: "Skills" })).toBeVisible();
  await expect(section.locator('[data-part="eyebrow"]')).toHaveText("01 / skills");
  for (const [group, items] of Object.entries(groups)) {
    const list = section.getByRole("heading", { level: 3, name: group }).locator("+ ul");
    await expect(list.locator('[data-part="skill"]')).toHaveText(items);
  }
  const skill = (name: string) =>
    section.locator('[data-part="skill"]').filter({ hasText: new RegExp(`^${name}$`) });
  for (const name of [...Object.values(groups).flat(), "Go", "Python"]) {
    const icon = skill(name).locator("svg");
    await expect(icon, name).toHaveCount(1);
    await expect(icon, name).toHaveAttribute("aria-hidden", "true");
  }
  for (const name of ["AWS", "REST", "WebSocket"])
    await expect(skill(name).locator("svg"), name).toHaveAttribute("data-icon", "generic");
  await expect(skill("React").locator("svg")).toHaveAttribute("data-icon", "brand");
  // Also familiar with: smaller and muted.
  const primary = await skill("React").evaluate((e) => parseFloat(getComputedStyle(e).fontSize));
  const go = skill("Go");
  expect(await go.evaluate((e) => parseFloat(getComputedStyle(e).fontSize))).toBeLessThanOrEqual(
    primary,
  );
  const color = (l: import("@playwright/test").Locator) =>
    l.evaluate((e) => getComputedStyle(e).color);
  const reactColor = await color(skill("React").locator("span"));
  expect(await color(go)).not.toBe(reactColor);
  expect(await color(section.getByRole("heading", { name: "Also familiar with" }))).not.toBe(
    reactColor,
  );
});

test("the stack panel lives in Skills only; nav and search link to it", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator('[data-part="stack"]')).toHaveCount(1);
  await expect(page.locator('#skills [data-part="stack"]')).toHaveCount(1);
  await expect(page.locator("#experience").getByText("stack.json")).toHaveCount(0);
  await expect(
    page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Skills" }),
  ).toHaveAttribute("href", "/#skills");
  const docs: { href: string; title: string }[] = await (
    await request.get("/search-index.json")
  ).json();
  expect(docs.find((d) => d.href === "/#skills")?.title).toBe("Skills");
});

for (const { id } of themes) {
  test(`375px, labels on one line, axe clean: ${id}`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/?theme=${id}`);
    await expect(page.locator("html")).toHaveAttribute("data-theme", id);
    const skills = page.locator('#skills [data-part="skill"]');
    await expect(skills.first()).toBeVisible();
    // Each label stays on one line (nowrap): its text has a single line box.
    const lines = await skills.evaluateAll((els) =>
      els.map((e) => {
        const r = document.createRange();
        const text = document.createTreeWalker(e, NodeFilter.SHOW_TEXT).nextNode()!;
        r.selectNodeContents(text);
        return new Set([...r.getClientRects()].map((x) => Math.round(x.bottom))).size;
      }),
    );
    expect(Math.max(...lines)).toBe(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    const { violations } = await new AxeBuilder({ page }).include("#skills").analyze();
    expect(violations.map((v) => v.id)).toEqual([]);
  });
}

test("themes keep their chip and heading styles in Skills", async ({ page }) => {
  const chip = () => page.locator('#skills [data-part="skill"] span').first();
  await page.goto("/?theme=pixel");
  await expect(chip()).toHaveCSS("border-top-width", "2px");
  await page.goto("/?theme=editorial");
  await expect(chip()).toHaveCSS("border-top-width", "0px");
  await page.goto("/?theme=swiss-minimal");
  const secondary = page.getByRole("heading", { name: "Also familiar with" });
  await expect(secondary).toHaveCSS("text-transform", "none");
  await expect(page.locator('#contact [data-part="avatar"]')).toHaveCSS(
    "border-top-left-radius",
    /^9999px|50%$/,
  );
  // The panel spans the section, not just its content.
  const [panel, section] = await Promise.all([
    page.locator('#skills [data-part="stack"]').boundingBox(),
    page.locator("#skills > div").boundingBox(),
  ]);
  expect(panel!.width).toBeGreaterThan(section!.width - 60);
});
