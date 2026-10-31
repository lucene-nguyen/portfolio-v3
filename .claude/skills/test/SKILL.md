---
name: test
description: Write and run tests for a feature against its acceptance criteria. Use after /implement.
argument-hint: <feature-name>
allowed-tools: Read Write Edit Grep Glob Bash(npm run test*) Bash(npm run lint) Bash(npm run typecheck) Bash(npx playwright *)
---
1. Read `docs/specs/$ARGUMENTS.md`.
2. Every acceptance criterion needs at least one test: Vitest for logic, Playwright for UI flows.
3. Run lint, typecheck, test, test:e2e. All must pass.
4. Report a table: AC → test file → pass/fail. Then suggest `/review $ARGUMENTS`.
