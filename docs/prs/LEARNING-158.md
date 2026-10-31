# feat(theme): Cyberpunk + HUD live lab (LEARNING-158)

Jira: LEARNING-158 · Spec: [docs/specs/LEARNING-158-cyberpunk.md](../specs/LEARNING-158-cyberpunk.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/cyberpunk.md` (Cyberpunk UI verified; glow rejected — neon colors pass 4.5:1 on their own; scanlines drawn behind content).
- `themes/cyberpunk/`: magenta/cyan tokens, chamfered frames, uppercase mono headings, static scanlines, one-shot section glitch (translate/skew only).
- HUD packet stream in the lab: staggered packets per response, 429s stop at a firewall that flashes at most every 400 ms (< 3/s); decorative (`aria-hidden`), the lab log keeps the text. Static placement under reduced motion.
- Shared: `lib/lab/events.ts` (`lab:response`), `components/theme/use-theme-slot.ts` (re-resolves on route change; Blueprint uses it too).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 no glow, 4.5:1 | registry tests, e2e (`text-shadow: none` on h1/h2) | pass |
| AC3 reduced motion | e2e | pass |
| AC4 ≤ 3 flashes/s | e2e (MutationObserver on the firewall) | pass |
| AC5 packets + BLOCKED, decorative | e2e | pass |
| AC6 axe, 375px | e2e | pass |
| Regression: HUD/glitch after client-side navigation | e2e | pass |

## Review
Round 1: 1 Blocker (slot/observer stale after client-side navigation) → fixed and covered by a navigation e2e test; Should items fixed (real status codes, flash only on 429, stagger, reduced-motion HUD, square corners under the chamfer) plus nits. No second review round.
