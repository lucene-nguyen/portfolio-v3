# Deploy (Vercel)

Status: **on hold** (LEARNING-146). This page lists what the owner sets in Vercel before the first deploy. Nothing here is deployed by Claude Code.

## Environment variables (today)

Vercel → Project → Settings → Environment Variables.

| Variable | Production | Preview | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **required**: `https://<your-domain>` | leave empty | Used for the canonical URL, sitemap and OG. Unset, it falls back to the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), so preview canonicals point at Production, which is fine for previews. |

That's all. Visitors send the contact message from their own mailbox (LEARNING-188), and the lab is parked. Nothing on the site uses Redis, a salt or email delivery, so **Production needs no Upstash, `RL_SALT`, `REDIS_KEY_PREFIX` or Resend**. The server guards are lazy: they are read only on parked code paths, and the build and every page work with none of them set. A unit test (`lib/prod-env.test.tsx`) renders the page in production mode with an empty env.

## Parked: only needed if a server feature is turned back on

Set these only together with the flag that needs them (`NEXT_PUBLIC_FEATURE_CONTACT_SERVER` or `NEXT_PUBLIC_FEATURE_LAB`):

| Variable | Production | Preview | Notes |
|---|---|---|---|
| `UPSTASH_REDIS_REST_URL` | ✔ | ✔ (same value) | One free Upstash database serves both environments. |
| `UPSTASH_REDIS_REST_TOKEN` | ✔ (secret) | ✔ (same value) | |
| `REDIS_KEY_PREFIX` | `prod` | `preview` | Required in Production, where it must be `prod`; otherwise requests that use Redis fail with a clear error. Preview defaults to `preview` and refuses `prod`. It keeps both environments' keys apart in the shared database. |
| `RL_SALT` | ✔ (long random string, secret) | ✔ (a different random string) | Required in Production. It hashes visitor IPs for rate limiting. Preview falls back to the public dev salt if unset (owner decision), so set it there too. |
| `RESEND_API_KEY` | optional (secret) | optional | Server contact delivery only. Without it, messages are only logged and stored in Redis. |
| `RESEND_FROM` | optional | optional | A sender on a domain verified in Resend. The default is Resend's `onboarding@resend.dev`. |
| `GITHUB_TOKEN` | optional (no scopes) | optional | Raises the GitHub API limit, used by the Dashboard theme only (locked). |

Generate a salt locally, for example: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

## Feature flags: leave them all unset (off)

These are build-time flags. They must **not** be set in Production or Preview, so the site ships only what is ready:

| Flag | Off means |
|---|---|
| `NEXT_PUBLIC_FEATURE_THEMES` | Night terminal only, with no theme switcher. |
| `NEXT_PUBLIC_FEATURE_CASE_STUDIES` | Case studies parked: `/work/*` is noindex, and there are no links to them. |
| `NEXT_PUBLIC_FEATURE_LAB` | Live rate-limiting lab parked. |
| `NEXT_PUBLIC_FEATURE_WORK_WITH_ME` | Work with me section parked; the hero shows "Contact me". |
| `NEXT_PUBLIC_FEATURE_CONTACT_SERVER` | The contact form opens a panel to send from the visitor's own mailbox (Gmail, Outlook, default app, copy); the server action refuses requests. |

## Changing secrets later (parked features only)
- Rotating `RL_SALT` resets everyone's rate-limit windows: visitor ids change.
- Changing `REDIS_KEY_PREFIX` moves new data to new key names. Old rate-limit keys and stored contact messages stay under the old prefix until they expire or you delete them.

## After the first deploy (owner)
- Open the site. The contact form's "Send message" opens the send panel, and each option opens a draft to `manhcuongmvc@gmail.com`.
- `/sitemap.xml` and the canonical URL use your domain (`NEXT_PUBLIC_SITE_URL`).
