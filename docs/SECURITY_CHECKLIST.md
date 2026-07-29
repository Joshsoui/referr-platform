# Security checklist

## Implemented baseline

- [x] Auth.js sessions (HttpOnly cookies)
- [x] bcrypt password hashing
- [x] Hashed, single-use, expiring verify/reset tokens
- [x] Rate limiting (in-memory) on sensitive actions
- [x] Enumeration-resistant generic messages
- [x] Middleware route protection + admin role check
- [x] Security headers (CSP starter, nosniff, referrer-policy, frame deny, HSTS in production)
- [x] Private pages `no-store` / robots disallow
- [x] No optional trackers before consent (none present)
- [x] Structured auth actions without logging secrets

## Required before production

- [ ] Confirm HTTPS termination and HSTS
- [ ] Replace file user store with managed database
- [ ] Configure SMTP + SPF/DKIM/DMARC
- [ ] Distributed rate limiting
- [ ] Independent penetration test
- [ ] Legal review of privacy/terms placeholders
- [ ] MFA for administrators
- [ ] Audit log sink with retention policy
- [ ] Tighten CSP (remove unsafe-inline/eval where possible)
- [ ] Per-user authorization on all server resources (beyond demo mocks)

This is a privacy- and security-focused technical baseline. Final legal review, infrastructure configuration and independent security testing remain required before production launch.
