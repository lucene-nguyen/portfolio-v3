# feat(theme): Bento grid + rearrangeable tiles (LEARNING-153)

Jira: LEARNING-153 · Spec: [docs/specs/LEARNING-153-bento.md](../specs/LEARNING-153-bento.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/bento.md` (Bento Box Grid verified; "dragging must not be the only way" from the UX data; hover scale rejected).
- `lib/bento.ts`: sanitize / move / move-to for tile order (unit-tested).
- `themes/bento/`: light tokens, tile grid portalled into `#theme-slot-home`: About (2×2), Photo, Key numbers (accent tile), one tile per case study, Stack, Live lab, Contact.
- Rearrange by drag and drop (drop-target ring) or move earlier/later buttons (focus kept, position announced); order in localStorage; "Reset layout".
- Known: the grid is inserted after the theme chunk loads, so the hero shifts once (same accepted pattern as Blueprint/Dashboard).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 drag, keyboard, focus, announce, persist, reset | `e2e/bento.spec.ts`, `lib/bento.test.ts` | pass |
| AC3 single column at 375px | e2e | pass |
| AC4 contrast on every tile colour, axe | registry tests, e2e | pass |

## Review
Round 1: 1 Blocker (focus target never cleared, so later reorders/Reset jumped focus into the grid) → one-shot ref + e2e step. Also: repeated announcements, no `aria-label` on tiles, stronger move-button edges, drop-target ring. Layout shift accepted and documented. No second review round.
