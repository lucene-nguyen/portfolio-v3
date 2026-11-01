# Anime Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01. ui-ux-pro-max persisted this page (`"manga comic storytelling" --design-system --persist --page anime`), but style searches (`"anime manga comic"`, retry `"comic"`) returned **no verified match**. The rules below come from the skill's built-in priority defaults (accessibility, contrast, reduced motion), not from a database style.
> **Theme id:** `anime` (light) · **Tokens:** `themes/anime/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Rules (built-in defaults)
- Text 4.5:1 everywhere, including speech-bubble text (black on white).
- Every image has alt text; the story also exists as plain text.
- Motion is decoration only and off under `prefers-reduced-motion`.

## Artwork policy
- Only original artwork (commissioned or self-made). No copyrighted characters, no fan art, no lookalikes.
- Current panels are abstract placeholders drawn in SVG (speed lines, halftone dots, a laptop glyph) — marked `[PLACEHOLDER: commissioned artwork]`.

## Color (exact, light)
| Token | Hex | Use |
|---|---|---|
| bg | #FFFBF2 | paper |
| bgAlt | #FFF1E0 | alternate band |
| surface | #FFFFFF | panels, bubbles |
| surface2 | #FFE8F0 | panel art ground |
| border | #1A1A1A | 4px ink borders |
| borderStrong | #1A1A1A | outlines |
| text | #111111 | bubble text, headings |
| text2 | #1D1D1D | tags |
| textSecondary | #2A2A2A | body |
| textMuted | #4A4A4A | chapter labels |
| textSubtle | #525252 | fine print |
| accent | #C2185B | halftone, links, focus ring |
| accentContrast | #FFFFFF | text on accent |
| warning | #7F4A00 | planned |
| danger | #B3132B | 429 |

## Manga strip
- One panel per role (oldest first): art, "Chapter n · period", company, speech bubble with the role summary from `content/` (verbatim).
- "Read the story as plain text" (`<details>`), 4px ink borders, hard shadow, bubbles with a tail.
