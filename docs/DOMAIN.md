# Custom domain: www.referr.nl

The platform app stays on Render (`referr-platform.onrender.com`).  
`referr.nl` / `www.referr.nl` show a branded **coming soon** page (large animated logo).

## TransIP → Render

1. In Render → your web service → **Custom Domains** → add `www.referr.nl` (and optionally `referr.nl`)
2. In TransIP DNS for `referr.nl`, add the records Render shows (usually CNAME for `www` → `referr-platform.onrender.com`, and either ALIAS/ANAME or redirect for apex)
3. Wait for TLS to become active on Render

## Behaviour

- Hosts `referr.nl` and `www.referr.nl` rewrite every page to `/coming-soon`
- Preview on the app host: `https://referr-platform.onrender.com/coming-soon`
- Override hosts with env `COMING_SOON_HOSTS=referr.nl,www.referr.nl` (comma-separated)

When you go live on this domain, remove the hosts from `COMING_SOON_HOSTS` / defaults in middleware and point `NEXT_PUBLIC_SITE_URL` / `AUTH_URL` to `https://www.referr.nl`.
