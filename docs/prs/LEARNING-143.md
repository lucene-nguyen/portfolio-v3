# feat(lab): live lab UI connected to `/api/ping` (LEARNING-143)

Jira: LEARNING-143 · Spec: [docs/specs/LEARNING-143-live-lab.md](../specs/LEARNING-143-live-lab.md)

## Summary
- `components/lab/rate-limit-lab.tsx` in the home "Live lab" section: algorithm toggle, Send, Burst × 10, Reset, meter, counters, last-8 log; matches the mockup panel.
- Meter projects refill between requests (`lib/lab/meter.ts`) from the new `X-RateLimit-Reset-Ms` header / `resetMs` field on `/api/ping`.
- Burst keeps the most-drained response as the meter state (responses arrive out of order). Reset clears both algorithms' limiters and reports failures.
- Accessibility: `aria-pressed` toggle, `role="meter"` with value text, one-line `role="status"` summary instead of a chatty live log, `aria-disabled` so focus stays on the button.
- Labels in `content/home.ts` (`lab.ui`).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 controls | `e2e/lab.spec.ts` | pass |
| AC2 send one | `e2e/lab.spec.ts` | pass |
| AC3 burst ≥ one 429, 8 rows, counters = 10 | `e2e/lab.spec.ts` | pass |
| AC4 reset | `e2e/lab.spec.ts` | pass |
| AC5 repo link | `e2e/lab.spec.ts` | pass |
| AC6 meter refills | `lib/lab/meter.test.ts` + e2e (0 → 1 within 2.5 s) | pass |
| AC7 axe + status | `e2e/lab.spec.ts` | pass |

## Review
APPROVE, no Blockers. Fixed: stale meter after algorithm switch, out-of-order burst snapshot, focus loss from `disabled`, silent reset failures, counters group role, ES2023 `toReversed`, interval churn, hardcoded strings.
