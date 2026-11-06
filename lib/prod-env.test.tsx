// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, expect, it, vi } from "vitest";

// LEARNING-188: with the contact server parked, Production needs none of these. Pages must render without them.
const UNSET = [
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "RL_SALT",
  "REDIS_KEY_PREFIX",
  "RESEND_API_KEY",
  "RESEND_FROM",
  "GITHUB_TOKEN",
  "NEXT_PUBLIC_FEATURE_CONTACT_SERVER",
];

beforeAll(() => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("VERCEL_ENV", "production");
  for (const k of UNSET) vi.stubEnv(k, "");
  vi.resetModules();
});
afterAll(() => vi.unstubAllEnvs());

it("renders every home section and the contact form in production with an empty env", async () => {
  const { Hero } = await import("@/components/home/hero");
  const { SkillsSection } = await import("@/components/home/skills-section");
  const { ExperienceSection } = await import("@/components/home/experience-section");
  const { KitsSection } = await import("@/components/home/kits-section");
  const { ContactForm } = await import("@/components/home/contact-form");
  const { LocaleProvider } = await import("@/components/i18n/locale-provider");
  const html = renderToStaticMarkup(
    <LocaleProvider locale="en">
      <Hero />
      <SkillsSection />
      <ExperienceSection />
      <KitsSection />
      <ContactForm />
    </LocaleProvider>,
  );
  expect(html).toContain('id="experience"');
  expect(html).toContain("Send message");
  // The server-delivery guards are lazy: nothing above touched them.
  const { features } = await import("@/lib/features");
  expect(features.contactServer).toBe(false);
});
