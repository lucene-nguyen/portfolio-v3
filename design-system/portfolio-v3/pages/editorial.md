# Editorial Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"editorial magazine reading" --design-system --persist --page editorial`; `"editorial magazine serif" --domain typography`; `"editorial magazine long-form reading" --domain style`), then reconciled.
> **Theme id:** `editorial` (light) · **Tokens:** `themes/editorial/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Style **Editorial Grid / Magazine**: editorial typography, drop caps (`::first-letter`), section dividers, white space.
- Font pairing **Magazine Style**: Libre Bodoni headings.

## Rejected suggestions (and why)
- Public Sans body: Inter Tight stays (one fewer font; same clean role).
- Multi-column text (`column-count`), parallax, page-flip transitions: they break the 60–75-character measure or add motion.

## Color (exact, light)
| Token | Hex | Use |
|---|---|---|
| bg | #FBF8F2 | paper |
| bgAlt | #F4EFE6 | alternate band |
| surface | #FFFFFF | cards |
| surface2 | #EFE9DD | chips |
| border | #DDD5C7 | rules (decorative) |
| borderStrong | #7A6F5E | outlined controls (4.65:1 on bg) |
| text | #1D1A16 | headings |
| text2 | #2F2A24 | tags |
| textSecondary | #3D372F | body |
| textMuted | #5C5449 | meta |
| textSubtle | #665D52 | fine print |
| accent | #9E2B25 | oxblood: links, drop cap, CTA, focus ring |
| accentContrast | #FFFFFF | text on accent |
| warning | #7A4F00 | planned |
| danger | #A3261F | 429 |

## Reading mode (case studies)
- Measure 66ch, 19px × scale, line-height 1.7.
- Toolbar under the header: "N min read" (230 wpm), text size S/M/L (radio group, persisted), "On this page" table of contents.
- 3px accent progress bar at the top (`role="progressbar"`).
