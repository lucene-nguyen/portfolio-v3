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

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.

### Work with me section (round 2, LEARNING-166)
- Searches: `"services offering process steps" --domain landing` and `"call to action specific label" --domain ux` (results in docs/prs/LEARNING-166.md).
- Service cards are `data-part="kit"` and the "How I work" steps are `data-part="roles"`/`"role"`, so this theme's kit-card and roles/timeline rules above style them. Each CTA is a text link with a verb label and an arrow icon (`aria-hidden`), min 44px tall.

### Contact form (round 2, LEARNING-167)
- Searches: `"contact form lead capture" --domain landing` (Lead Magnet + Form: minimal fields, show submission progress, so "Sending…" is shown) and `"inline validation error summary" --domain ux` (Focusable Error Summary and Error Placement were applied; validate-on-blur was skipped so the form behaves the same without JavaScript).
- The form sits left of the direct contacts (`data-part="contact-actions"`, which keeps this theme's rule). Controls use token colours only: `text-subtle` borders (≥ 4.5:1, WCAG 1.4.11), `danger` for errors, and the global accent focus ring. Radios and inputs are at least 44px tall.

### Experience, full (round 3, LEARNING-183)
- Searches: `"resume experience timeline" --domain landing` returned 0 results. The retry, `"portfolio about career"`, matched only weakly (Portfolio Grid, Content First), so no pattern was adopted from it. ux `"long list readability scanning"`: Line Length (65–75 characters) applied (bullets at most 70ch) and Font Size Scale kept. Truncation was rejected: the owner wants every bullet shown.
- Each company row (`data-part="role"`) holds its projects (`data-part="role-entry"`): title, period and context, every bullet (`data-part="bullet"`) with its "→" result, and the tags. A `data-part="certifications"` block follows. Theme role rules apply unchanged.
