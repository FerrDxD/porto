# Production Runbook & Operations

## 1. Deployment Architecture

- **Platform:** Vercel (Edge Network + Serverless Node.js 18/20 runtime)
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`) gates PRs with `lint`, `typecheck`, `test`, `build`.
- **Preview Deployments:** Automatic per branch / PR via Vercel GitHub App.
- **Production Gate:** Merge to `main` deploys to production only after CI passes.

## 2. Environment Variables

Configure in Vercel Project Settings > Environment Variables:

| Variable                         | Target                | Description                                           |
| -------------------------------- | --------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`   | Production/Preview    | Umami Analytics tracking ID                           |
| `NEXT_PUBLIC_UMAMI_URL`          | Production/Preview    | Umami Analytics host URL                              |
| `RESEND_API_KEY`                 | Production            | API key for `/api/contact` email notifications        |
| `CONTACT_TO_EMAIL`               | Production            | Destination mailbox for submissions                   |
| `CONTACT_FROM_EMAIL`             | Production            | Verified sender address (e.g. `portfolio@ferdi.dev`)  |
| `SENTRY_DSN`                     | Production/Preview    | Sentry DSN for server-side error capturing            |
| `NEXT_PUBLIC_SENTRY_DSN`         | Production/Preview    | Sentry DSN for client-side boundary errors            |
| `KEYSTATIC_GITHUB_CLIENT_ID`     | Production (Optional) | Keystatic GitHub App Client ID for production editing |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Production (Optional) | Keystatic GitHub App Secret                           |
| `KEYSTATIC_SECRET`               | Production (Optional) | Cookie encryption key for Keystatic auth              |

## 3. Security & Headers

Headers are enforced via `next.config.mjs`:

- **CSP:** Strict self origin with scoped CDN (`cdn.21st.dev`), GitHub avatars/API, and Resend/Sentry APIs.
- **HSTS:** `max-age=63072000; includeSubDomains; preload`
- **Clickjacking:** `X-Frame-Options: DENY`, `frame-ancestors: 'none'`
- **MIME Sniffing:** `X-Content-Type-Options: nosniff`

## 4. Rate Limiting & Anti-Abuse

- Endpoint: `/api/contact`
- Mechanism: Sliding-window memory rate limiter (`lib/rate-limit.ts`)
- Limit: 5 requests / 60 seconds per IP
- Bot trap: Honeypot field `honeypot` silently rejects automated form scripts with HTTP 400.
- Scaling upgrade: If scaling across multiple serverless clusters, swap in-memory Map for Upstash Redis.

## 5. Incident Response & Rollback

- **Instant Rollback:**
  1. Open Vercel Dashboard > Project > Deployments.
  2. Locate previous known-good deployment.
  3. Click `...` > **Promote to Production** (instant zero-downtime traffic switch).
- **Git Rollback:**
  ```bash
  git revert HEAD
  git push origin main
  ```
- **Error Diagnostics:**
  - Client crashes: Captured via `app/error.tsx` & `app/global-error.tsx`.
  - API errors: Structured JSON logs in Vercel Function logs + dispatched to Sentry endpoint.

## 6. Admin Panel (Keystatic Git-Based CMS)

- **Local Access:**
  1. Run `bun dev` (or `npm run dev`).
  2. Open `http://localhost:3000/keystatic`.
  3. Edit any collection (Projects, Skills, Experience, Testimonials, /now page). Changes write directly to `content/data/*.json`.
- **Production Mode (Vercel):**
  - Uses GitHub Mode to commit directly to repository when `KEYSTATIC_GITHUB_CLIENT_ID` is set.
