# Case study pages with MDX (LEARNING-144)

Status: Approved (self-approved, autonomous mode)

## Goal
One page per case study at `/work/[slug]`, rendered from MDX in `content/work/`.

## Scope
- `@next/mdx` with `mdx-components.tsx` (token-styled typography) and dynamic `import()` of `content/work/<slug>.mdx`; `generateStaticParams` + `dynamicParams = false`.
- Three studies: `pharmacy-inventory` (Redis), `ai-image-pipeline` (Databricks), `aws-file-ingestion` (S3/Lambda).
- Page header (meta, title, summary, metrics, tags) comes from the same `work.items` that feed the home cards; MDX holds the body.
- `ArchitectureDiagram` component: English labels, Lucide technology icons, rendered as an ordered list (readable without visuals).

## Out of scope
Per-page OG images (LEARNING-145). Owner-written depth for unknown facts.

## Acceptance criteria
- AC1: Given each slug, then `/work/<slug>` returns 200 with an `h1` equal to the home card title.
- AC2: Given each study, then its `h2`s are, in order: Context, Problem, Constraints, Architecture, Decisions & trade-offs, Results, Learnings.
- AC3: Given each study, then the Architecture section has a diagram (`figure`) whose nodes are list items with English labels and an icon.
- AC4: Given the NDA rule, then client names are generalized ("Japanese client", "Australian client").
- AC5: Given the home page, then each "Read case study" link opens the matching page.
- AC6: Given an unknown slug, then 404.
- AC7: Given a case study page, then axe reports no violations and there is no horizontal scroll at 375px.

## Technical notes
- Only facts from the owner's approved mockup are stated; every unknown is `[PLACEHOLDER]`.

## Risks
- Most of the narrative is `[PLACEHOLDER]` until the owner writes it.
