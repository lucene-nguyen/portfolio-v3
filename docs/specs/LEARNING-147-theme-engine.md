# Theme engine (LEARNING-147)

Status: Approved (self-approved, autonomous mode)

## Goal
Switchable themes that change look (tokens), optionally layout, and add their own feature modules,
while content stays shared and unchanged. Foundation for all 13 themes.

## Scope
- `ThemeDefinition` (`themes/types.ts`): `id`, `name`, `colorScheme`, `tokens`, optional `layout` loader, optional `features[]` loaders.
- One folder per theme under `themes/<id>/` exporting its definition; `themes/registry.ts` lists them.
- Tokens rendered once as CSS (`[data-theme="<id>"] { --bg: ... }`) in `<head>`; Tailwind colors read the variables.
- Inline `<head>` script sets `data-theme` on `<html>` before first paint: `?theme=<id>` > localStorage > default.
- Client `ThemeProvider` (active theme, `setTheme`), `ThemeRuntime` (lazy layout + features via `React.lazy`), `ThemeSwitcher` (native select + live region).
- Global `prefers-reduced-motion` rule that disables animations and transitions.
- ADR `docs/adr/0002-theme-engine.md`.

## Out of scope
Theme-specific designs and features (one task per theme). Night terminal ships with the "Portfolio v3" tokens only; its command bar is LEARNING-148.

## Acceptance criteria
- AC1: Given any theme, when the visitor switches themes, then the rendered content (text of `<main>`) is identical before and after.
- AC2: Given no stored choice and no `?theme`, when the page loads, then `<html data-theme="night-terminal">`.
- AC3: Given the switcher, when operated with keyboard only, then the theme changes and a live region announces "Theme: <name>".
- AC4: Given a theme with features, when another theme is active, then its feature loaders are never called (code stays out of the initial bundle).
- AC5: Given `prefers-reduced-motion: reduce`, then computed animation and transition durations are ≈0 for every element.
- AC6: Given a new folder under `themes/` registered in `themes/registry.ts`, then no file under `content/` or `app/` needs changes; registry tests validate required tokens and contrast (text, muted, subtle on bg/surface, accent-contrast on accent ≥ 4.5:1).
- AC7: Given `?theme=<valid id>`, then that theme is applied without being persisted; an invalid id falls back to stored/default. Given a stored theme, it is applied before first paint (no flash).
- AC8: ADR `docs/adr/0002-theme-engine.md` exists.

## Technical notes
- Server renders the default theme; the client reads `data-theme` via `useSyncExternalStore` (server snapshot = default) to avoid hydration mismatches.
- `React.lazy` (what `next/dynamic` wraps) is used because loaders are data on the definition; lazy components are memoized per loader.

## Risks
- Themes with a custom layout render the standard layout during hydration, then swap (tokens never flash).
