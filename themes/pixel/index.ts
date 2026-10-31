import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/pixel.md
export const pixel: ThemeDefinition = {
  id: "pixel",
  name: "Pixel",
  colorScheme: "dark",
  features: [() => import("./achievements")],
  tokens: {
    bg: "#1A1C2C",
    bgAlt: "#1F2133",
    surface: "#262B44",
    surface2: "#2F3555",
    border: "#3B4270",
    borderStrong: "#8B93C9",
    text: "#F4F4F4",
    text2: "#E0E3F2",
    textSecondary: "#C8CCE4",
    textMuted: "#AEB4D6",
    textSubtle: "#A1A8CE",
    accent: "#A7F070",
    accentContrast: "#1A1C2C",
    warning: "#FFCD75",
    danger: "#FF9A8A",
    // Defined by the Pixel feature chunk; falls back to the sans until it loads.
    fontHeading: "var(--font-press-start, var(--font-inter-tight))",
    radius: "0px",
  },
};
