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
      [
        k.bg,
        k.surface,
        k.border,
        k.text,
        k.textMuted,
        k.textSubtle,
        k.accent,
        k.accentContrast,
      ].forEach((c) => expect(c).toMatch(HEX));
    });
    it.each([
      ["text", k.text],
      ["textMuted", k.textMuted],
      ["textSubtle", k.textSubtle],
    ])("%s reaches 4.5:1 on bg and surface", (_, fg) => {
      expect(contrast(fg, k.bg)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(fg, k.surface)).toBeGreaterThanOrEqual(4.5);
    });
    it("accentContrast reaches 4.5:1 on accent", () => {
      expect(contrast(k.accentContrast, k.accent)).toBeGreaterThanOrEqual(4.5);
    });
  });
});
