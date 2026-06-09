# FK Scout Engine

Gamified recruitment MVP prototype voor Finderz Keeperz.

## Lokaal draaien

```bash
npm install
./start.sh
```

Open **http://localhost:5555** in Chrome of Safari.

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

### Optie B: Eigen server (VPS)

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
| `/` | Landingpage met hero-afbeelding |
| `/dashboard` | Scout dashboard |
| `/aandragen` | Kandidaat aandragen |
| `/leaderboard` | Ranking |
| `/admin` | Statusbeheer |

## Tech stack

- Next.js 15 + TypeScript + Tailwind CSS
- Lokale state (geen backend nodig)
- Lucide React icons
