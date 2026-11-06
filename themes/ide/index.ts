import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/ide.md
export const ide: ThemeDefinition = {
  id: "ide",
  name: "IDE",
  colorScheme: "dark",
  layout: () => import("./layout"),
  tokens: {
    bg: "#1E1E1E",
    bgAlt: "#1B1B1B",
    surface: "#252526",
    surface2: "#2D2D30",
    border: "#3C3C3C",
    borderStrong: "#8A8A8A",
    text: "#E4E4E4",
    text2: "#D4D4D4",
    textSecondary: "#CCCCCC",
    textMuted: "#ABABAB",
    textSubtle: "#A0A0A0",
    accent: "#4FC1FF",
    accentContrast: "#1E1E1E",
    warning: "#E2C08D",
    danger: "#F48771",
    meterFill: "#89D185",
    radius: "2px",
  },
};
