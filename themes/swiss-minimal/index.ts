import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/swiss-minimal.md
export const swissMinimal: ThemeDefinition = {
  id: "swiss-minimal",
  name: "Swiss minimal",
  colorScheme: "light",
  features: [() => import("./grid")],
  tokens: {
    bg: "#FFFFFF",
    bgAlt: "#F5F5F5",
    surface: "#FFFFFF",
    surface2: "#F0F0F0",
    border: "#DDDDDD",
    borderStrong: "#6E6E6E",
    text: "#111111",
    text2: "#222222",
    textSecondary: "#333333",
    textMuted: "#555555",
    textSubtle: "#5E5E5E",
    accent: "#D0021B",
    accentContrast: "#FFFFFF",
    warning: "#8A5300",
    danger: "#B00012",
    radius: "0px",
  },
};
