# Authentication

referr uses [Auth.js (NextAuth v5)](https://authjs.dev) with the Credentials provider.

## Local setup

1. Set a long random `AUTH_SECRET` (e.g. `openssl rand -base64 32`)
2. For real email: set `RESEND_API_KEY` + `EMAIL_FROM`, then `AUTH_DEMO_MODE=false`
3. Without email config, keep `AUTH_DEMO_MODE=true` (links shown in UI)

## Transactional email

Supported providers (first match wins):

1. **Resend** — `RESEND_API_KEY` (+ optional `EMAIL_FROM`)
2. **SMTP** — `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, optional `SMTP_PORT` / `SMTP_SECURE`

Mails sent:

- Account aangemaakt → e-mailbevestiging (`/email-bevestigen?token=…`)
- Wachtwoord vergeten → resetlink (`/wachtwoord-herstellen?token=…`)
- Opnieuw versturen vanaf dashboard/e-mail-bevestigen

### Resend (aanbevolen)

1. Account op [resend.com](https://resend.com)
2. API key aanmaken
3. Domain verifiëren (of tijdelijk `EMAIL_FROM=referr <onboarding@resend.dev>` alleen naar je eigen inbox)
4. Render env:
   - `RESEND_API_KEY=re_...`
   - `EMAIL_FROM=referr <noreply@jouwdomein.nl>`
   - `AUTH_DEMO_MODE=false`
   - `NEXT_PUBLIC_SITE_URL=https://referr-platform.onrender.com`
5. Redeploy

## Flows

| Route | Purpose |
| --- | --- |
| `/account-aanmaken` | Registration (referrers) |
| `/account-aanmaken/beheerder` | Staff registration (admin/recruiter) with invite code |
| `/email-bevestigen` | Email verification |
| `/inloggen` | Login (`?mode=partner` for staff) |
| `/wachtwoord-vergeten` | Password reset request |
| `/wachtwoord-herstellen` | Password reset completion |
| `/account` | Privacy Center |

### Beheerder / partner account

1. Set `ADMIN_BOOTSTRAP_TOKEN` on Render (long random string)
2. Open `/account-aanmaken/beheerder` (also linked from partner login)
3. Enter the invite code (= that env token), choose Admin or Recruiter, register
4. Confirm email if required, then log in via **Ik beheer challenges**
5. Optional fallback: `POST /api/admin/bootstrap` to promote an existing user

## Security notes

- Passwords hashed with bcrypt (cost 12)
- Verification/reset tokens stored as SHA-256 hashes, single-use, time-limited
- Rate limiting on register, login, reset, verify, export
- Generic error messages to reduce account enumeration
- Middleware protects private routes; admin/recruiter for `/admin` and `/recruitment`
