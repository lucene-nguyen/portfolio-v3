# feat(theme): Editorial + long-form reading mode (LEARNING-149)

Jira: LEARNING-149 · Spec: [docs/specs/LEARNING-149-editorial.md](../specs/LEARNING-149-editorial.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/editorial.md` (Editorial/Magazine + Libre Bodoni verified; multi-column, parallax, page-flip and Public Sans body rejected).
- `themes/editorial/`: first light theme (paper/oxblood tokens), Libre Bodoni headings loaded only in the Editorial chunk.
- Reading mode on `/work/*`: "N min read" (body words / 230), text size S/M/L (radio group with arrow keys, persisted, applied before first paint by the head script), "On this page" contents (h2 ids from `mdx-components.tsx`), progress bar inside `<main>`.
- Measure (66ch, 19px × scale, line-height 1.7) and drop cap in global CSS, scoped to `.prose-body` (the MDX body).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules + exact tokens | `e2e/editorial.spec.ts` | pass |
| AC2 60–75ch, line-height ≥ 1.6 | `e2e/editorial.spec.ts` | pass |
| AC3 text size: keyboard radio, persists, no jump | `e2e/editorial.spec.ts`, `lib/theme/css.test.ts` | pass |
| AC4 read time, contents, progress | `e2e/editorial.spec.ts` | pass |
| AC5 contrast, axe, 375px | registry tests, e2e | pass |

Lint, typecheck, 129 unit tests, 59 e2e tests pass. (One earlier e2e run hit a transient dev-server "Unexpected end of JSON input" during cold compile; the rerun was clean.)

## Review
APPROVE, no Blockers. Fixed: reading styles scoped to the body, radio-group arrow keys + roving tabindex, stored size before paint, plain-text-only heading ids, read time from the body only, label-in-name for size buttons.
