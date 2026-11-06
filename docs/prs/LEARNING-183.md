# LEARNING-183: Round 3, Experience, full and verbatim

Branch: `feat/LEARNING-183-experience` → `develop` · Spec: [docs/specs/LEARNING-183.md](../specs/LEARNING-183.md) · Source: `docs/resume/resume-source.txt` (now in the repo)

## What changed
- Experience shows every bullet and its "→" result from the resume, word for word. Only the six owner-listed typo fixes are applied: "..", "Nodejs", "Enable the backend", "IOS", "Long Chau’s" and "9/2025".
- Structure:
  - **FPT Software** (03/2024 – 07/2026), with three projects: Australian clients (data processing on AWS); Japanese clients (AI, Databricks); FPT Retail – Long Châu Pharmacy.
  - **NEOX** (Fintech).
  - **Faboshop** (E-commerce).
- No internal project codes. Every bullet is shown, with no "show more". Tags per entry come only from words in that entry's bullets.
- A **Certifications** block lists the Udacity Cloud Developer Certificate and AWS Certified Developer – Associate (DVA-C02), with their URLs exactly as in the resume.
- **Download CV** in the hero and nav links to the owner's Drive file. It opens in a new tab (`rel="noopener noreferrer"`) and tells screen readers so.
- The "→" is decorative (`aria-hidden`). Each tag list is named after its company, project and period.
- The UI sweep honours the theme lock: only Night terminal is shot while themes are locked.

## Tests
- `content/experience.test.ts`:
  - each bullet and its result appear together in the cleaned resume, and each result ends where the resume's does, so a shortened line fails;
  - every bullet and result renders on the page exactly;
  - the structure and periods are as specified;
  - no project codes appear;
  - tags match by whole word;
  - both certificates appear with their exact URLs.
- An E2E test checks the Download CV link (href, `target`, `rel`).
- 58 E2E pass and 14 skip (themes locked). 275 unit tests pass. Lint and typecheck are clean.
- Screenshots: `docs/screenshots/night-terminal/` at 1440 and 375.

## ui-ux-pro-max
- `"resume experience timeline" --domain landing` returned 0 results, and the retry matched only weakly (Portfolio Grid, Content First), so nothing was adopted from it.
- ux: Line Length was applied (bullets at most 70ch). Truncation was rejected: the owner wants every bullet shown.

## Review
APPROVE. The reviewer independently checked all 34 bullets against the resume, including the Faboshop page-3 pairing.
- **Shoulds applied:** a strict verbatim test (no shortening), whole-word tag checks, distinct accessible names for the tag lists, and the arrow hidden from screen readers.
- **Left as is:** the certification links open in the same tab (they're ordinary references). The Drive `/view` link opens a viewer, not a download, but "Download CV" is the owner's label.
