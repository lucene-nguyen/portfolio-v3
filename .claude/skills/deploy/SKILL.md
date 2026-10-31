---
name: deploy
description: Open a PR, verify the Vercel preview, and ship to production.
argument-hint: <feature-name>
disable-model-invocation: true
---
1. Confirm /review verdict was APPROVE. If not, stop.
2. Push `feat/$ARGUMENTS` and draft the PR description (summary, Jira key, spec link, data changes included, test results).
   If the PR has data changes, list them and tell the owner the Architect must apply them to prod before merge. Never change prod data yourself.
3. Wait for the Vercel preview URL; smoke-test the acceptance criteria there.
4. Ask the user for explicit OK. Only then merge to main (production deploy).
5. Set the spec Status to Shipped.
