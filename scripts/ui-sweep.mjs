// Local UI sweep: every theme × page, console/runtime errors, screenshots at 1440px and 375px.
// Usage (dev server running): node scripts/ui-sweep.mjs [baseUrl]
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:3000";
const THEMES = [
  "night-terminal",
  "blueprint",
  "pixel",
  "cyberpunk",
  "editorial",
  "swiss-minimal",
  "docs",
  "dashboard",
  "ide",
  "bento",
  "neo-brutalism",
  "anime",
  "3d-world",
];
const PAGES = [
  "/",
  "/work/pharmacy-inventory",
  "/work/ai-image-pipeline",
  "/work/aws-file-ingestion",
];

async function waitForServer() {
  for (let i = 0; i < 120; i++) {
    try {
      if ((await fetch(BASE)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`server not reachable at ${BASE}`);
}

const report = { themes: {}, api: {}, lab: null };
await waitForServer();
const browser = await chromium.launch();

for (const theme of THEMES) {
  const issues = [];
  for (const path of PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    page.on("console", (m) => {
      // Chromium GPU-driver notes caused by screenshots reading WebGL pixels back; not app output.
      if (m.text().includes("GL Driver Message")) return;
      if (m.type() === "error" || m.type() === "warning")
        issues.push(`${path} console.${m.type()}: ${m.text().slice(0, 200)}`);
    });
    page.on("pageerror", (e) => issues.push(`${path} pageerror: ${e.message.slice(0, 200)}`));
    page.on("response", (r) => {
      if (r.status() >= 400) issues.push(`${path} HTTP ${r.status()} ${r.url()}`);
    });
    const res = await page.goto(`${BASE}${path}?theme=${theme}`, { waitUntil: "networkidle" });
    if (!res?.ok()) issues.push(`${path} status ${res?.status()}`);
    const applied = await page.evaluate(() => document.documentElement.dataset.theme);
    if (applied !== theme) issues.push(`${path} data-theme=${applied}`);
    await page.waitForTimeout(800);
    if (path === "/") {
      await mkdir(`docs/screenshots/${theme}`, { recursive: true });
      await page.screenshot({ path: `docs/screenshots/${theme}/desktop-1440.png`, fullPage: true });
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(500);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 0) issues.push(`/ horizontal overflow at 375px: ${overflow}px`);
      await page.screenshot({ path: `docs/screenshots/${theme}/mobile-375.png`, fullPage: true });
      // Mobile menu open (viewport only).
      await page
        .getByRole("navigation", { name: "Main" })
        .getByRole("button", { name: "Menu" })
        .click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: `docs/screenshots/${theme}/mobile-375-menu.png` });
    }
    await ctx.close();
  }
  report.themes[theme] = issues;
  console.log(`${theme}: ${issues.length ? issues.length + " issue(s)" : "clean"}`);
}

// Live lab on the memory store (no .env.local).
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  const lab = page.locator("#lab");
  // Start from a full limiter (earlier sweeps share this IP in the in-memory store).
  await lab.getByRole("button", { name: "Reset" }).click();
  await page.waitForTimeout(300);
  await lab.getByRole("button", { name: "Burst × 10" }).click();
  await page.waitForTimeout(1500);
  report.lab = {
    ok: await page.getByTestId("count-200").textContent(),
    blocked: await page.getByTestId("count-429").textContent(),
  };
  await page.close();
}

for (const path of [
  "/api/ping",
  "/api/stats",
  "/api/github",
  "/search-index.json",
  "/sitemap.xml",
  "/robots.txt",
  "/opengraph-image",
]) {
  const r = await fetch(`${BASE}${path}`);
  report.api[path] = { status: r.status, store: r.headers.get("x-ratelimit-store") ?? undefined };
}

await browser.close();
await writeFile("docs/screenshots/sweep-report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ lab: report.lab, api: report.api }, null, 2));
