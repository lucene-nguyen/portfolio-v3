---
name: implement
description: Implement an approved feature spec. Use after /spec is approved.
argument-hint: <feature-name>
---
1. Read `docs/specs/$ARGUMENTS.md`. Stop if Status is not Approved.
2. Create branch `feat/$ARGUMENTS`.
3. Implement one acceptance criterion at a time; commit after each.
4. For UI work, use the ui-ux-pro-max skill.
5. If stored data changes: add a versioned script in `scripts/data/` and run `npm run data:dev` against the **dev** database only.
6. Run `npm run lint` and `npm run typecheck`; fix all errors.
7. Then suggest `/test $ARGUMENTS`.
