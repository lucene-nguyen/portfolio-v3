---
name: spec
description: Write a feature spec with acceptance criteria before any code. Use when the user starts a new feature or asks to plan one.
argument-hint: <feature-name>
---
1. Read CLAUDE.md and existing files in docs/specs/.
2. Create `docs/specs/$ARGUMENTS.md` from `templates/spec.md`.
3. Fill every section. Acceptance criteria must be testable (Given/When/Then).
4. Show the user a short summary and ask them to approve. Do NOT write code.
