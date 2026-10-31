# Blueprint Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-10-31 with ui-ux-pro-max (`"technical blueprint engineering wireframe" --design-system --persist --page blueprint`; style search `"blueprint technical drawing engineering" --domain style`), then reconciled.
> **Theme id:** `blueprint` · **Tokens:** `themes/blueprint/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

---

## Verified from ui-ux-pro-max
- Closest style: **HUD / Sci-Fi FUI** — kept: fine 1px line work, monospaced technical labels, decorative markers (corner ticks), dark ground.
- Accessibility profile for this style is "risk: high" → requires contrast 4.5:1, keyboard, visible focus, reduced motion. All enforced below.

## Rejected suggestions (and why)
- Neon cyan/red, glow `text-shadow`, scanning/blinking animation: a blueprint is calm drafting paper, and glow cannot be used to fake contrast.
- Black/transparent ground: replaced by blueprint blue.

## Color (exact)
| Token | Hex | Use |
|---|---|---|
| bg | #0A2540 | blueprint paper |
| bgAlt | #0C2B4A | alternate band |
| surface | #0F3157 | cards, map nodes |
| surface2 | #143A66 | chips |
| border | #2A5A8C | hairlines, grid lines (decorative) |
| borderStrong | #6E9BCB | node outlines, connectors (5.3:1 on bg) |
| text | #F4F8FF | headings |
| text2 | #D6E4F5 | tag labels |
| textSecondary | #BDD2EA | body |
| textMuted | #A3BEDD | meta, captions |
| textSubtle | #94B3D8 | fine print (5.3:1 on surface2, lowest pair) |
| accent | #FFD166 | drafting-pencil yellow: CTA, eyebrows, key numbers, focus ring |
| accentContrast | #0A2540 | text on accent |
| warning | #FFB86B | planned |
| danger | #FFA3A3 | 429 |

## Typography & shape
- Headings in JetBrains Mono (technical labels); body stays Inter Tight.
- Radius 2px feel; 1px lines; 24px grid-paper background (decorative, `border` at 35%).

## System map (theme feature, home page)
- One node per case study / public project; a hub node for the owner. Connectors are 1px `borderStrong` lines.
- Each node is a real link (accessible name = title + tech + impact); details show on hover **and** keyboard focus.
- "View as list" (`<details>`) gives the same links as a plain list.
- Pure HTML/SVG/CSS: renders and navigates without JavaScript.
- < 768px: nodes stack in one column, connectors hidden.
- No animation.
