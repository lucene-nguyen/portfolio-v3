# Theme 07: Neo-brutalism + sticker board (LEARNING-154)

Status: Approved (self-approved, autonomous mode)

## Goal
A loud, flat theme where skills are stickers you can push around and use to filter projects.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/neo-brutalism.md`.
- `themes/neo-brutalism/`: tokens, thick borders/hard shadows CSS, sticker board portalled into `#theme-slot-home`.
- `stickers.ts`: skills from case-study tags, saturated fills (contrast-tested), project filter.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/neo-brutalism.md` exists with the exact tokens.
- AC2: Clicking (or Enter on) a sticker filters projects by that skill and announces the count; dragging moves a sticker without filtering.
- AC3: The same filter is available as a plain list of filter buttons (`aria-pressed`, "Show all").
- AC4: Text reaches 4.5:1 on every ground and on every sticker fill; axe clean; no horizontal scroll at 375px.
