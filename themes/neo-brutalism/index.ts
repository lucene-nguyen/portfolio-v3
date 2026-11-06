import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/neo-brutalism.md
export const neoBrutalism: ThemeDefinition = {
  id: "neo-brutalism",
  name: "Neo-brutalism",
  colorScheme: "light",
  layout: () => import("./layout"),
  tokens: {
    bg: "#FFF4E0",
    bgAlt: "#FFE9C7",
    surface: "#FFFFFF",
    surface2: "#FFE3F6",
    border: "#000000",
    borderStrong: "#000000",
    text: "#000000",
    text2: "#111111",
    textSecondary: "#1F1F1F",
    textMuted: "#3A3A3A",
    textSubtle: "#424242",
    accent: "#1D3FD6",
    accentContrast: "#FFFFFF",
    warning: "#7A4A00",
    danger: "#B3001B",
    radius: "0px",
  },
};
