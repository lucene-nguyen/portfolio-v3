# Theme 12: Pixel / 8-bit + mana bar and achievements (LEARNING-159)

Status: Approved (self-approved, autonomous mode)

## Goal
A retro game theme where the rate limiter reads as a mana bar and exploring the site unlocks achievements.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/pixel.md`.
- `themes/pixel/`: PICO-8-style tokens, `pixel.css` (square corners, pixel shadows, pixelated images, segmented "MANA" meter), Press Start 2P loaded only in the Pixel chunk and used for headings.
- `lib/achievements.ts`: progress in localStorage (case study read, 429 hit, themes seen), recorded in every theme.
- Pixel feature: "Achievements n/3" button → dialog listing each achievement as Locked/Unlocked (+ progress), unlock toast (`role="status"`), sound effects toggle (off by default, persisted).

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/pixel.md` exists with the exact tokens.
- AC2: Headings use Press Start 2P; body text stays Inter Tight.
- AC3: Achievements persist in localStorage; the dialog lists all three with a text status (not color alone).
- AC4: Triggering a 429 in the lab unlocks "Slow down!" and announces it; reading a case study (in any theme) unlocks "Bookworm"; "Explorer" shows themes seen / total.
- AC5: Sound effects are off by default; a visible labelled checkbox turns them on and the choice persists.
- AC6: The lab meter shows as a segmented mana bar; low capacity still switches to the danger color.
- AC7: Contrast ≥ 4.5:1 (registry tests), axe clean, no horizontal scroll at 375px.

## Technical notes
- Theme-seen tracking reads `<html data-theme>`, because during hydration the context still holds the server default.
