import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/anime.md
export const anime: ThemeDefinition = {
  id: "anime",
  name: "Anime",
  colorScheme: "light",
  layout: () => import("./layout"),
  tokens: {
    bg: "#FFFBF2",
    bgAlt: "#FFF1E0",
    surface: "#FFFFFF",
    surface2: "#FFE8F0",
    border: "#1A1A1A",
    borderStrong: "#1A1A1A",
    text: "#111111",
    text2: "#1D1D1D",
    textSecondary: "#2A2A2A",
    textMuted: "#4A4A4A",
    textSubtle: "#525252",
    accent: "#C2185B",
    accentContrast: "#FFFFFF",
    warning: "#7F4A00",
    danger: "#B3132B",
    radius: "4px",
  },
};
