import { describe, expect, it } from "vitest";
import { mdxToDocs, search, type SearchDoc } from "./search";

const docs: SearchDoc[] = [
  { title: "Redis inventory", section: "Work", href: "/a", text: "Cutting latency with a cache." },
  {
    title: "AI pipeline",
    section: "Work",
    href: "/b",
    text: "Redis is not used; Databricks Model Serving is.",
  },
  { title: "Stack", section: "Home", href: "/c", text: "Node.js NestJS PostgreSQL" },
];

describe("search", () => {
  it("requires every term and ranks title matches first", () => {
    expect(search(docs, "redis").map((h) => h.doc.href)).toEqual(["/a", "/b"]);
    expect(search(docs, "redis databricks").map((h) => h.doc.href)).toEqual(["/b"]);
  });
  it("is case- and accent-insensitive", () => {
    expect(search([{ ...docs[0], text: "Long Châu" }], "chau")).toHaveLength(1);
  });
  it("returns nothing for blank or unmatched queries", () => {
    expect(search(docs, "   ")).toEqual([]);
    expect(search(docs, "kubernetes")).toEqual([]);
  });
  it("builds a snippet around the first match", () => {
    expect(search(docs, "model")[0].snippet).toContain("Model Serving");
  });
});

describe("mdxToDocs", () => {
  it("splits sections, strips JSX and comments, links to heading ids", () => {
    const mdx = `{/* note */}\n\n## Context\n\nSome **text**.\n\n## Decisions & trade-offs\n\n<Diagram\n  a={[1]}\n/>\n\n### Sub\n\nMore.`;
    const out = mdxToDocs(mdx, { title: "Study", href: "/work/s" });
    expect(out.map((d) => d.href)).toEqual(["/work/s#context", "/work/s#decisions-and-trade-offs"]);
    expect(out[0].text).toBe("Some text.");
    expect(out[1].text).toBe("Sub More.");
  });
});
