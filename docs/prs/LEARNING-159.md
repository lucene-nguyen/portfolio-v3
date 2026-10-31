# feat(theme): Pixel / 8-bit + mana bar and achievements (LEARNING-159)

Jira: LEARNING-159 · Spec: [docs/specs/LEARNING-159-pixel.md](../specs/LEARNING-159-pixel.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/pixel.md` (Pixel Art style + Press Start 2P verified; VT323 body and marquee/blink rejected).
- `themes/pixel/`: PICO-8-style tokens, square corners, pixel shadows, segmented "MANA" meter, Press Start 2P loaded only in the Pixel chunk (headings only; sizes in global CSS to avoid layout shift).
- `lib/achievements.ts`: progress in localStorage, recorded in every theme (case study opened, 429 hit, themes seen from `<html data-theme>`).
- Pixel feature: "Achievements n/3" dialog with Locked/Unlocked text, unlock toast (persistent `role="status"`, clears after 4 s), sound toggle (off by default, persisted).
- New optional token `meterFill` (≥ 3:1 on bg, tested); lab meter uses `bg-meter` (defaults to accent).

## Data changes
None (browser localStorage only).

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 font on headings only | `e2e/pixel.spec.ts` | pass |
| AC3 achievements list, stored locally | e2e + `lib/achievements.test.ts` | pass |
| AC4 429 / Bookworm / Explorer | e2e | pass |
| AC5 sound off by default, toggle persists | e2e | pass |
| AC6 segmented mana bar, low → danger | e2e (`::after` dividers, fill color after drain) | pass |
| AC7 contrast, axe, 375px, footer not covered | registry tests, e2e | pass |

## Review
Round 1: 1 Blocker (live region hidden when empty) + 5 Should → all fixed.
Round 2: 1 Blocker (segment dividers painted under the fill) → fixed with an overlay pseudo-element and verified by an e2e assertion; also h3 sizes and nits. A third review round was not run.
