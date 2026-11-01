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

## Layout
Shared sections (UI round 1). Searches:
- `"storytelling scroll narrative" --domain landing` verified Scroll-Triggered Storytelling. Applied: chapter framing, and a narrative that reads fine without scroll effects. Rejected: scroll-driven reveals, since no new motion is added.
- `"comic manga panel"` and `"comic illustration playful"` (`--domain style`) returned no match. The manga look below falls back to this page's own Manga strip rules, not to a database result.
- ux `"visual hierarchy scanning"`: Font Size Scale is kept, and Hover States are already handled by the shared components. Breadcrumbs were ignored as off-topic.

Rules:
- Eyebrows are chapter tabs: an accent fill, white italic bold text and a slanted right edge (clip-path). White on #C2185B is about 5.9:1.
- Case studies and kits are ink panels: a 4px border with a 5px hard shadow. The meta line is a screentone caption strip that runs edge to edge (halftone accent dots at 22% over surface2). The metrics sit in a speech bubble with a tail.
- Hero numbers are a comic page: white panels on 6px ink gutters inside a 4px frame.
- Experience: each role is a narration box (a bgAlt fill with a 3px ink border and an italic period). The stack is an ink panel on screentone.
- The contact actions sit inside a speech bubble.
- Rejected: skewed or rotated panels (they hurt reading at 375px) and panel entrance animation on the shared sections (the strip already has one).
