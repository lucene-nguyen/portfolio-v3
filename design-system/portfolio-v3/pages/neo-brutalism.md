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
