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
- 12 columns inside the 1200px container (24px side padding, 24px gutters), drawn as a faint red overlay from 1024px up; content edges align to it.
- Cards and the lab band paint over the overlay, so the grid shows in the gaps (intended).
- Square corners, no shadows, tight negative tracking on headings.

## Print (one-page CV)
- `@media print`: no nav, skip link, lab, kits, avatar, buttons, selects or dialogs; elements marked `data-print="hide"` are dropped (CTAs, card summaries, tags, card links, contact headline).
- Black on white, 9–9.5pt body; case studies in 3 columns; experience and stack side by side; contact links print their URL; placeholders are not printed. Fits one A4 or Letter page (12mm margins).
