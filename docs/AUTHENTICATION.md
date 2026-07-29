# Authentication

referr uses [Auth.js (NextAuth v5)](https://authjs.dev) with the Credentials provider.

## Local setup

1. Copy `.env.example` to `.env.local`
2. Set a long random `AUTH_SECRET` (e.g. `openssl rand -base64 32`)
3. Keep `AUTH_DEMO_MODE=true` until SMTP is configured
4. Run `npm run build` / `npm start` or `npm run demo`

User records are stored in `.data/users.json` (gitignored). This is a **demo baseline**, not a production multi-tenant database.

## Flows

| Route | Purpose |
| --- | --- |
| `/account-aanmaken` | Registration (name, email, password, terms, optional marketing) |
| `/email-bevestigen` | Email verification (token) |
| `/inloggen` | Login |
| `/wachtwoord-vergeten` | Password reset request |
| `/wachtwoord-herstellen` | Password reset completion |
| `/account` | Privacy Center |

## Security notes

- Passwords hashed with bcrypt (cost 12)
- Verification/reset tokens stored as SHA-256 hashes, single-use, time-limited
- Rate limiting on register, login, reset, verify, export
- Generic error messages to reduce account enumeration
- Middleware protects private routes; admin requires `role === "admin"`
- Sessions: JWT via Auth.js HttpOnly cookies (7-day maxAge)

## Not yet production-ready

- SMTP transactional email (demo links shown in UI when `AUTH_DEMO_MODE=true`)
- Persistent session store / logout-all-devices
- Passkeys / MFA
- Multi-instance rate limiting (in-memory only)
- Per-user server-side referral data (ScoutContext remains client mock)
