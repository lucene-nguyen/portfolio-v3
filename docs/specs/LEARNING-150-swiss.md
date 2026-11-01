# Theme 03: Swiss minimal + printable one-page CV (LEARNING-150)

Status: Approved (self-approved, autonomous mode)

## Goal
A strict-grid black/white/red theme whose home page prints as a clean one-page CV.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/swiss-minimal.md`.
- `themes/swiss-minimal/`: tokens, flat styling, a decorative 12-column grid overlay (feature), and the print stylesheet.
- `data-print="hide"` markers on home elements that do not belong on a CV.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/swiss-minimal.md` exists with the exact tokens.
- AC2: At 1440px a 12-column grid is visible and content edges align with its first and last columns (±1px).
- AC3: Printing the home page (A4 and Letter) produces exactly one page, with no nav or interactive elements, keeping name, headline, stats, case study titles/metrics, experience, stack and contact addresses.
- AC4: Contrast ≥ 4.5:1 (registry tests), axe clean, no horizontal scroll at 375px.
