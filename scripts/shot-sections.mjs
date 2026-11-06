// Screenshot of a theme's shared sections (hero → contact) at 1440px, for design review.
// Usage (dev server running): node scripts/shot-sections.mjs <theme> <out.png> [baseUrl]
import { chromium } from "@playwright/test";
const [theme, out, base = "http://localhost:3000"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(`${base}/?theme=${theme}`, { waitUntil: "load" });
await p.waitForTimeout(1500);
const clip = async (sel) => await p.locator(sel).boundingBox();
const parts = ["#top", "#skills", "#experience", "#contact"];
const boxes = await Promise.all(parts.map(clip));
const y0 = boxes[0].y,
  y1 = boxes.at(-1).y + boxes.at(-1).height;
await p.screenshot({
  path: out,
  fullPage: true,
  clip: { x: 0, y: y0, width: 1440, height: Math.min(y1 - y0, 6000) },
});
await b.close();
