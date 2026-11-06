# feat(theme): Swiss minimal + printable one-page CV (LEARNING-150)

Jira: LEARNING-150 · Spec: [docs/specs/LEARNING-150-swiss.md](../specs/LEARNING-150-swiss.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/swiss-minimal.md` (Minimalism & Swiss Style verified; one red accent per the brief).
- `themes/swiss-minimal/`: black/white/red tokens, flat styling, a decorative 12-column grid overlay aligned with the 1200px container (≥ 1024px).
- Print CV (home page only, named `@page cv`, 12mm): no nav/interactive/decorative parts, `data-print="hide"` markers on CTAs, card summaries, tags, card links, contact headline and placeholders; links print their URL. One page on A4 and Letter.
- Note: the print stylesheet ships in the Swiss chunk, so printing needs the theme loaded (JS on).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 12-col grid aligned at 1440px | `e2e/swiss.spec.ts` | pass |
| AC3 one page A4 + Letter, no nav/controls, CV content incl. GitHub URL | `e2e/swiss.spec.ts` (`page.pdf` page count + print emulation) | pass |
| AC4 contrast, axe, 375px | registry tests, e2e | pass |

## Review
Round 1: 1 Blocker (GitHub address missing from the printed CV) → fixed (`attr(href)` after links) and asserted. Should items fixed: print rules scoped to the home page, LinkedIn placeholder not printed, named page margins. Nits: dead selector removed, tokens instead of hex, grid/print notes. No second review round.
