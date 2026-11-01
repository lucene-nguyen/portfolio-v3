# Bento Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"bento grid portfolio" --design-system --persist --page bento`; `"bento grid" --domain style`; `"drag and drop reorder keyboard" --domain ux`), then reconciled.
> **Theme id:** `bento` (light) · **Tokens:** `themes/bento/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Style **Bento Box Grid**: modular tiles of varied sizes (1×1, 2×1, 2×2), 4-column grid, 24px radius, soft shadows, neutral ground.
- UX (Dragging Movements): dragging is never the only way — every tile has move earlier/later buttons; tab order follows visual order.

## Rejected suggestions (and why)
- Hover scale (1.02): motion without meaning; tiles stay still.

## Color (exact, light)
| Token | Hex | Use |
|---|---|---|
| bg | #F4F4F2 | ground |
| bgAlt | #ECEBE7 | stack tile |
| surface | #FFFFFF | about, case study, contact tiles |
| surface2 | #E8ECF5 | photo, lab tiles |
| border | #DADAD6 | rules (decorative) |
| borderStrong | #71717A | outlined buttons (4.4:1) |
| text | #18181B | headings |
| text2 | #27272A | chips |
| textSecondary | #3F3F46 | body |
| textMuted | #52525B | meta |
| textSubtle | #5A5A62 | fine print |
| accent | #4338CA | stats tile fill, links, focus ring |
| accentContrast | #FFFFFF | all text on the stats tile |
| warning | #854D0E | planned |
| danger | #B91C1C | 429 |

Every tile colour is a token whose text pairs are tested (registry tests: text tokens on bg/bgAlt/surface/surface2; accentContrast on accent).

## Behaviour
- Tiles: About (2×2), Photo (1×2), Key numbers (accent), one per case study, Stack (2×1), Live lab, Contact.
- Reorder: drag a tile onto another, or use the arrow buttons (focus stays on the pressed button; a status line announces the new position). Order saved in localStorage; "Reset layout" restores the default.
- < 768px: one column.

## Layout
Searched (UI round 1): `"portfolio bento grid" --domain landing` → **Bento Grid Showcase** (verified: Hero > Bento grid > detail cards > CTA; mobile stack; cards usable without hover; final state under reduced motion) and **Portfolio Grid** (neutral ground, minimal accent). `"card grid scannable hierarchy" --domain ux` → Heading Hierarchy, Font Size Scale (verified; the breadcrumb hit is off-topic for a one-level site and ignored).

Shared sections (below the "At a glance" grid) speak the same tile language:
- Every block is a tile: 24px radius (`--theme-radius`), no border, soft shadow, white on the #F4F4F2 ground.
- Eyebrows are small pill chips (surface2 ground, accent text).
- Case studies: a 2-column mosaic ≥ 768px; the first study is the 2×1 feature tile, the other two sit side by side below it (a 1×2 tile left half the tile empty). One column below 768px.
- Hero key numbers: separate small tiles (2×2 on narrow screens), not a divided strip.
- Experience: each role is a tile; the stack column is one bgAlt tile.
- Kits: tiles, same radius and shadow. Contact actions sit in one tile.
- Rejected: hover scale/tilt (motion without meaning), staggered entrance (nothing animates under reduced motion; tiles render in their final state always).
