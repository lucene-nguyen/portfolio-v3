import { blueprint } from "./blueprint";
import { nightTerminal } from "./night-terminal";
import { pixel } from "./pixel";
import type { ThemeDefinition } from "./types";

/** Adding a theme: create `themes/<id>/index.ts` and list it here. The first entry is the default. */
export const themes: readonly ThemeDefinition[] = [nightTerminal, blueprint, pixel];

export const defaultTheme = themes[0];

export function getTheme(id: string | null | undefined): ThemeDefinition | undefined {
  return themes.find((t) => t.id === id);
}
