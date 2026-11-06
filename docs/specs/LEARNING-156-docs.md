# Theme 09: Notion-like docs + full-text search (LEARNING-156)

Status: Approved (self-approved, autonomous mode)

## Goal
A docs-style theme with sidebar navigation, breadcrumbs and instant full-text search.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/docs.md`.
- `app/search-index.json/route.ts` (`force-static`): index built at build time from `content/`.
- `lib/search.ts`: pure search (all terms, title-weighted, accent-insensitive, snippets) + MDX → section docs.
- `themes/docs/`: layout (sidebar, breadcrumbs, mobile drawer) and search dialog.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/docs.md` exists with the exact tokens.
- AC2: Search opens with `/` and Ctrl/Cmd+K; typing shows results; arrow keys move, Enter opens, Esc closes and returns focus.
- AC3: The index is a static file generated at build time (`○ /search-index.json` in the build output); no external service.
- AC4: Below 1024px the sidebar becomes a drawer; at 375px no horizontal scroll.
- AC5: Contrast ≥ 4.5:1 (registry tests), axe clean (with search open and on mobile).
