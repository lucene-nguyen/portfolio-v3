# CI

Workflow: `.github/workflows/ci.yml`.

| Job | Runs on | Steps |
|---|---|---|
| `checks` | push to main/develop, every PR | `npm ci`, lint, typecheck, unit tests, build |
| `e2e` | pull requests | Playwright against a production build |

## Branch protection (owner action, needs repo admin)
GitHub → Settings → Branches → Add rule for `main`:
- Require a pull request before merging
- Require status checks to pass: `checks`, `e2e`
- Require branches to be up to date before merging

Or with the GitHub CLI:
```bash
gh api -X PUT repos/lucene-nguyen/portfolio-v3/branches/main/protection \
  -F required_status_checks[strict]=true \
  -f 'required_status_checks[contexts][]=checks' -f 'required_status_checks[contexts][]=e2e' \
  -F enforce_admins=false -F required_pull_request_reviews[required_approving_review_count]=0 \
  -F restrictions=null
```
