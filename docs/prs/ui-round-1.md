# UI/UX round 1 — PR notes

Spec: [docs/specs/ui-round-1.md](../specs/ui-round-1.md). Before = `docs/screenshots` at 145c28b.

## fix/ui-placeholders (item 3)
- `lib/placeholder.ts`: `shown()` / `stripPlaceholders()`; `SHOW_PLACEHOLDERS=1 npm run dev` shows them (ignored when `NODE_ENV=production`), passed to client code via `next.config` `env`.
- Content: unfinished metrics filtered at the source; resume link, kit stacks/links, anime art note hidden; owner LinkedIn URL added (https://www.linkedin.com/in/cuong-m-nguyen/).
- MDX: list items with a placeholder dropped, trailing notes stripped, emptied sections' headings hidden (CSS), diagram tech labels hidden; search index cleaned.
- Verified: dev with flag → 22 placeholder strings on a case study; without → 0. New e2e: no "PLACEHOLDER" text on 4 pages × 13 themes + search index.
- Before/after: placeholder text (resume.pdf [PLACEHOLDER], LinkedIn [PLACEHOLDER], [STACK], [X] metrics, case-study notes, "Learnings") → gone in every theme.
- Review: APPROVE; fixed metric guards (bento/blueprint), heading+emptied-list rule, search list lines, screenshots refreshed.
