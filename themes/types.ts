import type { ComponentType, ReactNode } from "react";

/** Values become CSS custom properties: `textMuted` -> `--text-muted`. */
export interface ThemeTokens {
  bg: string;
  /** Alternate section band. */
  bgAlt: string;
  surface: string;
  /** Chips on surface; selected segmented control. */
  surface2: string;
  /** Decorative dividers only; control outlines need a token with at least 3:1 contrast (e.g. textSubtle). */
  border: string;
  /** Outlined buttons/tags; decorative, controls must carry a text label. */
  borderStrong: string;
  text: string;
  /** Tag labels, group names. */
  text2: string;
  /** Body copy in cards, lead paragraphs. */
  textSecondary: string;
  textMuted: string;
  textSubtle: string;
  accent: string;
  /** Text color on accent-filled surfaces. */
  accentContrast: string;
  /** "planned" status. Always paired with a word. */
  warning: string;
  /** HTTP 429, low meter. Always paired with the code text. */
  danger: string;
  /** Fill of capacity meters (non-text, ≥ 3:1 on bg); defaults to accent. */
  meterFill?: string;
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
