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
