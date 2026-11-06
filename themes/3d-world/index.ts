import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/3d-world.md
export const world3d: ThemeDefinition = {
  id: "3d-world",
  name: "3D world",
  colorScheme: "dark",
  layout: () => import("./layout"),
  tokens: {
    bg: "#0F1626",
    bgAlt: "#121A2C",
    surface: "#172036",
    surface2: "#1E2942",
    border: "#2A3754",
    borderStrong: "#8C9BBA",
    text: "#EEF2FA",
    text2: "#DCE3F0",
    textSecondary: "#C5CEDF",
    textMuted: "#A9B5CC",
    textSubtle: "#9CA9C2",
    accent: "#FFB547",
    accentContrast: "#0F1626",
    warning: "#FFD27A",
    danger: "#FF8A8A",
    radius: "10px",
  },
};
