import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/editorial.md
export const editorial: ThemeDefinition = {
  id: "editorial",
  name: "Editorial",
  colorScheme: "light",
  features: [() => import("./reading")],
  tokens: {
    bg: "#FBF8F2",
    bgAlt: "#F4EFE6",
    surface: "#FFFFFF",
    surface2: "#EFE9DD",
    border: "#DDD5C7",
    borderStrong: "#7A6F5E",
    text: "#1D1A16",
    text2: "#2F2A24",
    textSecondary: "#3D372F",
    textMuted: "#5C5449",
    textSubtle: "#665D52",
    accent: "#9E2B25",
    accentContrast: "#FFFFFF",
    warning: "#7A4F00",
    danger: "#A3261F",
    // Defined by the Editorial feature chunk; falls back to the sans until it loads.
    fontHeading: "var(--font-bodoni, var(--font-inter-tight))",
    radius: "2px",
  },
};
