# Night Terminal Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-10-31 with ui-ux-pro-max (`"developer portfolio terminal dark" --design-system --persist --page night-terminal --motion 3`), then reconciled with the owner's "Portfolio v3" design system.
> **Theme id:** `night-terminal` (default) · **Tokens:** `themes/night-terminal/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`. Where MASTER's generated palette, fonts or pattern differ, this file wins.

---

## Verified from ui-ux-pro-max
- Style: **Dark Mode (OLED)** — dark ground, high-contrast text, visible focus, reduced-motion support. Fits coding/developer portfolios.
- Palette family: "code dark + run green" (Developer Tool / IDE).
- Motion dial 3/10: subtle only; 150–200ms hover transitions; no scroll-jacking.

## Rejected suggestions (and why)
- Pattern "FAQ/Documentation landing": this is a portfolio home, not a help center.
- Monospace body text: hurts long-form readability. Mono stays for "the system talking" only.
- Generated palette (#0F172A / #22C55E): replaced by the owner's approved tokens below.
- Glow `text-shadow`: no glow; contrast must come from the colors themselves.

## Color (exact, owner-approved)
| Token | Hex | Use |
|---|---|---|
| bg | #0B0F14 | page ground, log console |
| bgAlt | #0E131A | alternate band (live lab) |
| surface | #121821 | cards, panels |
| surface2 | #1A2330 | chips, selected segment |
| border | #1F2A37 | hairlines (decorative only) |
| borderStrong | #2B3A4C | outlined buttons/tags (must carry text) |
| text | #E6EDF3 | headings, primary |
| text2 | #C9D3DF | tag labels |
| textSecondary | #A9B4C2 | body in cards |
| textMuted | #8B98A9 | meta, nav links |
| textSubtle | #7A8798 | timestamps, fine print (lowest allowed); on bg, bgAlt, surface only — 4.3:1 on surface2, so never there |
| accent | #7EE787 | one accent: CTA, eyebrows, key numbers, 200, focus ring |
| accentContrast | #0B0F14 | text on accent |
| warning | #F2C66D | "planned" |
| danger | #FF9B7A | 429, low meter (always with the code text) |

## Typography
- Inter Tight for headings and body (body ≥ 16px, line-height ≥ 1.5).
- JetBrains Mono for eyebrows, stats, tags, code, logs and the command bar.

## Command bar (theme feature)
- Opens with `/` or Ctrl/Cmd+K and from a visible "Terminal" button; closes with Esc; focus returns to the opener.
- Prompt `$` in accent, input in mono 15px, output lines in `textSecondary`, errors in `danger` with the word "error".
- Commands: `help`, `ls projects`, `cat resume`, `open <case-study>`, `theme <id>`, `contact`, `clear`.
- ↑/↓ history, Tab completes commands and arguments.
- Every command has a normal-link equivalent (nav, case study cards, theme switcher, contact section).
- Output region is `role="log"` with `aria-live="polite"`.
- ≤ 640px: the bar is not docked; only the "Terminal" button shows, opening the bar as a full-width sheet.

## Accessibility
- All text pairs ≥ 4.5:1 (enforced by `themes/registry.test.ts`).
- `:focus-visible` = 2px accent outline, 2px offset, on every interactive element.
- No animation beyond 200ms fades; everything off under `prefers-reduced-motion`.

## Layout
> ui-ux-pro-max (UI round 1): `"developer portfolio" --domain landing`, `"terminal monospace readability" --domain ux`.

**Section order:** Hero → Case studies → Live lab → Starter kits → Experience + stack → Contact (the approved mockup's order).
- Verified: landing **Portfolio Grid** — "Hero (Name/Role) > Project Grid > About > Contact"; contact CTA in the footer.
- Verified (ux): formatted numbers, body line-height 1.5–1.75, high-contrast text.
- Rejected: masonry grid and hover-only card CTAs (the mockup's equal cards with an explicit "Read case study" link stay).
- This is the default theme from the owner's approved mockup: changes are terminal-language accents, not a new layout.

**How the shared sections look**
- Eyebrows → shell comments: `# 01 / selected work`.
- Case study cards → **terminal windows**: the meta line becomes a title bar (`bg`, rule below, `▸` prompt), body unchanged.
- Hero stats → command output: labels prefixed with `›` (values stay on one line).
- Experience → **git log**: a dashed graph line down the left with an accent commit dot per role.
- Contact → **prompt**: actions under a `$ contact --open` line.

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.

### Work with me section (round 2, LEARNING-166)
- Searches: `"services offering process steps" --domain landing` and `"call to action specific label" --domain ux` (results in docs/prs/LEARNING-166.md).
- Service cards are `data-part="kit"` and the "How I work" steps are `data-part="roles"`/`"role"`, so this theme's kit-card and roles/timeline rules above style them. Each CTA is a text link with a verb label and an arrow icon (`aria-hidden`), min 44px tall.
