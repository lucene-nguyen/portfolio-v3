import { defineConfig } from "@playwright/test";
import base from "./playwright.config";

// Performance checks, one worker, nothing else running.
export default defineConfig({
  ...base,
  testDir: "./e2e-perf",
  testMatch: "**/*.perf.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
});
