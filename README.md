# FK Scout Engine / referr

Community-powered recruiting product. Visible brand: **referr**.

## Lokaal draaien

```bash
npm install
cp .env.example .env.local
# Set AUTH_SECRET (e.g. openssl rand -base64 32)
npm run build && npm start
# or: ./start.sh
```

Open **http://localhost:3000** (or the port from `start.sh`).

Auth & privacy docs: [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md) · [docs/PRIVACY_DATA_MAP.md](docs/PRIVACY_DATA_MAP.md) · [docs/COOKIE_INVENTORY.md](docs/COOKIE_INVENTORY.md) · [docs/SECURITY_CHECKLIST.md](docs/SECURITY_CHECKLIST.md)

## Naar GitHub pushen

```bash
cd ~/finderz-keeperz-scout-engine

# Eerste keer
git add .
git commit -m "FK Scout Engine MVP prototype"
gh repo create fk-scout-engine --public --source=. --push

# Of koppel een bestaande repo
git remote add origin https://github.com/JOUW-USERNAME/fk-scout-engine.git
git push -u origin main
```

## Online deployen

### Optie A: Vercel (aanbevolen — gratis, 2 minuten)

1. Push naar GitHub (zie hierboven)
2. Ga naar [vercel.com](https://vercel.com) → **Add New Project**
3. Importeer je GitHub repo
4. Vercel detecteert Next.js automatisch
5. Klik **Deploy**

Je krijgt een URL zoals `https://fk-scout-engine.vercel.app`

### Optie B: Render (gratis tier)

1. Push naar GitHub (private repo werkt ook)
2. Ga naar [render.com](https://render.com) → **New +** → **Web Service**
3. Koppel je GitHub account en selecteer `fk-scout-engine`
4. Render vult automatisch in:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Kies **Free** plan → **Create Web Service**

Je krijgt een URL zoals `https://fk-scout-engine.onrender.com`

> Op de free tier slaapt de app na 15 min inactiviteit — eerste bezoek kan ~30 sec duren om op te starten.

Of gebruik de meegeleverde `render.yaml` via **New +** → **Blueprint**.

### Optie C: Eigen server (VPS)

Vereisten: Node.js 18+, nginx (optioneel)

```bash
# Op de server
git clone https://github.com/JOUW-USERNAME/fk-scout-engine.git
cd fk-scout-engine
npm install
npm run build

# Draaien met PM2
npm install -g pm2
PORT=3000 pm2 start npm --name "fk-scout" -- start
pm2 save
```

Nginx reverse proxy (optioneel):

```nginx
server {
    listen 80;
    server_name jouwdomein.nl;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

## Pagina's

| Route | Beschrijving |
|-------|-------------|
| `/` | Publieke landing |
| `/inloggen` · `/account-aanmaken` | Auth |
| `/vacatures` | Vacatures |
| `/dashboard` | Home (ingelogd) |
| `/aandragen` | Introducties |
| `/account` | Privacycentrum |
| `/privacy` · `/cookies` · `/voorwaarden` · `/beveiliging` | Legal |

## Tech stack

- Next.js 15 + TypeScript + Tailwind CSS + Auth.js
- Demo user store in `.data/` (geen productie-DB)
- Lucide React icons
