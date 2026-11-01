# Cyberpunk Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"cyberpunk neon hud" --design-system --persist --page cyberpunk`; `"cyberpunk neon dystopian" --domain style`), then reconciled.
> **Theme id:** `cyberpunk` · **Tokens:** `themes/cyberpunk/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Style **Cyberpunk UI**: near-black ground, magenta/cyan neon, glitch (skew/offset), scanlines, terminal font. Requires contrast 4.5, keyboard, visible focus, reduced motion.

## Rejected suggestions (and why)
- Neon glow `text-shadow`: forbidden by the brief — glow must not fake contrast. Neon colors pass 4.5:1 on their own.
- Scanlines as an overlay above content: would lower text contrast → drawn as a static body background behind content.
- Matrix green: magenta accent + cyan meter keep one accent per region.

## Color (exact)
| Token | Hex | Use |
|---|---|---|
| bg | #0A0A12 | ground |
| bgAlt | #0E0E18 | alternate band |
| surface | #13131F | HUD frames |
| surface2 | #1B1B2B | chips |
| border | #2A2A40 | hairlines (decorative) |
| borderStrong | #8A8AB8 | frame outlines, firewall (6.0:1 on bg) |
| text | #F2F2FF | headings |
| text2 | #E0E0F5 | tags |
| textSecondary | #C6C6E0 | body |
| textMuted | #A9A9CC | meta |
| textSubtle | #9A9AC0 | fine print (bg, bgAlt, surface) |
| accent | #FF5CDB | neon magenta: CTA, eyebrows, focus ring |
| accentContrast | #0A0A12 | text on accent |
| warning | #FFE14D | planned |
| danger | #FF7070 | 429, blocked packets, firewall hit |
| meterFill | #2DE2E6 | neon cyan meter, passing packets |

## Motion
- Glitch: one-shot 280ms translate/skew on a section heading when it first enters view (no luminance flash).
- Packets: 900ms travel; the firewall flashes for 250ms at most once every 400ms (< 3 flashes/s).
- `prefers-reduced-motion`: no scanlines, no glitch; packets are clamped by the global rule.

## Shape & type
- Chamfered corners (clip-path, 14px) on cards and the lab panel; headings JetBrains Mono, uppercase.

## Layout
> ui-ux-pro-max (UI round 1): `"cyberpunk futuristic tech" --domain landing` and retry `"dark mode portfolio" --domain landing` → **no verified match**; section order follows the skill's built-in defaults (hero first). `"neon dark interface readability" --domain ux`.

**Section order:** Hero → Case studies → Live lab (HUD packet stream) → Starter kits → Experience + stack → Contact.
- Verified (ux): readable contrast without glow; body line-height 1.5–1.75; formatted numbers.
- Rejected: chamfered (clip-path) buttons — clip-path would cut off the focus ring; buttons stay square with a 1px frame.

**How the shared sections look** (HUD language; labels are CSS with empty alt text)
- Eyebrows → bracketed HUD labels `[ 01 / selected work ]`.
- Case study cards → **dossiers**: chamfered frame (existing), meta line as a status bar (uppercase, rule below), metrics as cyan readouts, tags as bracketed chips.
- Hero stats → **HUD readouts**: each stat in its own frame with cyan corner brackets; values in cyan mono; the highlighted stat stays magenta (accent).
- Experience → **access log**: framed list, each role prefixed with a `>` prompt, dashed separators.
- Contact → **"UPLINK" panel**: chamfered magenta frame around the actions; buttons uppercase mono, square.
- Starter kits → framed modules with a 1px `borderStrong` frame.

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.

### Work with me section (round 2, LEARNING-166)
- Searches: `"services offering process steps" --domain landing` and `"call to action specific label" --domain ux` (results in docs/prs/LEARNING-166.md).
- Service cards are `data-part="kit"` and the "How I work" steps are `data-part="roles"`/`"role"`, so this theme's kit-card and roles/timeline rules above style them. Each CTA is a text link with a verb label and an arrow icon (`aria-hidden`), min 44px tall.
