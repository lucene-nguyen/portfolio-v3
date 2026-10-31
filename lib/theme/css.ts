import type { ThemeDefinition } from "@/themes/types";

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** One CSS rule per theme; the default theme also applies to `:root`. */
export function themesToCss(themes: readonly ThemeDefinition[], defaultId: string): string {
  return themes
    .map((t) => {
      const selector = `[data-theme="${t.id}"]`;
      const vars = Object.entries(t.tokens)
        .map(([k, v]) => `--${kebab(k)}:${v};`)
        .join("");
      return `${t.id === defaultId ? `:root,${selector}` : selector}{color-scheme:${t.colorScheme};${vars}}`;
    })
    .join("\n");
}

export const STORAGE_KEY = "theme";

/** Inline <head> script: `?theme=` > localStorage > default. Runs before first paint. */
export function themeScript(ids: readonly string[], defaultId: string): string {
  return `(function(){var ids=${JSON.stringify(ids)},t=${JSON.stringify(defaultId)},s=null;try{s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)})}catch(e){}if(ids.indexOf(s)>-1)t=s;var p=new URLSearchParams(location.search).get("theme");if(ids.indexOf(p)>-1)t=p;document.documentElement.setAttribute("data-theme",t)})()`;
}
