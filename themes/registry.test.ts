import { describe, expect, it } from "vitest";
import { contrast } from "@/lib/theme/contrast";
import { defaultTheme, themes } from "./registry";

const HEX = /^#[0-9a-f]{6}$/i;

describe("theme registry", () => {
  it("defaults to Night terminal", () => expect(defaultTheme.id).toBe("night-terminal"));

  it("has unique kebab-case ids", () => {
    const ids = themes.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  describe.each(themes.map((t) => [t.id, t] as const))("%s", (_, t) => {
    const k = t.tokens;
    it("uses #RRGGBB colors", () => {
      const { fontSans, fontMono, fontHeading, radius, ...colors } = k;
      void [fontSans, fontMono, fontHeading, radius];
      Object.values(colors).forEach((c) => expect(c).toMatch(HEX));
    });
    it("has no token value that could break the generated CSS", () => {
      Object.values(k).forEach((v) => expect(v).not.toMatch(/[;{}<]/));
    });
    it.each([
      ["text", k.text],
      ["text2", k.text2],
      ["textSecondary", k.textSecondary],
      ["textMuted", k.textMuted],
      ["textSubtle", k.textSubtle],
      ["accent", k.accent],
      ["warning", k.warning],
      ["danger", k.danger],
    ])("%s reaches 4.5:1 on bg and surface", (_, fg) => {
      expect(contrast(fg, k.bg)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(fg, k.surface)).toBeGreaterThanOrEqual(4.5);
    });
    it("muted and subtle text also read on bgAlt and surface2", () => {
      [k.textMuted, k.textSubtle].forEach((fg) => {
        expect(contrast(fg, k.bgAlt)).toBeGreaterThanOrEqual(4.5);
      });
      expect(contrast(k.textMuted, k.surface2)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(k.text2, k.surface2)).toBeGreaterThanOrEqual(4.5);
    });
    it("accentContrast reaches 4.5:1 on accent", () => {
      expect(contrast(k.accentContrast, k.accent)).toBeGreaterThanOrEqual(4.5);
    });
  });
});
