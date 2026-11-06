# Backlog (autonomous run order)

Status: `todo` | `doing` | `done` | `blocked: <reason>`
Work top to bottom. One task = one branch `feat/<KEY>-<slug>` merged into `develop`.

| #  | Jira         | Task                                                                    | Status            |
| -- | ------------ | ----------------------------------------------------------------------- | ----------------- |
| 1  | LEARNING-139 | Initialize Next.js project with tooling                                 | done |
| 2  | LEARNING-140 | CI with GitHub Actions                                                  | blocked: gh CLI not installed on implementer PC; owner applies branch protection on main (docs/ci.md) and confirms CI runs (Actions tab) |
| 3  | LEARNING-147 | Theme engine (ThemeDefinition, data-theme, lazy features, switcher)     | done |
| 4  | LEARNING-141 | Home page from mockup (content in `content/`)                         | done |
| 5  | LEARNING-148 | Theme 01 Night terminal (default) + command bar                         | done |
| 6  | LEARNING-142 | Rate limiter `/api/ping` (Redis; in-memory fallback when env missing) | done |
| 7  | LEARNING-143 | Live lab UI                                                             | done |
| 8  | LEARNING-144 | Case study pages (MDX, 3 studies, `[placeholders]` for unknown facts) | done |
| 9  | LEARNING-152 | Theme 05 Blueprint + system map                                         | done |
| 10 | LEARNING-159 | Theme 12 Pixel + mana bar, achievements                                 | done |
| 11 | LEARNING-158 | Theme 11 Cyberpunk + HUD lab                                            | done |
| 12 | LEARNING-149 | Theme 02 Editorial + reading mode                                       | done |
| 13 | LEARNING-150 | Theme 03 Swiss minimal + print CV                                       | done |
| 14 | LEARNING-156 | Theme 09 Docs + search                                                  | done |
| 15 | LEARNING-157 | Theme 10 Dashboard + live metrics                                       | done |
| 16 | LEARNING-151 | Theme 04 IDE layout                                                     | done |
| 17 | LEARNING-153 | Theme 06 Bento grid                                                     | done |
| 18 | LEARNING-154 | Theme 07 Neo-brutalism                                                  | done |
| 19 | LEARNING-160 | Theme 13 Anime (placeholder art, no copyrighted characters)             | done |
| 20 | LEARNING-155 | Theme 08 3D world                                                       | done |
| 21 | LEARNING-145 | SEO: metadata, sitemap, OG                                              | done |
| 22 | LEARNING-146 | Deploy to Vercel                                                        | owner + Architect |
| 23 | LEARNING-164 | Round 2: home structure and copy (case studies + lab behind a flag)   | done |
| 24 | LEARNING-165 | Round 2: Skills with icons (replaces stack.json)                        | done |
| 25 | LEARNING-166 | Round 2: Work with me (services + how I work)                           | done |
| 26 | LEARNING-167 | Round 2: Contact form (validation, honeypot, rate limit, local delivery)| done |
| 27 | LEARNING-168 | Round 2: English / Vietnamese (owner approves VI before merge)          | done |
| 28 | LEARNING-184 | Round 3: lock themes to Night terminal (NEXT_PUBLIC_FEATURE_THEMES) | done |
| 29 | LEARNING-183 | Round 3: Experience full and verbatim from the resume; Download CV  | done |

Acceptance criteria for each task: the Jira issue (copied into its spec in `docs/specs/`).
