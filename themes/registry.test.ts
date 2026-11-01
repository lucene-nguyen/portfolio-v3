import { readdirSync, readFileSync } from "node:fs";
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
      const { fontSans, fontMono, fontHeading, radius, meterFill, ...colors } = k;
      if (meterFill) expect(meterFill).toMatch(HEX);
      void [fontSans, fontMono, fontHeading, radius];
      Object.values(colors).forEach((c) => expect(c).toMatch(HEX));
    });
    it("has no token value that could break the generated CSS", () => {
      Object.values(k).forEach((v) => expect(v).not.toMatch(/[;{}<]/));
    });
    const grounds = { bg: k.bg, bgAlt: k.bgAlt, surface: k.surface, surface2: k.surface2 };
    const texts = {
      text: k.text,
      text2: k.text2,
      textSecondary: k.textSecondary,
      textMuted: k.textMuted,
      accent: k.accent,
      warning: k.warning,
      danger: k.danger,
    };
    it("textSubtle reaches 4.5:1 on bg, bgAlt and surface (never used on surface2)", () => {
      for (const ground of [k.bg, k.bgAlt, k.surface]) {
        expect(contrast(k.textSubtle, ground)).toBeGreaterThanOrEqual(4.5);
      }
    });
    it.each(Object.entries(texts))("%s reaches 4.5:1 on every ground", (_, fg) => {
      for (const [name, ground] of Object.entries(grounds)) {
        expect(contrast(fg, ground), name).toBeGreaterThanOrEqual(4.5);
      }
    });
    it("meter fill (if set) reaches 3:1 on bg", () => {
      if (k.meterFill) expect(contrast(k.meterFill, k.bg)).toBeGreaterThanOrEqual(3);
    });
    it("accentContrast reaches 4.5:1 on accent", () => {
      expect(contrast(k.accentContrast, k.accent)).toBeGreaterThanOrEqual(4.5);
    });
  });
});

it("imports every theme stylesheet in the root layout (styled on first paint)", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  for (const dir of readdirSync("themes", { withFileTypes: true }).filter((d) => d.isDirectory())) {
    for (const css of readdirSync(`themes/${dir.name}`).filter((f) => f.endsWith(".css"))) {
      expect(layout, `${dir.name}/${css}`).toContain(`@/themes/${dir.name}/${css}`);
    }
  }
});
