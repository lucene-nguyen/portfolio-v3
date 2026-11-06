# feat(theme): Night terminal + command bar (LEARNING-148)

Jira: LEARNING-148 · Spec: [docs/specs/LEARNING-148-night-terminal.md](../specs/LEARNING-148-night-terminal.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/MASTER.md` and `pages/night-terminal.md`. The generated style was verified ("Dark Mode (OLED)", "code dark + run green"); the generated palette, all-mono body font and "documentation landing" pattern were rejected in favor of the owner's "Portfolio v3" tokens (recorded in the page file).
- `lib/terminal/commands.ts`: pure engine (`help`, `ls projects`, `cat resume`, `open <slug>`, `theme [id]`, `contact`, `clear`) + Tab completion.
- `themes/night-terminal/command-bar.tsx`: lazy theme feature. Floating "Terminal" button; native `<dialog>`; `/` or Ctrl/Cmd+K; ↑/↓ history; output in `role="log"`; focus returns to the opener.

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | `e2e/night-terminal.spec.ts` (file + tokens) | pass |
| AC2 open/close/focus | `e2e/night-terminal.spec.ts` | pass |
| AC3 completion + history | unit + e2e | pass |
| AC4 log output, errors | unit + e2e | pass |
| AC5 contact / open / theme | e2e (contact, open), unit (theme) | pass; `theme <id>` e2e when a 2nd theme exists |
| AC6 375px | e2e | pass |
| AC7 axe + focus ring | e2e | pass |

## Review
APPROVE, no Blockers. Fixed: Tab trap, floating button covering footer, `contact` output that closed instantly, modifier/IME on `/`, platform-neutral hint, history cap, Close button name.
