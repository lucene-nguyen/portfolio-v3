# Dashboard Page Overrides

> **PROJECT:** Portfolio v3
> **Generated:** 2026-11-01 with ui-ux-pro-max (`"observability dashboard real-time metrics" --design-system --persist --page dashboard --density 8`; `"real-time monitoring" --domain chart`), then reconciled.
> **Theme id:** `dashboard` · **Tokens:** `themes/dashboard/index.ts`

> ⚠️ Rules in this file **override** `MASTER.md`.

## Verified from ui-ux-pro-max
- Density 8/10 (dashboard spacing). Chart: **Streaming Area/line chart** for real-time data; show the current value and status as text; use line styles or markers in addition to color (accessibility: conditional risk).

## Rejected suggestions (and why)
- Pure #00FF00 "current pulse": replaced by the muted Grafana-style green meter token (still ≥ 3:1).
- Area fill with fading opacity: two lines (solid 200, dashed 429) read better without color.

## Color (exact)
| Token | Hex | Use |
|---|---|---|
| bg | #111217 | ground |
| bgAlt | #15161C | alternate band |
| surface | #181B1F | panels |
| surface2 | #22252B | chips, bar tracks |
| border | #2C3038 | panel borders (decorative) |
| borderStrong | #8E95A2 | outlined controls (6.2:1) |
| text | #E7E9EE | values |
| text2 | #D5D9E0 | tags |
| textSecondary | #C7CBD3 | body |
| textMuted | #A7AEBA | labels, sources |
| textSubtle | #9AA1AE | fine print |
| accent | #6EA6FF | links, bars, focus ring |
| accentContrast | #111217 | text on accent |
| warning | #F5B73B | "unavailable" notices |
| danger | #FF7383 | 429 (dashed line) |
| meterFill | #73BF69 | 200 (solid line) |

## Panels (every number states its source)
- Live lab traffic — `/api/ping` outcomes across all visitors, last 60 s, polled every 5 s (`/api/stats`): req/s, 200, 429, blocked share, chart + hidden data table.
- GitHub activity — GitHub REST API public data, cached 1 h (`/api/github`).
- Career uptime, Stack usage, Timeline — derived from `content/` (experience, case-study tags).
- Unavailable APIs: a warning line, last known values kept, other panels unaffected.

## Layout
> ui-ux-pro-max (UI round 1): `"analytics dashboard data" --domain landing`, `"dashboard panels data density" --domain ux` (bulk actions / autoplay: not applicable) and retry `"data table readability" --domain ux`.

**Section order:** Hero → Dashboard panels (live metrics) → Case studies → Live lab → Starter kits → Experience + stack → Contact.
- Verified: landing **Real-Time / Operations** — "Hero (product + live preview or status) > Key metrics > How it works > CTA": the live panels sit right under the hero, then the work.
- Verified (ux): tables become stacked rows on small screens; numbers formatted.
- Rejected: **Enterprise Gateway** (solutions by industry/role, client logos) — a sales funnel, not a portfolio; bulk actions (no data entry here).

**How the shared sections look** (Grafana panels)
- Eyebrows → panel-row labels: uppercase, letter-spaced, muted.
- Case study cards → **panels**: 4px radius, title bar (`surface2`, rule below) holding the meta line; metrics as large stat values; tags as small labels.
- Hero stats → **stat panels**: one panel per stat with gaps, value large, label small uppercase.
- Experience → **table**: header row (Period · Company / role) on wide screens, zebra rows, stacked rows on mobile.
- Contact → **panel** with a "contact" title bar above the actions.
- Starter kits → panels (4px radius, `border`).

### Skills section (round 2, LEARNING-165)
- Searches: `"skills showcase logos grid" --domain landing` (Feature-Rich Showcase and Bento Grid Showcase: scannable groups, a stack on mobile, nothing hidden behind hover) and `"icon with text label" --domain ux` (Compact Label Overflow: chip labels never wrap).
- The skills panel is `data-part="stack"` and now sits in its own `#skills` section after the hero, not beside Experience, so this theme's stack-panel rule above styles it. The group headings are `h3`s inside that panel. Icons are monochrome (`currentColor`), so they follow the theme's text colour. "Also familiar with" is smaller and muted.
