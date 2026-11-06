# Round 3: Experience, full and verbatim (LEARNING-183)

Status: Approved (self-approved, autonomous mode)

## Goal
Recruiters see the owner's complete experience, word for word from the resume, plus certifications and a working "Download CV" link.

## Scope
- Source of truth: `docs/resume/resume-source.txt`. Every experience bullet and its "→" result line is copied word for word.
- Only these typo fixes are applied: ".." → "." · "Nodejs" → "Node.js" · "→ Enable the backend" → "→ Enabled the backend" · "IOS" → "iOS" · "Long Chau’s" → "Long Châu’s" · "9/2025" → "09/2025".
- Structure:
  - **FPT Software** (03/2024 – 07/2026), with three projects:
    - Software Engineer, 01/2026 – 07/2026, Australian clients (data processing on AWS)
    - Software Engineer, 09/2025 – 12/2025, Japanese clients (AI, Databricks)
    - Software Engineer – FPT Retail – Long Châu Pharmacy, 03/2024 – 09/2025
  - **NEOX** (Fintech, 08/2022 – 03/2024)
  - **Faboshop** (E-commerce, 01/2021 – 08/2022)
- No internal project codes (YMTWMS25, AI1.SOL.RENESAS). All bullets are shown; there is no "Show more".
- Technology tags per entry, taken only from words in that entry's bullets.
- A "Certifications" block with both certificates and their URLs, exactly as in the resume.
- Experience stays English on `/vi` (applies once LEARNING-168 lands).
- `profile.resumeUrl` is the owner's Google Drive link. The label is "Download CV" ("Tải CV" in VI). It opens in a new tab with `rel="noopener noreferrer"`, and replaces the hidden placeholder in the hero and the nav.
- The one-line role `summary` stays for the theme extras (manga, timeline, map) that are locked anyway.

## Acceptance criteria
- AC1: Every experience bullet and "→" result, after the listed fixes, appears on the page exactly (unit test), and each one also appears in the resume source after the same fixes.
- AC2: The structure, periods and titles are as above. No project code appears on the page.
- AC3: Every tag of an entry occurs in that entry's bullets.
- AC4: Certifications are shown with their exact names and URLs.
- AC5: The hero and nav show "Download CV", linking to the Drive URL with `target="_blank"` and `rel="noopener noreferrer"`.
- AC6: axe is clean, there is no horizontal scroll at 375px, lint, typecheck, unit and E2E tests pass, and screenshots are taken at 1440 and 375.
