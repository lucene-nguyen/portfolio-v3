# IDE Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"developer tool IDE code editor" --design-system --persist --page ide`; `"tabs keyboard navigation" --domain ux`), then reconciled.
> **Theme id:** `ide` · **Tokens:** `themes/ide/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Category Developer Tool / IDE: code-dark ground, one blue accent, mono for chrome.
- UX (keyboard): tab order follows visual order; every action works without a pointer; skip link on nav-heavy pages (site-wide skip link kept).

## Rejected suggestions (and why)
- Rendering content as code blocks or monospace prose: the brief requires readable prose → body stays Inter Tight.

## Color (exact)
| Token | Hex | Use |
|---|---|---|
| bg | #1E1E1E | editor |
| bgAlt | #1B1B1B | alternate band |
| surface | #252526 | explorer, tab bar |
| surface2 | #2D2D30 | hover, current file |
| border | #3C3C3C | dividers (decorative) |
| borderStrong | #8A8A8A | outlined controls (4.8:1 on bg, 4.4:1 on surface; ≥ 3:1 required) |
| text | #E4E4E4 | active tab, headings |
| text2 | #D4D4D4 | tags |
| textSecondary | #CCCCCC | explorer items, body |
| textMuted | #ABABAB | inactive tabs, breadcrumbs |
| textSubtle | #A0A0A0 | fine print |
| accent | #4FC1FF | file icons, active tab bar, focus ring |
| accentContrast | #1E1E1E | text on accent |
| warning | #E2C08D | planned |
| danger | #F48771 | 429 |
| meterFill | #89D185 | lab meter |

## Layout
- Explorer (≥ 768px sidebar; drawer below) lists sections as files: `about.ts`, `work/README.md`, `work/*.md`, `lab/rate-limiter.ts`, `kits/README.md`, `resume.json`, `contact.md`. Every file is a real link to an existing page or anchor.
- "Open editors" tab bar: tabs are links (deep-linkable) with separate close buttons; open tabs kept per session.
- Path line `portfolio-v3 › work › x.md` under the tabs. Ctrl/⌘K: "Go to file" palette (combobox + listbox).
