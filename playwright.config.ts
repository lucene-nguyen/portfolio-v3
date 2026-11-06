import { loadEnvConfig } from "@next/env";
import { defineConfig, devices } from "@playwright/test";

// Same .env files as the app build, so specs that read lib/features see the built flag state.
loadEnvConfig(process.cwd());

const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  // Themes locked (LEARNING-184): only Night terminal is reachable, so the other themes' specs are skipped.
  testIgnore:
    process.env.NEXT_PUBLIC_FEATURE_THEMES === "on"
      ? []
      : [
          /(3d-world|anime|bento|blueprint|cyberpunk|dashboard|docs|editorial|ide|neo-brutalism|pixel|swiss)\.spec\.ts$/,
        ],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${PORT}`, trace: "on-first-retry" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Production build everywhere (like CI): `next dev` compiles routes on demand and times out under
    // a parallel suite. E2E_DEV=1 uses the dev server for quick local iteration on a few specs.
    command: process.env.E2E_DEV
      ? `npm run dev -- -p ${PORT}`
      : `npm run build && npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
