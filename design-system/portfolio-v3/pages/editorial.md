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

## Layout
> ui-ux-pro-max (UI round 1): `"editorial magazine storytelling" --domain landing` and retry `"storytelling" --domain landing` → **no verified match**; section order follows built-in defaults (hero first). `"long-form reading typography" --domain ux`.

**Section order:** Hero → Case studies → Live lab → Starter kits → Experience + stack → Contact.
- Verified (ux): line length 65–75 characters (hero lead, teasers and case-study body capped by `ch`).
- Rejected (ux): truncating teasers with an ellipsis — editorial teasers show the whole standfirst.

**How the shared sections look** (magazine)
- Eyebrows → small caps kicker in the accent, letter-spaced.
- Case study cards → **feature teasers**: no box or shadow; hairline rule on top, small-caps kicker (meta), large serif headline, standfirst in body text, metrics as serif pull-figures, tags as an inline small-caps list separated by middots, "Read case study" as an underlined text link.
- Hero stats → **"by the numbers" band**: hairline rules above/below, serif numerals, small-caps captions, no boxes.
- Experience → **masthead list**: serif company names, small-caps dates, hairline rules between roles; stack as plain small-caps lists.
- Buttons: square corners everywhere; the hero keeps its filled primary CTA.
- Contact → **sign-off**: serif heading, actions as understated outlined buttons on a hairline rule.
- Starter kits → teaser cards without boxes, hairline top rule.

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.

### Work with me section (round 2, LEARNING-166)
- Searches: `"services offering process steps" --domain landing` and `"call to action specific label" --domain ux` (results in docs/prs/LEARNING-166.md).
- Service cards are `data-part="kit"` and the "How I work" steps are `data-part="roles"`/`"role"`, so this theme's kit-card and roles/timeline rules above style them. Each CTA is a text link with a verb label and an arrow icon (`aria-hidden`), min 44px tall.

### Contact form (round 2, LEARNING-167)
- Searches: `"contact form lead capture" --domain landing` (Lead Magnet + Form: minimal fields, show submission progress, so "Sending…" is shown) and `"inline validation error summary" --domain ux` (Focusable Error Summary and Error Placement were applied; validate-on-blur was skipped so the form behaves the same without JavaScript).
- The form sits left of the direct contacts (`data-part="contact-actions"`, which keeps this theme's rule). Controls use token colours only: `text-subtle` borders (≥ 4.5:1, WCAG 1.4.11), `danger` for errors, and the global accent focus ring. Radios and inputs are at least 44px tall.
