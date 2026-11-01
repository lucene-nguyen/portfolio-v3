import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/dashboard.md
export const dashboard: ThemeDefinition = {
  id: "dashboard",
  name: "Dashboard",
  colorScheme: "dark",
  layout: () => import("./layout"),
  tokens: {
    bg: "#111217",
    bgAlt: "#15161C",
    surface: "#181B1F",
    surface2: "#22252B",
    border: "#2C3038",
    borderStrong: "#8E95A2",
    text: "#E7E9EE",
    text2: "#D5D9E0",
    textSecondary: "#C7CBD3",
    textMuted: "#A7AEBA",
    textSubtle: "#9AA1AE",
    accent: "#6EA6FF",
    accentContrast: "#111217",
    warning: "#F5B73B",
    danger: "#FF7383",
    meterFill: "#73BF69",
    radius: "4px",
  },
};
