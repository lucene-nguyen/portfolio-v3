# feat(theme): theme engine (LEARNING-147)

Jira: LEARNING-147 · Spec: [docs/specs/LEARNING-147-theme-engine.md](../specs/LEARNING-147-theme-engine.md) · ADR: [0002](../adr/0002-theme-engine.md)

## Summary
- `ThemeDefinition` (`themes/types.ts`), one folder per theme, `themes/registry.ts` (first = default = Night terminal).
- Tokens rendered once as `[data-theme]` CSS in `<head>`; Tailwind colors/fonts/radius read the variables.
- Inline head script picks `?theme` > localStorage > default before first paint (Next.js "preventing flash" pattern; pages stay static).
- `ThemeProvider` (`useSyncExternalStore` on `data-theme`), `ThemeRuntime` (lazy layout + features per theme), `ThemeSwitcher` (labelled native select + live region) in the root layout outside the runtime.
- Global reduced-motion rule. Registry tests enforce WCAG 4.5:1 for every theme's text tokens.

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 content unchanged | `components/theme/theme-engine.test.tsx` | pass |
| AC2 default theme | `e2e/theme.spec.ts` | pass |
| AC3 keyboard + announce | unit (focus kept, status text) + E2E focus | pass (full keyboard switch E2E once a 2nd theme exists) |
| AC4 lazy features | `theme-engine.test.tsx` (loaders not called) | pass |
| AC5 reduced motion | `e2e/theme.spec.ts` | pass |
| AC6 add-a-folder + token checks | `themes/registry.test.ts` | pass |
| AC7 ?theme / storage / no flash | `lib/theme/css.test.ts` (script in jsdom), E2E fallback | pass |
| AC8 ADR | `docs/adr/0002-theme-engine.md` | pass |

## Review
Round 1: 1 Blocker (switcher inside remounting content lost focus/announcement) → fixed by moving it to the root layout; also font tokens made overridable, select border contrast, weak E2E removed.
Round 2: APPROVE. Follow-ups: keyboard switch + stored-theme E2E when the second theme lands.
