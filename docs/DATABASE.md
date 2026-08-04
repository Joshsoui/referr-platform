# PostgreSQL for referr accounts, challenges and tips
#
# 1. Create a Postgres database (Render Postgres, Neon free, Supabase, etc.)
# 2. Copy the connection string into Render env var DATABASE_URL
# 3. Deploy — `prisma migrate deploy` runs during render-build
#
# With DATABASE_URL set:
# - Account registration persists across redeploys
# - Manual challenges + tips persist in Postgres
#
# Without DATABASE_URL the app falls back to local JSON files (fine for local
# development only — not durable on Render free).
