# Docs Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"documentation knowledge base notion" --design-system --persist --page docs`; `"documentation knowledge base sidebar search" --domain ux`), then reconciled.
> **Theme id:** `docs` (light) · **Tokens:** `themes/docs/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Pattern **FAQ/Documentation** with **Minimalism**: clean, high readability, minimal color, prominent search.
- UX (Search): show results as the user types; a no-results state with suggestions, never a blank list.

## Rejected suggestions (and why)
- "Hero with search bar" landing: the home content stays; search lives in the sidebar and a shortcut dialog.

## Color (exact, light)
| Token | Hex | Use |
|---|---|---|
| bg | #FFFFFF | page |
| bgAlt | #F7F6F3 | sidebar |
| surface | #FFFFFF | dialogs |
| surface2 | #F1F1EF | hover, current page, active result |
| border | #E9E9E7 | rules (decorative) |
| borderStrong | #787774 | control outlines (4.5:1) |
| text | #37352F | headings |
| text2 | #37352F | tags |
| textSecondary | #45433D | body, sidebar links |
| textMuted | #5F5E5A | section labels, breadcrumbs |
| textSubtle | #66655F | fine print |
| accent | #0B66C2 | links, CTA, focus ring |
| accentContrast | #FFFFFF | text on accent |
| warning | #8A5A00 | planned |
| danger | #B42318 | 429 |

## Layout
- ≥ 1024px: 272px sticky left sidebar (search button, home sections, case studies with `aria-current`), content on the right with breadcrumbs.
- < 1024px: "Menu" opens the sidebar as a left drawer (native `<dialog>`); search button stays visible.

## Search
- Index: `/search-index.json`, generated at build time from `content/` (home content + one entry per case-study section); fetched on first open.
- Opens with `/` or Ctrl/Cmd+K; combobox + listbox (arrow keys, Enter opens, Esc closes and restores focus); result count announced.

### Shared sections (UI round 1)
> ui-ux-pro-max: `"documentation knowledge base" --domain landing`, `"documentation readability navigation" --domain ux`.

**Section order:** Hero → Case studies → Live lab → Starter kits → Experience + stack → Contact (in the docs content column).
- Verified: landing **FAQ/Documentation** — prominent search (sidebar + `/`) and the contact CTA last.
- Verified (ux): sticky navigation never overlaps content (sidebar sits beside it); body line-height 1.5–1.75; formatted numbers.
- Rejected: FAQ accordions (the portfolio content isn't Q&A); emoji callout icons (checklist: no emoji as icons).

**How the shared sections look** (Notion blocks)
- Eyebrows → quiet grey section labels (sans, 13px, no caps).
- Case study cards → **gallery cards**: 6px radius, 1px border, no shadow; meta line as property chips; tags as multi-select pills (`surface2`, 4px radius).
- Hero stats → **callout block**: `bgAlt` fill, 6px radius, no dividers.
- Experience → **database list**: rows with the period as a property chip, 18px titles, hairline separators.
- Contact → **callout block** around the actions.
- Starter kits → gallery cards like the case studies.

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.
