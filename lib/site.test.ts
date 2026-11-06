// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { siteUrl } from "./site";

afterEach(() => vi.unstubAllEnvs());

it("prefers NEXT_PUBLIC_SITE_URL, then Vercel's production URL, then localhost", () => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
  expect(siteUrl().href).toBe("http://localhost:3000/");
  vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "portfolio.vercel.app");
  expect(siteUrl().href).toBe("https://portfolio.vercel.app/");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.dev");
  expect(siteUrl().href).toBe("https://example.dev/");
});
