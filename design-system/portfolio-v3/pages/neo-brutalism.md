# Neo-brutalism Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"neo brutalism playful bold" --design-system --persist --page neo-brutalism`; `"neo brutalism bold flat" --domain style`), then reconciled.
> **Theme id:** `neo-brutalism` (light) · **Tokens:** `themes/neo-brutalism/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Style **Brutalism**: flat primaries + black, 0px corners, 700+ weight, visible 2–4px borders, no easing (instant).

## Adjusted
- Pure #FF0000/#0000FF/#FFFF00 as text would fail contrast: loud colours are sticker *fills* with black text; the text accent is a deep blue.

## Color (exact, light)
| Token | Hex | Use |
|---|---|---|
| bg | #FFF4E0 | cream ground |
| bgAlt | #FFE9C7 | alternate band |
| surface | #FFFFFF | cards |
| surface2 | #FFE3F6 | sticker board |
| border | #000000 | 3px borders |
| borderStrong | #000000 | outlines |
| text | #000000 | headings |
| text2 | #111111 | tags |
| textSecondary | #1F1F1F | body |
| textMuted | #3A3A3A | meta |
| textSubtle | #424242 | fine print |
| accent | #1D3FD6 | links, selected filter fill, focus ring |
| accentContrast | #FFFFFF | text on accent |
| warning | #7A4A00 | planned |
| danger | #B3001B | 429 |

Sticker fills (black text, each ≥ 4.5:1, tested in `themes/neo-brutalism/stickers.test.ts`): #FFD60A, #FF90E8, #7CF29C, #5EC8FF, #FFA94D, #C4B5FD.

## Shape
- 3px black borders and 6px hard offset shadows on cards; stickers 3px border + 4px shadow; pressed sticker drops its shadow and gets an accent outline.

## Sticker board
- One sticker per case-study skill; drag (pointer) only repositions; click/Enter toggles the filter.
- Same filter as a plain list of buttons ("Show all" + one per skill, `aria-pressed`); result count announced.

## Layout
Shared sections (UI round 1). Searches:
- `"neo brutalism bold portfolio" --domain landing` returned 0 results; the retry `"portfolio grid creative"` verified Portfolio Grid (work first, contact last; keep the sections in that order).
- `"neubrutalism" --domain style` verified Neubrutalism: 3px black borders, hard offset shadows, flat high-saturation fills, bold type, no gradients or blur.
- ux `"bold borders visual hierarchy contrast"`: Contrast Readability applied (only black text on sticker fills). Hover States are already handled by the shared components; Breadcrumbs were ignored as off-topic (flat site).

Rules:
- Sticker fills are theme-scoped CSS variables (`--nb-yellow`, `--nb-green`, `--nb-blue`, `--nb-orange`, `--nb-pink`, `--nb-violet`), the same values as `STICKER_FILLS`; black (`--border`/`--text`) is the only colour drawn on them.
- Eyebrows: uppercase yellow label, 2px black border.
- Case studies: a 3px colour header strip per card (yellow, green, blue, repeating), edge to edge; metrics in a bordered bgAlt box.
- Hero numbers: four separate stickers (yellow, green, blue, orange) with the 6px hard shadow instead of a divided strip.
- Experience: each role is a bordered card with a black period label; the stack is a pink (surface2) panel with the hard shadow.
- Contact actions: 3px border + 4px hard shadow.
- Rejected: press-to-sink transforms (no motion in this theme), rotated cards (hurts reading at 375px).

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.

### Work with me section (round 2, LEARNING-166)
- Searches: `"services offering process steps" --domain landing` and `"call to action specific label" --domain ux` (results in docs/prs/LEARNING-166.md).
- Service cards are `data-part="kit"` and the "How I work" steps are `data-part="roles"`/`"role"`, so this theme's kit-card and roles/timeline rules above style them. Each CTA is a text link with a verb label and an arrow icon (`aria-hidden`), min 44px tall.

### Contact form (round 2, LEARNING-167)
- Searches: `"contact form lead capture" --domain landing` (Lead Magnet + Form: minimal fields, show submission progress, so "Sending…" is shown) and `"inline validation error summary" --domain ux` (Focusable Error Summary and Error Placement were applied; validate-on-blur was skipped so the form behaves the same without JavaScript).
- The form sits left of the direct contacts (`data-part="contact-actions"`, which keeps this theme's rule). Controls use token colours only: `text-subtle` borders (≥ 4.5:1, WCAG 1.4.11), `danger` for errors, and the global accent focus ring. Radios and inputs are at least 44px tall.
