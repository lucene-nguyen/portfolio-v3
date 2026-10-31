import type { ComponentType, ReactNode } from "react";

/** Values become CSS custom properties: `textMuted` -> `--text-muted`. */
export interface ThemeTokens {
  bg: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  accent: string;
  /** Text color on accent-filled surfaces. */
  accentContrast: string;
  /** Optional font stacks; default to the root fonts. */
  fontSans?: string;
  fontMono?: string;
  fontHeading?: string;
  radius?: string;
}

type Loader<P = object> = () => Promise<{ default: ComponentType<P> }>;

export interface ThemeDefinition {
  id: string;
  name: string;
  colorScheme: "dark" | "light";
  tokens: ThemeTokens;
  /** Wraps page content; loaded only while this theme is active. */
  layout?: Loader<{ children: ReactNode }>;
  /** Extra UI modules; loaded only while this theme is active. */
  features?: Loader[];
}
