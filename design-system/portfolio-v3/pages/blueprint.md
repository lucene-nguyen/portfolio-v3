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
- Radius 2px feel; 1px dashed connectors; 24px grid-paper background (decorative, `border` at 35%).

## System map (theme feature, home page)
- One node per case study / public project; a hub node for the owner. Connectors are 1px dashed `borderStrong` lines.
- Each node is a real link (accessible name = title + tech + impact); details show on hover **and** keyboard focus.
- "View as list" (`<details>`) gives the same links as a plain list.
- Pure HTML/SVG/CSS: renders and navigates without JavaScript.
- < 768px: nodes stack in one column, connectors hidden.
- No animation.

## Layout
> ui-ux-pro-max: `"portfolio technical case studies" --domain landing`, `"technical diagram wireframe readability" --domain ux` (UI round 1).

**Section order:** Hero → System map → Case studies → Live lab → Starter kits → Experience + stack → Contact.
- Verified: landing pattern **Portfolio Grid** ("Hero (Name/Role) > Project Grid > About > Contact"); the system map + case studies are the project grid right after the hero; experience (about) and contact follow.
- Verified (ux): body line-height 1.5–1.75; dark text never grey-on-grey (blueprint inverts: light text on blue, all ≥ 4.5:1).
- Rejected: masonry project grid (spec sheets of equal height read and compare better); project-card hover as the primary CTA (keyboard/touch users need the explicit "Read case study" link).

**How the shared sections look**
- Case study cards → **spec sheets**: square corners, 1px `borderStrong` frame, accent corner ticks, meta line as a title strip (mono caps, bottom rule), metrics as **dimension annotations** (mono value between end-stop rules), tags as boxed technical labels.
- Hero stats → dimension annotations in dashed frames with a mono caption.
- Experience → **revision table**: each role a row with mono date column and hairline grid; stack groups as boxed label lists.
- Contact → **drawing title block**: actions inside a ruled box with a "TITLE BLOCK" caption; footer as the sheet's revision line.
- Buttons: square, 1px outline, mono label; primary = pencil-yellow fill.

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.
