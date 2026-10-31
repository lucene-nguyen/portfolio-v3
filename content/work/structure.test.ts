// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { work } from "@/content/home";

const SECTIONS = [
  "Context",
  "Problem",
  "Constraints",
  "Architecture",
  "Decisions & trade-offs",
  "Results",
  "Learnings",
];

describe.each(work.items.map((w) => [w.slug]))("%s.mdx", (slug) => {
  const mdx = readFileSync(`content/work/${slug}.mdx`, "utf8");

  it("follows Context → Problem → Constraints → Architecture → Decisions → Results → Learnings", () => {
    expect([...mdx.matchAll(/^## (.+)$/gm)].map((m) => m[1])).toEqual(SECTIONS);
  });

  it("has an architecture diagram in the Architecture section", () => {
    const arch = mdx.split("## Architecture")[1].split("## ")[0];
    expect(arch).toContain("<ArchitectureDiagram");
  });

  it("names no client (NDA)", () => {
    expect(mdx).not.toMatch(/Long Ch[aâ]u/i);
  });
});
