# feat(theme): IDE / VS Code + file explorer layout (LEARNING-151)

Jira: LEARNING-151 · Spec: [docs/specs/LEARNING-151-ide.md](../specs/LEARNING-151-ide.md)

## Summary
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/ide.md` (Developer Tool / IDE verified; code-block prose rejected).
- Sections as files (`themes/ide/files.ts`): `about.ts`, `work/README.md`, `work/<slug>.md`, `lab/rate-limiter.ts`, `kits/README.md`, `resume.json`, `contact.md` — each a real page or anchor.
- Layout: explorer (sidebar ≥ 768px, drawer below), open-editor tabs as links (deep-linkable) with close buttons and session persistence, path line, Ctrl/⌘K "Go to file" palette.
- Shared fix (`lib/dom.ts` `isTyping`): a field inside a dialog that is closing no longer blocks the `/` / Ctrl+K shortcuts; this fixed an intermittent failure in the Night terminal and Docs tests (race between Esc and the async `close` event).

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 design rules | file | pass |
| AC2 keyboard explorer/tabs/close, deep links, focus kept after close | `e2e/ide.spec.ts`, `themes/ide/files.test.ts` | pass |
| AC3 palette | e2e | pass |
| AC4 drawer, 375px | e2e | pass |
| AC5 readable prose, contrast, axe | e2e, registry tests | pass |

## Review
APPROVE, no Blockers. Fixed: focus after closing a tab (moves to the neighbouring close button / tab bar), no false `aria-current` for unknown locations (+ `work/README.md` for `/#work`), `aria-expanded` reflects matches, status region always mounted, doc contrast figure. Not done: closing the drawer when resizing past 768px (known limit).
