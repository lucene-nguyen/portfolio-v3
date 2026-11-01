import { slugify } from "./slug";

export interface SearchDoc {
  title: string;
  /** Where the result lives, e.g. "Case studies › AI image pipeline". */
  section: string;
  href: string;
  text: string;
}

export interface SearchHit {
  doc: SearchDoc;
  snippet: string;
}

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

/** Every term must appear (title or text); title matches rank first. */
export function search(docs: readonly SearchDoc[], query: string, limit = 8): SearchHit[] {
  const terms = norm(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return docs
    .map((doc) => {
      const title = norm(doc.title);
      const text = norm(doc.text);
      if (!terms.every((t) => title.includes(t) || text.includes(t))) return null;
      const score = terms.reduce(
        (s, t) => s + (title.includes(t) ? 3 : 0) + (text.includes(t) ? 1 : 0),
        0,
      );
      return { doc, score, snippet: snippet(doc.text, text.indexOf(terms[0])) };
    })
    .filter((h): h is SearchHit & { score: number } => h !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc, snippet }) => ({ doc, snippet }));
}

function snippet(text: string, at: number, size = 140) {
  if (at < 0) return text.slice(0, size) + (text.length > size ? "…" : "");
  const start = Math.max(0, at - 40);
  return (
    (start > 0 ? "…" : "") +
    text.slice(start, start + size).trim() +
    (start + size < text.length ? "…" : "")
  );
}

/** Turns an MDX case study into one doc per `##` section (JSX and comments stripped). */
export function mdxToDocs(mdx: string, base: { title: string; href: string }): SearchDoc[] {
  const clean = mdx
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/<[A-Z][\s\S]*?\/>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*|__|`/g, "");
  return clean
    .split(/^## /m)
    .slice(1)
    .map((chunk) => {
      const [heading, ...rest] = chunk.split("\n");
      return {
        title: `${base.title} — ${heading.trim()}`,
        section: base.title,
        href: `${base.href}#${slugify(heading.trim())}`,
        text: rest
          .map((line) => line.replace(/^#+\s*/, "").replace(/^\s*[-*]\s+/, ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim(),
      };
    });
}
