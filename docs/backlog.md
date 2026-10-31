# Backlog (autonomous run order)

Status: `todo` | `doing` | `done` | `blocked: <reason>`
Work top to bottom. One task = one branch `feat/<KEY>-<slug>` merged into `develop`.

| #  | Jira         | Task                                                                    | Status            |
| -- | ------------ | ----------------------------------------------------------------------- | ----------------- |
| 1  | LEARNING-139 | Initialize Next.js project with tooling                                 | done |
| 2  | LEARNING-140 | CI with GitHub Actions                                                  | blocked: branch protection on main needs repo admin (workflow merged) |
| 3  | LEARNING-147 | Theme engine (ThemeDefinition, data-theme, lazy features, switcher)     | done |
| 4  | LEARNING-141 | Home page from mockup (content in `content/`)                         | done |
| 5  | LEARNING-148 | Theme 01 Night terminal (default) + command bar                         | done |
| 6  | LEARNING-142 | Rate limiter `/api/ping` (Redis; in-memory fallback when env missing) | done |
| 7  | LEARNING-143 | Live lab UI                                                             | done |
| 8  | LEARNING-144 | Case study pages (MDX, 3 studies, `[placeholders]` for unknown facts) | done |
| 9  | LEARNING-152 | Theme 05 Blueprint + system map                                         | todo              |
| 10 | LEARNING-159 | Theme 12 Pixel + mana bar, achievements                                 | todo              |
| 11 | LEARNING-158 | Theme 11 Cyberpunk + HUD lab                                            | todo              |
| 12 | LEARNING-149 | Theme 02 Editorial + reading mode                                       | todo              |
| 13 | LEARNING-150 | Theme 03 Swiss minimal + print CV                                       | todo              |
| 14 | LEARNING-156 | Theme 09 Docs + search                                                  | todo              |
| 15 | LEARNING-157 | Theme 10 Dashboard + live metrics                                       | todo              |
| 16 | LEARNING-151 | Theme 04 IDE layout                                                     | todo              |
| 17 | LEARNING-153 | Theme 06 Bento grid                                                     | todo              |
| 18 | LEARNING-154 | Theme 07 Neo-brutalism                                                  | todo              |
| 19 | LEARNING-160 | Theme 13 Anime (placeholder art, no copyrighted characters)             | todo              |
| 20 | LEARNING-155 | Theme 08 3D world                                                       | todo              |
| 21 | LEARNING-145 | SEO: metadata, sitemap, OG                                              | todo              |
| 22 | LEARNING-146 | Deploy to Vercel                                                        | owner + Architect |

Acceptance criteria for each task: the Jira issue (copied into its spec in `docs/specs/`).
