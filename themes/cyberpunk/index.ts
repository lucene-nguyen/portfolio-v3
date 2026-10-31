import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/cyberpunk.md
export const cyberpunk: ThemeDefinition = {
  id: "cyberpunk",
  name: "Cyberpunk",
  colorScheme: "dark",
  features: [() => import("./hud")],
  tokens: {
    bg: "#0A0A12",
    bgAlt: "#0E0E18",
    surface: "#13131F",
    surface2: "#1B1B2B",
    border: "#2A2A40",
    borderStrong: "#8A8AB8",
    text: "#F2F2FF",
    text2: "#E0E0F5",
    textSecondary: "#C6C6E0",
    textMuted: "#A9A9CC",
    textSubtle: "#9A9AC0",
    accent: "#FF5CDB",
    accentContrast: "#0A0A12",
    warning: "#FFE14D",
    danger: "#FF7070",
    meterFill: "#2DE2E6",
    fontHeading: "var(--font-jetbrains-mono)",
    radius: "0px",
  },
};
