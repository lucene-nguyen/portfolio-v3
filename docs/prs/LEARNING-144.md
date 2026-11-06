# feat(work): case study pages with MDX (LEARNING-144)

Jira: LEARNING-144 · Spec: [docs/specs/LEARNING-144-case-studies.md](../specs/LEARNING-144-case-studies.md)

## Summary
- `@next/mdx` + `mdx-components.tsx` (token-styled typography); `/work/[slug]` statically generated from `content/work/<slug>.mdx` (`dynamicParams = false`).
- Studies: `pharmacy-inventory`, `ai-image-pipeline`, `aws-file-ingestion`, each Context → Problem → Constraints → Architecture → Decisions & trade-offs → Results → Learnings.
- `ArchitectureDiagram`: English labels, Lucide technology icons, rendered as ordered lists (readable without visuals).
- Header data (title, metrics, tags) from the same `work.items` as the home cards. Title template `%s — <name>`.

## Owner: please fill in
Only facts from your approved mockup are stated. Every `[PLACEHOLDER]` in `content/work/*.mdx` needs your input (problems before, constraints, decision details, primary database, queue tech, JSON dataset storage, p95 latency, hours saved, learnings).
NDA check: the Experience section names "Long Châu Pharmacy" (from your mockup); case study pages use generalized wording. Confirm that name may be public.

## Data changes
None.

## Tests
| AC | Test | Result |
|---|---|---|
| AC1 200 + h1 | `e2e/case-studies.spec.ts` | pass |
| AC2 section order | `content/work/structure.test.ts` + e2e | pass |
| AC3 diagram nodes with icons | e2e (svg per node) | pass |
| AC4 generalized clients | `structure.test.ts` | pass |
| AC5 home cards → pages (all 3) | e2e | pass |
| AC6 404 | e2e | pass |
| AC7 axe + 375px (all 3) | e2e | pass |

## Review
APPROVE, no Blockers. Fixed: e2e covers all cards/slugs and every node icon, title template, `@types/mdx` as dev dependency, NDA test without hard-coded names, explained Tab-loop headroom.
