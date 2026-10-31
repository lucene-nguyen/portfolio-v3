import { afterEach, describe, expect, it } from "vitest";
import { themeScript, themesToCss } from "./css";
import type { ThemeDefinition } from "@/themes/types";

const tokens = {
  bg: "#000000",
  surface: "#111111",
  border: "#222222",
  text: "#ffffff",
  textMuted: "#cccccc",
  textSubtle: "#bbbbbb",
  accent: "#00ff00",
  accentContrast: "#000000",
};
const a: ThemeDefinition = { id: "a", name: "A", colorScheme: "dark", tokens };
const b: ThemeDefinition = { id: "b", name: "B", colorScheme: "light", tokens };

describe("themesToCss", () => {
  it("emits kebab-case variables per theme and maps the default to :root", () => {
    const css = themesToCss([a, b], "a");
    expect(css).toContain(':root,[data-theme="a"]{color-scheme:dark;--bg:#000000;');
    expect(css).toContain("--text-muted:#cccccc;");
    expect(css).toContain('[data-theme="b"]{color-scheme:light;');
    expect(css).not.toContain(':root,[data-theme="b"]');
  });
});

describe("themeScript", () => {
  const run = (search: string, stored: string | null) => {
    window.history.replaceState(null, "", `/${search}`);
    localStorage.clear();
    if (stored) localStorage.setItem("theme", stored);
    document.documentElement.removeAttribute("data-theme");
    new Function(themeScript(["a", "b"], "a"))();
    return document.documentElement.dataset.theme;
  };
  afterEach(() => localStorage.clear());

  it("uses the default with no input", () => expect(run("", null)).toBe("a"));
  it("uses a stored valid theme", () => expect(run("", "b")).toBe("b"));
  it("ignores a stored unknown theme", () => expect(run("", "zzz")).toBe("a"));
  it("lets ?theme override storage", () => expect(run("?theme=a", "b")).toBe("a"));
  it("ignores an unknown ?theme", () => expect(run("?theme=zzz", "b")).toBe("b"));
});
