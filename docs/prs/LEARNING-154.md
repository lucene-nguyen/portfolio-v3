# feat(theme): Neo-brutalism + sticker board (LEARNING-154)

Jira: LEARNING-154 · Spec: [docs/specs/LEARNING-154-neo-brutalism.md](../specs/LEARNING-154-neo-brutalism.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/neo-brutalism.md` (Brutalism verified; loud primaries used as fills with black text, deep-blue text accent).
- `themes/neo-brutalism/`: cream/black tokens, 3px borders + hard offset shadows, no easing.
- Sticker board (portal into `#theme-slot-home`): one sticker per case-study skill on saturated fills (black text ≥ 4.5:1, unit-tested); drag repositions within the board; click/Enter filters projects; the same filter as a plain list of `aria-pressed` buttons with "Show all"; result count announced.

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 sticker filter; drag doesn't filter | `e2e/neo-brutalism.spec.ts` | pass |
| AC3 plain list of filter buttons | e2e | pass |
| AC4 contrast (grounds + sticker fills), axe (with a filter active), 375px incl. after drag | registry + `stickers.test.ts`, e2e | pass |

## Review
APPROVE, no Blockers. Fixed: click-suppress flag reset on pointerdown + pointercancel, stickers clamped to the board (no overflow), pressed offset in the inline transform, token colours instead of raw black, heading-labelled filter list, axe with a filter active.

## Note 2026-11-01
The merge ran after a full e2e run that had 3 transient failures (dev-server load timeouts in case-studies/blueprint specs, unrelated to this change); the merge gate missed them. Re-verified on develop: those specs pass, and two full runs were 96/96. Follow-up `chore/e2e-stability` caps local Playwright workers; merges are now gated on the e2e exit code.
