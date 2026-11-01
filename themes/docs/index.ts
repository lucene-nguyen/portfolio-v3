import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/docs.md
export const docs: ThemeDefinition = {
  id: "docs",
  name: "Docs",
  colorScheme: "light",
  layout: () => import("./layout"),
  tokens: {
    bg: "#FFFFFF",
    bgAlt: "#F7F6F3",
    surface: "#FFFFFF",
    surface2: "#F1F1EF",
    border: "#E9E9E7",
    borderStrong: "#787774",
    text: "#37352F",
    text2: "#37352F",
    textSecondary: "#45433D",
    textMuted: "#5F5E5A",
    textSubtle: "#66655F",
    accent: "#0B66C2",
    accentContrast: "#FFFFFF",
    warning: "#8A5A00",
    danger: "#B42318",
    radius: "6px",
  },
};
