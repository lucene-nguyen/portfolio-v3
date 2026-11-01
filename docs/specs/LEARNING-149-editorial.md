# Theme 02: Editorial + long-form reading mode (LEARNING-149)

Status: Approved (self-approved, autonomous mode)

## Goal
A light, magazine-style theme that makes case studies comfortable to read.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/editorial.md`.
- `themes/editorial/`: light paper tokens, Libre Bodoni headings (loaded in the Editorial chunk), drop cap, reading measure.
- Reading mode on `/work/*` (portal into `#theme-slot-article`): read time, text size S/M/L persisted in localStorage, table of contents from `h2` ids (added to `mdx-components.tsx`), progress bar.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/editorial.md` exists with the exact tokens.
- AC2: Case study body paragraphs are 60–75 characters wide (measured in `ch`) with line-height ≥ 1.6.
- AC3: The text size control is a keyboard-operable radio group; the choice changes body size and persists across reloads.
- AC4: Reading mode shows "N min read", a table of contents linking to every section, and a progress bar that reaches 100 at the bottom.
- AC5: Contrast ≥ 4.5:1 (registry tests), axe clean on home and a case study, 375px no horizontal scroll.
