# Live lab UI connected to `/api/ping` (LEARNING-143)

Status: Approved (self-approved, autonomous mode)

## Goal
An interactive playground in the home page's "Live lab" section that shows token bucket vs fixed window on the real endpoint.

## Scope
- `components/lab/rate-limit-lab.tsx` (client) inside `LabSection`, styled per the mockup panel.
- Algorithm toggle (`aria-pressed` buttons), "Send request", "Burst × 10" (10 parallel requests), "Reset" (`DELETE /api/ping` for the visitor's own limiter + clears the log).
- Meter (`role="meter"`) showing remaining capacity, projected between requests from `X-RateLimit-Remaining` and the new `X-RateLimit-Reset-Ms` header (`lib/lab/meter.ts`).
- Log of the last 8 responses: time, status code, message. Counters for 200 and 429.
- `X-RateLimit-Reset-Ms` / `resetMs` added to `/api/ping` responses (ms until capacity is fully restored).

## Out of scope
HUD/mana-bar variants (themes 11 and 12).

## Acceptance criteria
- AC1: Given the lab, then the toggle, Send, Burst × 10 and Reset controls are buttons with visible labels and the selected algorithm has `aria-pressed="true"`.
- AC2: Given "Send request", then a log row shows time, `200` and `X-RateLimit-Remaining: 4`, and the meter's `aria-valuenow` is 4.
- AC3: Given "Burst × 10" from a fresh limiter, then the log keeps only the last 8 rows, counters add up to 10, and at least one `429` appears.
- AC4: Given "Reset", then the log and counters clear and the next request returns 200.
- AC5: Given the lab, then it links to the `rate-limiting-lab` repo.
- AC6: Given the token bucket after a burst, when 1 s passes, then the meter rises by one without a new request.
- AC7: Given the lab after a burst, then axe reports no violations; the result summary is announced via `role="status"`.

## Technical notes
- The log is an `<ol>`, not a live region, so a burst does not announce 10 lines; the one-line summary is announced instead.
- Labels live in `content/home.ts` (`lab.ui`).

## Risks
- Visitors behind one NAT share a limiter (IP-based by design, per LEARNING-142).
