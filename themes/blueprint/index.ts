import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/blueprint.md
export const blueprint: ThemeDefinition = {
  id: "blueprint",
  name: "Blueprint",
  colorScheme: "dark",
  layout: () => import("./layout"),
  tokens: {
    bg: "#0A2540",
    bgAlt: "#0C2B4A",
    surface: "#0F3157",
    surface2: "#143A66",
    border: "#2A5A8C",
    borderStrong: "#6E9BCB",
    text: "#F4F8FF",
    text2: "#D6E4F5",
    textSecondary: "#BDD2EA",
    textMuted: "#A3BEDD",
    textSubtle: "#94B3D8",
    accent: "#FFD166",
    accentContrast: "#0A2540",
    warning: "#FFB86B",
    danger: "#FFA3A3",
    fontHeading: "var(--font-jetbrains-mono)",
    radius: "2px",
  },
};
