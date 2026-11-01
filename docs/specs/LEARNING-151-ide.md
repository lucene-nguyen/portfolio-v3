# Theme 04: IDE / VS Code + file explorer layout (LEARNING-151)

Status: Approved (self-approved, autonomous mode)

## Goal
An editor-style layout where site sections open as files in tabs, without turning content into code.

## Scope
- Design rules persisted with ui-ux-pro-max: `design-system/portfolio-v3/pages/ide.md`.
- `themes/ide/files.ts`: sections → files (each maps to an existing page or anchor).
- `themes/ide/layout.tsx`: explorer (sidebar / mobile drawer), open-editor tabs (links + close buttons, session-persisted), path line, Ctrl/⌘K "Go to file" palette.

## Acceptance criteria
- AC1: `design-system/portfolio-v3/pages/ide.md` exists with the exact tokens.
- AC2: Explorer links, tab links and tab close buttons are keyboard-operable; tabs are real `<a href>` links, so any file is deep-linkable (e.g. `/work/<slug>?theme=ide` opens with that tab active).
- AC3: Ctrl/⌘K opens the palette; typing filters; Enter opens the file; Esc closes.
- AC4: Below 768px the explorer is a drawer; no horizontal scroll at 375px.
- AC5: Content stays readable prose (Inter Tight paragraphs, no code-block rendering); contrast ≥ 4.5:1; axe clean.
