# feat(home): home page from the approved mockup (LEARNING-141)

Jira: LEARNING-141 · Spec: [docs/specs/LEARNING-141-home-page.md](../specs/LEARNING-141-home-page.md)

## Summary
- Nav (with theme switcher, skip link), hero (avatar + stats), case study cards, live lab intro, starter kits, experience + stack.json, contact footer, built from the "Cuong Nguyen Portfolio" mockup and the "Portfolio v3" design system.
- All copy in `content/home.ts`; components contain no facts or hex values.
- Theme tokens extended to the full design-system palette (`bgAlt`, `surface2`, `borderStrong`, `text2`, `textSecondary`, `warning`, `danger`), contrast-tested.
- Global `:focus-visible` ring (accent, 2px/2px offset). Avatar copied from the mockup to `public/avatar.jpg`.
- Added dev dependency `@axe-core/playwright`.

## Owner: please confirm
Facts were copied verbatim from your approved mockup (not from a repo doc): 5+ yrs, 2,500+ stores, 300→20ms, AWS Certified Developer – Associate, case study metrics, roles and dates at FPT Software / NEOX / Faboshop, stack list.
Still `[PLACEHOLDER]`: LinkedIn URL, resume PDF, p95 job latency, manual hours saved/week, Booking/CRM kit stacks, kit links. Placeholder links render as muted text, not controls.

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 sections + headings | `e2e/home.spec.ts` | pass |
| AC2 375px no h-scroll | `e2e/home.spec.ts` | pass |
| AC3 contrast + axe | `themes/registry.test.ts`, axe scan | pass (0 violations) |
| AC4 keyboard + focus ring | Tab through all 17 focusables | pass |
| AC5 Lighthouse | local `lighthouse@12` on `next start` | Performance 96, Accessibility 100, Best practices 100, SEO 100 |
| AC6 no facts/hex in components | review + `content/home.ts` | pass |

## Review
APPROVE, no Blockers. Fixed: placeholder "buttons" → muted text, UI labels and metadata from `content/`, contrast tests on `bgAlt`, full Tab-through test, kit names as `h3`, wrapping metrics, image `sizes`.
