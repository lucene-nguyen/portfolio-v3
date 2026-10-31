# Pixel Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-10-31 with ui-ux-pro-max (`"retro pixel game" --design-system --persist --page pixel`; `"pixel art retro 8-bit game" --domain style`; `"pixel retro game" --domain typography`), then reconciled.
> **Theme id:** `pixel` · **Tokens:** `themes/pixel/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Style **Pixel Art**: sharp edges, `image-rendering: pixelated`, pixel `box-shadow` borders, limited palette. Accessibility: contrast 4.5, keyboard, visible focus, reduced motion.
- Font pairing **Pixel Retro**: Press Start 2P for headings ("very wide/large" → reduced sizes, line-height 1.5).

## Rejected suggestions (and why)
- VT323 body font: the brief requires a readable body font → Inter Tight stays.
- Marquee text, blinking cursor, frame-by-frame animation: distracting; no motion added.

## Color (exact)
| Token | Hex | Use |
|---|---|---|
| bg | #1A1C2C | ground |
| bgAlt | #1F2133 | alternate band |
| surface | #262B44 | dialog boxes, cards |
| surface2 | #2F3555 | chips |
| border | #3B4270 | hairlines (decorative) |
| borderStrong | #8B93C9 | pixel borders and shadows (5.7:1 on bg) |
| text | #F4F4F4 | headings |
| text2 | #E0E3F2 | tags |
| textSecondary | #C8CCE4 | body |
| textMuted | #AEB4D6 | meta |
| textSubtle | #A1A8CE | fine print (5.1:1 on surface2) |
| accent | #A7F070 | XP green: CTA, unlocked, focus ring |
| accentContrast | #1A1C2C | text on accent |
| warning | #FFCD75 | planned |
| danger | #FF9A8A | 429, low mana |
| mana fill | #5FCDE4 | meter fill (non-text, 9:1 on bg) |

## Features
- Mana bar: the lab meter, 5 segments, label prefixed "MANA".
- Achievements: Bookworm (read a case study), Slow down! (trigger a 429), Explorer (try every theme). Status always in words.
- Sound: square-wave blip on unlock, off by default, checkbox in the dialog.
