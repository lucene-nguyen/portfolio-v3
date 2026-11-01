# UI/UX round 1 (owner + Architect review of docs/screenshots)

Status: Approved (owner feedback, 2026-11-01). One branch per item, merged into develop. Before = `docs/screenshots` at commit 145c28b; after = current `docs/screenshots/<theme>/` (1440 + 375).

## 1. Hero first (`fix/ui-hero-first`)
- AC: In every theme the first section of `<main>` on `/` is the shared hero; each theme's signature block (system map, dashboard panels, bento board, sticker board, manga strip, 3D world entry) renders directly below it.

## 2. Distinct themes (`fix/ui-<theme>`; first blueprint, pixel, cyberpunk, editorial)
- AC: Case study cards, stats, experience and contact are restyled in the theme's language per `design-system/portfolio-v3/pages/<theme>.md` (not only recolored). Content and DOM order stay shared; contrast/axe/375px tests stay green.

## 3. Hide unfinished content (`fix/ui-placeholders`)
- AC: No text containing `[PLACEHOLDER` renders on any page in any theme (element, metric or link hidden; MDX notes stripped; sections left empty are hidden).
- AC: `SHOW_PLACEHOLDERS=1 npm run dev` shows them again (dev only; never in production builds).
- LinkedIn URL provided by the owner: https://www.linkedin.com/in/cuong-m-nguyen/

## 4. Swiss grid toggle (`fix/ui-swiss-grid`)
- AC: The 12-column overlay is hidden by default; a labelled "Show grid" toggle (`aria-pressed`) shows it; choice remembered locally.

## 5. Mobile nav and floating buttons (`fix/ui-mobile-nav`)
- AC: At 375px the header is one line: logo, theme switcher, menu button; the menu opens the nav links (and resume link) and is keyboard/screen-reader operable.
- AC: Floating buttons (Terminal, Achievements, Enter 3D world) never cover content on mobile: they move into the mobile menu.
