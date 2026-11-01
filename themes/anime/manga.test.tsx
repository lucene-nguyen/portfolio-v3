// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { experience } from "@/content/home";
import { contrast } from "@/lib/theme/contrast";
import { anime } from "./index";
import { chapters, MangaStrip } from "./manga";

it("one panel per role, oldest first, each with alt text and a quoted bubble", () => {
  expect(chapters.map((c) => c.company)).toEqual(
    [...experience.roles].reverse().map((r) => r.company),
  );
  const html = renderToStaticMarkup(<MangaStrip />);
  expect(html.match(/role="img"/g)).toHaveLength(experience.roles.length);
  expect(html.match(/aria-label="Abstract manga panel for /g)).toHaveLength(
    experience.roles.length,
  );
  for (const r of experience.roles) expect(html).toContain(r.summary.replace(/&/g, "&amp;"));
});

it("bubble text (text on surface) passes 4.5:1", () => {
  expect(contrast(anime.tokens.text, anime.tokens.surface)).toBeGreaterThanOrEqual(4.5);
});
