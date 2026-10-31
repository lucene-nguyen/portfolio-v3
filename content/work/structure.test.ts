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

  it("uses the card's generalized client wording (NDA)", () => {
    const client = work.items.find((w) => w.slug === slug)!.meta.match(/\w+ client/)?.[0];
    if (client) expect(mdx).toContain(client);
  });
});
