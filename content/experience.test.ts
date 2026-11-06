// @vitest-environment node
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ExperienceSection } from "@/components/home/experience-section";
import { experience } from "./en/home";

// The resume as one line of text, with only the owner-approved typo fixes (LEARNING-183).
const source = readFileSync("docs/resume/resume-source.txt", "utf8")
  .replace(/​/g, "")
  // PDF artifacts: bullet glyphs and page footers (page 3 split Faboshop's bullets from their text).
  .replace(/●/g, " ")
  .replace(/Page \d+/g, " ")
  .replace(/\s+/g, " ")
  .replace(/\.\./g, ".")
  .replace(/Nodejs/g, "Node.js")
  .replace(/→ Enable the backend/g, "→ Enabled the backend")
  .replace(/\bIOS\b/g, "iOS")
  .replace(/Long Chau’s/g, "Long Châu’s")
  .replace(/\(9\/2025/g, "(09/2025")
  .replace(/– 9\/2025/g, "– 09/2025");

const entries = experience.roles.flatMap((r) => r.entries);
const bullets = entries.flatMap((e) => e.bullets);

// Page text: tags stripped, entities decoded.
const html = renderToStaticMarkup(ExperienceSection());
const page = html
  .replace(/<[^>]+>/g, "\n")
  .replace(/&#x27;|&#39;/g, "'")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"');
const lines = new Set(page.split("\n").map((l) => l.trim()));

describe("experience (verbatim from the resume)", () => {
  it("copies every bullet and result word for word from the resume", () => {
    expect(bullets).toHaveLength(6 + 8 + 9 + 5 + 6);
    for (const b of bullets) {
      // Bullet and result together, and the result ends where the resume's does (no shortening).
      const pair = `${b.text} → ${b.result}`;
      const at = source.indexOf(pair);
      expect(at, b.text).toBeGreaterThanOrEqual(0);
      expect(source.slice(at + pair.length, at + pair.length + 2), b.result).toMatch(
        /^( [A-Z(]|$)/,
      );
    }
  });

  it("shows every bullet and result on the page exactly", () => {
    for (const b of bullets) {
      expect(lines.has(b.text), b.text).toBe(true);
      // The arrow is decorative (aria-hidden span), so the result is its own text node.
      expect(lines.has(b.result), b.result).toBe(true);
    }
  });

  it("has the owner's structure, no project codes, and tags from the entry's own bullets", () => {
    expect(experience.roles.map((r) => [r.company, r.period])).toEqual([
      ["FPT Software", "03/2024 – 07/2026"],
      ["NEOX", "08/2022 – 03/2024"],
      ["Faboshop", "01/2021 – 08/2022"],
    ]);
    expect(experience.roles[0].entries.map((e) => [e.title, e.period])).toEqual([
      ["Software Engineer", "01/2026 – 07/2026"],
      ["Software Engineer", "09/2025 – 12/2025"],
      ["Software Engineer – FPT Retail – Long Châu Pharmacy", "03/2024 – 09/2025"],
    ]);
    expect(page).not.toMatch(/YMTWMS25|AI1\.SOL\.RENESAS/);
    expect((html.match(/aria-hidden="true">→ <\/span>/g) ?? []).length).toBe(bullets.length);
    for (const e of entries) {
      const text = e.bullets.map((b) => `${b.text} ${b.result}`).join(" ");
      for (const t of e.tags)
        expect(text, `${e.title}: ${t}`).toMatch(
          new RegExp(`(^|[^\w])${t.replace(/\./g, "\.")}(?![\w])`),
        );
    }
  });

  it("lists both certifications with the resume's URLs", () => {
    for (const c of experience.certifications) {
      expect(source).toContain(c.name);
      expect(source).toContain(c.url);
      expect(html).toContain(`href="${c.url}"`);
    }
    expect(experience.certifications).toHaveLength(2);
    // Round 4: the block is "Education & Certifications" and opens with the owner's education line.
    expect(page).toContain("Education & Certifications");
    expect(page).toContain(
      "University of Information Technology (UIT) – VNU-HCM · Information Technology · 2025 – Present",
    );
  });
});
