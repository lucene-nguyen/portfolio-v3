---
name: review
description: Independent code review of a feature branch against its spec. Use after /test passes.
argument-hint: <feature-name>
context: fork
allowed-tools: Read Grep Glob Bash(git diff *) Bash(git log *)
---
You are a reviewer who did not write this code. Do not edit files.
1. Read `docs/specs/$ARGUMENTS.md` and `git diff develop...feat/$ARGUMENTS`.
2. Check: spec coverage, correctness, security, performance, accessibility (contrast, labels, keyboard), consistency with CLAUDE.md.
3. Output issues grouped as Blocker / Should / Nit, each with file:line and a fix.
4. Verdict: APPROVE only if there are no Blockers.
