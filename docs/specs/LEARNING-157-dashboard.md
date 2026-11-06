# Theme 10: Dashboard / observability + live metrics (LEARNING-157)

Status: Approved (self-approved, autonomous mode)

## Goal
A Grafana-style theme whose home page opens with live and derived metrics, each with its source.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/dashboard.md`.
- `lib/rate-limit/stats.ts`: per-second 200/429 counters across visitors (Redis keys `stats:<sec>:<code>`, TTL 120 s; memory fallback). `/api/ping` records each outcome (failures ignored).
- `GET /api/stats` (last 60 s), `GET /api/github` (public user + events, revalidate 1 h).
- `lib/dashboard.ts`: timeline and stack usage from `content/`.
- `themes/dashboard/`: tokens, layout portalling five panels into `#theme-slot-home`.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/dashboard.md` exists with the exact tokens.
- AC2: Every panel shows "Source: …"; no number exists that is not live API data or derived from `content/`.
- AC3: The traffic chart has a text alternative (labelled `img` + data table) and distinguishes 200/429 by line style, not only color.
- AC4: When `/api/stats` or `/api/github` fail, their panels say "Unavailable" and the rest of the dashboard still renders.
- AC5: Contrast ≥ 4.5:1 (registry tests), axe clean, no horizontal scroll at 375px.

## Data changes
New ephemeral Redis keys `stats:<unix-second>:<200|429>` (TTL 120 s). No setup or migration script needed; nothing persists.
