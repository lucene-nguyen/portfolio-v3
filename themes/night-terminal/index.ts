import type { ThemeDefinition } from "../types";

// "Portfolio v3" design system tokens. Design rules: design-system/portfolio-v3/pages/night-terminal.md
export const nightTerminal: ThemeDefinition = {
  id: "night-terminal",
  name: "Night terminal",
  colorScheme: "dark",
  features: [() => import("./command-bar")],
  tokens: {
    bg: "#0B0F14",
    bgAlt: "#0E131A",
    surface: "#121821",
    surface2: "#1A2330",
    border: "#1F2A37",
    borderStrong: "#2B3A4C",
    text: "#E6EDF3",
    text2: "#C9D3DF",
    textSecondary: "#A9B4C2",
    textMuted: "#8B98A9",
    textSubtle: "#7A8798",
    accent: "#7EE787",
    accentContrast: "#0B0F14",
    warning: "#F2C66D",
    danger: "#FF9B7A",
  },
};
