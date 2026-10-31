# ADR 0002: Theme engine

- Status: Accepted
- Date: 2026-10-31
- Jira: LEARNING-147

## Context
The portfolio ships 13 visual themes. Content (case studies, resume facts) must stay identical across
themes; a theme may change tokens, layout, and add its own interactive features. Themes must not
bloat the default page or flash the wrong colors on load.

## Decision
- **Definition.** Each theme is a folder `themes/<id>/` exporting a `ThemeDefinition`
  (`id`, `name`, `colorScheme`, `tokens`, optional `layout` loader, optional `features[]` loaders).
  `themes/registry.ts` lists them; the first is the default (Night terminal).
- **Tokens.** Token objects are rendered once by the root layout as a `<style>` block
  (`[data-theme="<id>"] { --bg: …; }`, default also on `:root`). Tailwind's `@theme inline` maps
  `bg-bg`, `text-text-muted`, … to those variables, so components never know which theme is active.
- **Selection.** An inline `<head>` script sets `<html data-theme>` before first paint:
  `?theme=<id>` (not persisted) > `localStorage.theme` > default. Unknown ids are ignored.
  This is the pattern from the Next.js "Preventing flash before hydration" guide and keeps every page statically prerendered.
- **Runtime.** `ThemeProvider` reads the attribute through `useSyncExternalStore` (server snapshot =
  default, so hydration matches). `ThemeRuntime` renders the active theme's `layout` and `features`
  through `React.lazy`, created once per loader at module scope. A loader runs only when its theme
  becomes active, so inactive themes' code is split into separate chunks and never fetched.
- **Motion.** One global `prefers-reduced-motion` rule clamps animation and transition durations.
- **Switcher.** A native `<select>` with a visible label plus a `role="status"` live region.

## Alternatives considered
- **Theme cookie read on the server:** no flash, but makes every page dynamic. Rejected.
- **Separate CSS file per theme:** needs either a build step or duplicated values. Token objects in TS
  stay the single source and are unit-tested for contrast.
- **`next/dynamic` per feature:** it wraps `React.lazy`; loaders stored as data on the definition fit `lazy` directly.
- **Auto-discovering theme folders:** no stable bundler-agnostic glob import; one registry line is explicit.

## Consequences
- Adding a theme: new folder + one registry line. `content/` and `app/` stay untouched.
- Every theme's tokens are validated by `themes/registry.test.ts` (WCAG 4.5:1 for text, muted, subtle
  on bg and surface; accent-contrast on accent).
- Themes with a custom layout show the standard layout during hydration, then swap; colors never flash.
