import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { features } from "../lib/features";

// Each test is its own visitor, so the contact rate limit never leaks between tests.
test.beforeEach(async ({ page }, info) => {
  await page.setExtraHTTPHeaders({
    "x-forwarded-for": `203.0.114.${info.workerIndex}-${Date.now()}`,
  });
});

// Interact after hydration; an early click would fall back to a native (no-JS) form post.
const open = async (page: Page, path = "/#contact") => {
  await page.goto(path);
  await page.waitForLoadState("networkidle");
};
const form = (page: Page) => page.getByRole("form", { name: "Send a message" });
const fill = async (page: Page, type = "Freelance project") => {
  const f = form(page);
  await f.getByLabel("Name").fill("Lan Tran");
  await f.getByLabel("Email").fill("lan@example.com");
  await f.getByLabel(type).check();
  await f
    .getByLabel("What do you need, and by when?")
    .fill("A booking app for three clinics, live by March.");
};
const send = (page: Page) => form(page).getByRole("button", { name: "Send message" }).click();

test("owner copy, direct email and Zalo; no budget field", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact.getByRole("heading", { level: 2 })).toHaveText(
    "Need a fullstack engineer on your team, full-time or part-time? I'd love to hear about it.",
  );
  await expect(contact).toContainText("Have a web app project instead? Send me a brief.");
  await expect(contact.getByRole("link", { name: "manhcuongmvc@gmail.com" })).toHaveAttribute(
    "href",
    "mailto:manhcuongmvc@gmail.com",
  );
  await expect(contact.getByRole("link", { name: "Zalo 0339696831" })).toHaveAttribute(
    "href",
    "https://zalo.me/0339696831",
  );
  await expect(form(page).getByLabel(/budget/i)).toHaveCount(0);
  for (const t of ["Full-time", "Part-time", "Freelance project", "Consulting"])
    await expect(form(page).getByRole("radio", { name: t })).toBeVisible();
});

test("invalid submit: inline errors, focused summary, values kept; axe clean", async ({ page }) => {
  await open(page);
  await form(page).getByLabel("Email").fill("nope");
  await send(page);
  const summary = page.locator('[data-part="form-summary"]');
  await expect(summary).toBeFocused();
  await expect(summary).toContainText("Check the 4 highlighted fields.");
  const email = form(page).getByLabel("Email");
  await expect(email).toHaveValue("nope");
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(email).toHaveAccessibleDescription("Enter an email address like name@example.com.");
  await expect(form(page).getByLabel("Name")).toHaveAccessibleDescription("Enter your name.");
  await expect(
    form(page).getByRole("group", { name: /work together/ }),
  ).toHaveAccessibleDescription("Choose how you'd like to work together.");
  const { violations } = await new AxeBuilder({ page }).include("#contact").analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("valid submit: success status, form cleared", async ({ page }) => {
  await open(page);
  await fill(page);
  await form(page).getByLabel("Phone or Zalo (optional)").fill("+84 339 696 831");
  await send(page);
  await expect(form(page).getByRole("status")).toHaveText("Thanks, your message was sent.");
  await expect(form(page).getByLabel("Name")).toHaveValue("");
  await expect(form(page).getByLabel("Freelance project")).not.toBeChecked();
});

test("honeypot: looks sent, nothing else happens", async ({ page }) => {
  await open(page);
  await page.locator("#contact-hp").evaluate((el: HTMLInputElement) => (el.value = "spam"));
  await send(page); // even empty: bots get the same success
  await expect(form(page).getByRole("status")).toHaveText("Thanks, your message was sent.");
  await expect(page.locator('[data-part="form-summary"]')).toHaveCount(0);
});

test("rate limit: an alert with the direct email", async ({ page }) => {
  await open(page);
  for (let i = 0; i < 6; i++) {
    await fill(page);
    await send(page);
    await expect(form(page).getByRole("button", { name: "Send message" })).toBeEnabled();
  }
  await expect(form(page).getByRole("alert")).toContainText("Too many messages");
  await expect(form(page).getByRole("alert")).toContainText("manhcuongmvc@gmail.com");
});

test("type is preselected from the URL and from Work with me CTAs", async ({ page }) => {
  await page.goto("/?type=consulting#contact");
  await expect(form(page).getByRole("radio", { name: "Consulting" })).toBeChecked();
  if (!features.workWithMe) return; // the CTAs live in the parked Work with me section (round 4)
  await page.goto("/");
  await page.locator("#work-with-me").getByRole("link", { name: "Discuss a web app" }).click();
  await expect(page).toHaveURL(/\?type=freelance#contact$/);
  await expect(form(page).getByRole("radio", { name: "Freelance project" })).toBeChecked();
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("the server renders the errors", async ({ page }) => {
    await open(page);
    await send(page);
    await expect(page.locator('[data-part="form-summary"]')).toContainText("highlighted fields");
    await expect(page.locator("#contact-name-error")).toHaveText("Enter your name.");
  });
});
