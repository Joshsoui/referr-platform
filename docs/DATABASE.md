# PostgreSQL (Supabase) for referr accounts, challenges and tips

## Correct Supabase connection for Render

In Supabase → **Connect** → choose **Session pooler** (not Direct).

Copy the URI and set **both** on Render:

- `DATABASE_URL` = Session pooler URI
- `DIRECT_URL` = same Session pooler URI

Why not Direct? Direct uses IPv6 by default; Render often cannot connect → PrismaClient errors on `/account`.

Optional (serverless-style pooling):

- `DATABASE_URL` = Transaction pooler (port **6543**) + `?pgbouncer=true`
- `DIRECT_URL` = Session pooler (port **5432**)

## Deploy

1. Set `DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `ADMIN_BOOTSTRAP_TOKEN` on Render
2. Deploy latest `main`
3. Build runs `prisma migrate deploy` and creates tables
4. Register at `/account-aanmaken` (referrers) or `/account-aanmaken/beheerder` (staff, needs invite code = `ADMIN_BOOTSTRAP_TOKEN`)

Without a working DB URL the app falls back to local JSON files (not durable on Render free).
