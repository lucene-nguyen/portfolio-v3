# feat(theme): Notion-like docs + full-text search (LEARNING-156)

Jira: LEARNING-156 · Spec: [docs/specs/LEARNING-156-docs.md](../specs/LEARNING-156-docs.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/docs.md` (Documentation pattern + Minimalism; search-as-you-type and no-results suggestions verified from the UX data).
- `app/search-index.json/route.ts` (`force-static`): index generated at build time from `content/` (home + one entry per case-study section); no external service.
- `lib/search.ts`: all-terms, title-weighted, accent-insensitive search with snippets; MDX → section docs. `lib/slug.ts` shared with MDX heading ids.
- `themes/docs/`: light tokens, sidebar (sticky ≥ 1024px, `aria-current`), breadcrumbs, mobile drawer, search dialog (combobox/listbox, `/` and Ctrl/⌘K, arrows/Enter/Esc, loading and failure states with retry).
- Fix that also applies to Night terminal: dialogs opened by a shortcut from the page body now drop focus on close (`lib/dom.ts` `restoreFocus`), so `/` works again after Esc.

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 shortcuts, typing, arrows, Enter, Esc, visible active result | `e2e/docs.spec.ts` | pass |
| AC3 static build-time index | build output `○ /search-index.json`, e2e fetch, `lib/search.test.ts` | pass |
| AC4 drawer < 1024px, 375px | e2e | pass |
| AC5 contrast, axe (search open, mobile) | registry tests, e2e | pass |

## Review
Round 1: 1 Blocker (active search result not visible, ~1.1:1) → fixed with an accent outline + inset bar and asserted. Should items fixed: loading state, retry after failure, shared slugify, single-Esc close. Nits: shared `isTyping`, stable key listener, cleaner snippets, Ctrl/⌘ hint. While testing the retry, found and fixed a focus bug in both shortcut dialogs. No second review round.
