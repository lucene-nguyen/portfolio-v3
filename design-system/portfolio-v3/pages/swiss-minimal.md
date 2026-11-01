# Swiss Minimal Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"swiss minimal grid" --design-system --persist --page swiss-minimal`; `"swiss international typographic grid" --domain style`), then reconciled.
> **Theme id:** `swiss-minimal` (light) · **Tokens:** `themes/swiss-minimal/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Style **Minimalism & Swiss Style**: white space, grid-based structure, sans-serif, high contrast, max-width 1200px, no shadows or gradients, subtle 200–250ms hovers.

## Adjusted
- Monochrome palette + exactly one red accent (per the brief).

## Color (exact, light)
| Token | Hex | Use |
|---|---|---|
| bg | #FFFFFF | page |
| bgAlt | #F5F5F5 | alternate band |
| surface | #FFFFFF | cards |
| surface2 | #F0F0F0 | chips |
| border | #DDDDDD | rules (decorative) |
| borderStrong | #6E6E6E | outlined controls (5.1:1) |
| text | #111111 | headings |
| text2 | #222222 | tags |
| textSecondary | #333333 | body |
| textMuted | #555555 | meta |
| textSubtle | #5E5E5E | fine print |
| accent | #D0021B | the one red: CTA, eyebrows, key numbers, focus ring |
| accentContrast | #FFFFFF | text on accent |
| warning | #8A5300 | planned |
| danger | #B00012 | 429 |

## Grid
- 12 columns inside the 1200px container (24px side padding, 24px gutters), drawn as a faint red overlay from 1024px up, hidden by default and shown with the nav "Show grid" toggle (`aria-pressed`, remembered in localStorage); content edges align to it.
- Cards and the lab band paint over the overlay, so the grid shows in the gaps (intended).
- Square corners, no shadows, tight negative tracking on headings.

## Print (one-page CV)
- `@media print`: no nav, skip link, lab, kits, Work with me, avatar, buttons, selects or dialogs; elements marked `data-print="hide"` are dropped (CTAs, card summaries, tags, card links, contact headline).
- Black on white, 9–9.5pt body; case studies in 3 columns; experience and stack side by side; contact links print their URL; placeholders are not printed. Fits one A4 or Letter page (12mm margins).

## Layout
Shared sections (UI round 1). Searches:
- `"minimal portfolio typography" --domain landing` verified Minimal Single Column and Portfolio Grid: neutral ground, minimal accent, the work first. The section order is unchanged.
- `"swiss grid typography" --domain style` verified **Minimalism & Swiss Style**: grid-based, high contrast, sans-serif, clear type hierarchy and no shadows. Its "subtle hover 200–250ms" is not applied, because nothing new animates.
- ux `"grid alignment whitespace"`: Font Size Scale and Hover States are kept (the shared components already handle hover). Breadcrumbs were ignored as off-topic.

Rules:
- No boxes on the shared sections. Case studies, kits and the stack sit under a heavy 4px black top rule with no border or background, aligned flush left to the 12-column grid.
- Eyebrows are uppercase sans at 13px/700 with 0.08em tracking, set in text colour under a 4px red accent bar.
- Case-study meta lines are uppercase tracked sans at 12px.
- Numbers (case metrics and hero stats) are 36px sans with −0.03em tracking. The hero stats are one row of numerals under a single heavy rule, with no box or dividers.
- Experience: rows with black hairlines, and the period in tabular sans. The stack heading is uppercase tracked.
- Print (one-page CV) keeps its own `!important` rules, so these screen rules never change the CV.

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.

### Work with me section (round 2, LEARNING-166)
- Searches: `"services offering process steps" --domain landing` and `"call to action specific label" --domain ux` (results in docs/prs/LEARNING-166.md).
- Service cards are `data-part="kit"` and the "How I work" steps are `data-part="roles"`/`"role"`, so this theme's kit-card and roles/timeline rules above style them. Each CTA is a text link with a verb label and an arrow icon (`aria-hidden`), min 44px tall.
