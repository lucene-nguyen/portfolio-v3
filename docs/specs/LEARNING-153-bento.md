# Theme 06: Bento grid + rearrangeable tiles (LEARNING-153)

Status: Approved (self-approved, autonomous mode)

## Goal
The home page opens with a bento grid of mixed-size tiles that visitors can rearrange.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/bento.md`.
- `lib/bento.ts`: order sanitize / move / move-to (unit-tested).
- `themes/bento/`: light tokens, layout portalling the tile grid into `#theme-slot-home`.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/bento.md` exists with the exact tokens.
- AC2: Tiles can be rearranged by drag and drop and by keyboard (move earlier/later buttons, focus kept, position announced); the order persists across reloads; "Reset layout" restores it.
- AC3: At 375px the grid is a single column with no horizontal scroll.
- AC4: Contrast ≥ 4.5:1 on every tile colour (registry tests), axe clean.
