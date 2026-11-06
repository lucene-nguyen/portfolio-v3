import type { ThemeDefinition } from "../types";

// Design rules: design-system/portfolio-v3/pages/bento.md
export const bento: ThemeDefinition = {
  id: "bento",
  name: "Bento",
  colorScheme: "light",
  layout: () => import("./layout"),
  tokens: {
    bg: "#F4F4F2",
    bgAlt: "#ECEBE7",
    surface: "#FFFFFF",
    surface2: "#E8ECF5",
    border: "#DADAD6",
    borderStrong: "#71717A",
    text: "#18181B",
    text2: "#27272A",
    textSecondary: "#3F3F46",
    textMuted: "#52525B",
    textSubtle: "#5A5A62",
    accent: "#4338CA",
    accentContrast: "#FFFFFF",
    warning: "#854D0E",
    danger: "#B91C1C",
    radius: "24px",
  },
};
