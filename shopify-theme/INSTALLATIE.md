# Premium Dropship Theme — Installatiehandleiding

Complete Shopify 2.0 theme voor dropshipping stores. Modern, conversiegericht en volledig aanpasbaar via de theme editor.

---

## Snelstart

### Optie A: Upload via Shopify Admin

1. Zip de map `shopify-theme` (alle mappen erin, niet de parent folder)
2. Ga naar **Shopify Admin → Online Store → Themes**
3. Klik **Add theme → Upload zip file**
4. Klik **Publish** wanneer je klaar bent

### Optie B: Shopify CLI (aanbevolen voor developers)

```bash
# Installeer Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Navigeer naar de theme map
cd shopify-theme

# Koppel aan je store
shopify theme dev --store jouw-store.myshopify.com

# Push naar productie
shopify theme push
```

---

## Theme structuur

```
shopify-theme/
├── assets/           # CSS, JavaScript
│   ├── base.css.liquid
│   ├── theme.js
│   ├── product.js
│   ├── collection.js
│   └── cart.js
├── config/           # Theme instellingen
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/
│   └── theme.liquid  # Hoofdlayout
├── locales/
│   └── nl.default.json
├── sections/         # Herbruikbare secties
├── snippets/         # Kleine herbruikbare componenten
├── templates/        # Pagina templates
└── content/          # Voorbeeldteksten voor pagina's
```

---

## Stap 1: Branding instellen

Ga naar **Online Store → Themes → Customize → Theme settings**:

| Instelling | Voorbeeld |
|------------|-----------|
| Merknaam | NordHome, GlowBeauty, FitGear |
| Logo | Upload je logo (PNG/SVG, transparant) |
| Primaire kleur | `#1a1a2e` (donkerblauw) |
| Secundaire kleur | `#c9a96e` (goud) |
| Contactgegevens | E-mail, telefoon, adres |
| USP's | Gratis verzending, retourneren, etc. |

### Kleurenpaletten per niche

| Niche | Primair | Secundair |
|-------|---------|-----------|
| Home & Living | `#2c3e50` | `#c9a96e` |
| Beauty | `#1a1a1a` | `#d4a5a5` |
| Fitness | `#0d1b2a` | `#e63946` |
| Gadgets | `#1a1a2e` | `#00b4d8` |
| Baby | `#4a5568` | `#f6ad55` |
| Huisdieren | `#2d3748` | `#48bb78` |
| Outdoor | `#1b4332` | `#95d5b2` |

---

## Stap 2: Navigatiemenu's aanmaken

Ga naar **Online Store → Navigation** en maak deze menu's:

### Main menu (`main-menu`)
- Home → `/`
- Shop → `/collections/all`
- Over ons → `/pages/over-ons`
- Contact → `/pages/contact`

### Footer Shop (`footer-shop`)
- Alle producten → `/collections/all`
- Bestsellers → `/collections/bestsellers`
- Nieuwe producten → `/collections/nieuw`

### Footer Info (`footer-info`)
- Over ons → `/pages/over-ons`
- FAQ → `/pages/veelgestelde-vragen`
- Verzending & retourneren → `/pages/verzending-retourneren`
- Contact → `/pages/contact`

### Footer Legal (`footer-legal`)
- Privacybeleid → `/pages/privacybeleid`
- Algemene voorwaarden → `/pages/algemene-voorwaarden`

Koppel de menu's in **Customize → Header** en **Customize → Footer**.

---

## Stap 3: Pagina's aanmaken

Maak deze pagina's in **Online Store → Pages**:

| Pagina | URL-handle | Template |
|--------|------------|----------|
| Over ons | `over-ons` | `page.about` |
| Contact | `contact` | `page.contact` |
| Veelgestelde vragen | `veelgestelde-vragen` | `page.faq` |
| Verzending & retourneren | `verzending-retourneren` | `page.shipping` |
| Privacybeleid | `privacybeleid` | `page.privacy` |
| Algemene voorwaarden | `algemene-voorwaarden` | `page.terms` |

> **Tip:** Voorbeeldteksten staan in `content/voorbeeld-paginas.md`. Kopieer deze naar de pagina's in Shopify Admin.

---

## Stap 4: Collecties instellen

1. Maak collecties aan: **Bestsellers**, **Nieuw**, **Uitgelicht**
2. Voeg producten toe aan collecties
3. Ga naar **Customize → Homepage**
4. Koppel collecties bij **Uitgelichte collectie** en **Bestsellers**

### Product tags voor urgency badges
- Voeg tag `bestseller` toe voor "Populair product" badge
- Stel voorraad in ≤10 voor "Beperkte voorraad" badge

---

## Stap 5: Checkout

Shopify Checkout wordt gehost door Shopify zelf. De winkelwagenpagina (`/cart`) linkt automatisch naar `/checkout`.

**Checkout aanpassen:**
- **Settings → Checkout → Customize** — voeg logo, kleuren en trust badges toe
- Zorg dat betaalmethodes actief zijn: **Settings → Payments**

---

## Alle pagina's overzicht

| # | Pagina | Template bestand | Route |
|---|--------|------------------|-------|
| 1 | Homepage | `templates/index.json` | `/` |
| 2 | Productpagina | `templates/product.json` | `/products/[handle]` |
| 3 | Collectiepagina | `templates/collection.json` | `/collections/[handle]` |
| 4 | Winkelwagen | `templates/cart.json` | `/cart` |
| 5 | Checkout | Shopify hosted | `/checkout` |
| 6 | Over ons | `templates/page.about.json` | `/pages/over-ons` |
| 7 | Contact | `templates/page.contact.json` | `/pages/contact` |
| 8 | FAQ | `templates/page.faq.json` | `/pages/veelgestelde-vragen` |
| 9 | Verzending & retour | `templates/page.shipping.json` | `/pages/verzending-retourneren` |
| 10 | Privacybeleid | `templates/page.privacy.json` | `/pages/privacybeleid` |
| 11 | Algemene voorwaarden | `templates/page.terms.json` | `/pages/algemene-voorwaarden` |

---

## Conversie-elementen

| Element | Locatie | Aanpassen via |
|---------|---------|---------------|
| USP-balk | Homepage + globaal | Theme settings → USP's |
| Urgency badges | Productkaarten | Theme settings → Conversie |
| Reviews | Homepage sectie | Customize → Reviews |
| Trust badges | Productpagina | Automatisch via USP's |
| Betaaliconen | Footer, cart, product | `snippets/payment-icons.liquid` |
| Nieuwsbrief pop-up | Alle pagina's | Theme settings → Conversie |
| Sticky add-to-cart | Productpagina (mobiel) | Automatisch |
| Gratis verzending drempel | Cart + product | Theme settings → Conversie |

---

## SEO

- **Meta tags:** Automatisch via `snippets/meta-tags.liquid`
- **Product schema:** `snippets/schema-product.liquid` (JSON-LD)
- **H1/H2:** Logische heading-structuur per pagina
- **Alt-teksten:** Via productafbeeldingen in Shopify Admin
- **URLs:** Gebruik korte handles (`/products/wireless-earbuds` i.p.v. lange namen)

### Reviews schema (optioneel)
Installeer een review-app (bijv. Judge.me, Loox) en koppel metafields:
- `product.metafields.reviews.rating`
- `product.metafields.reviews.rating_count`

---

## Filters (collectiepagina)

Voor volledige filterfunctionaliteit installeer **Shopify Search & Discovery** (gratis):
1. **Shopify Admin → Apps → Search & Discovery**
2. Configureer filters op prijs, type, beschikbaarheid
3. Filters worden automatisch getoond op de collectiepagina

---

## Performance tips

1. Comprimeer productafbeeldingen (WebP, max 2000px)
2. Gebruik max 5-10 producten per collectie op de homepage
3. Schakel Shopify CDN in (standaard actief)
4. Test met [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Meta Ads / TikTok Ads

1. Installeer **Facebook & Instagram** en **TikTok** pixel via **Settings → Customer events**
2. Zorg voor consistente branding (logo, kleuren) tussen ads en landingspagina
3. Link ads direct naar productpagina's (niet homepage)
4. Gebruik urgency badges en reviews voor social proof
5. Test mobiele weergave — 80%+ traffic komt van mobiel

---

## Ondersteuning

Voor theme-aanpassingen bewerk je de bestanden in:
- **Teksten:** `sections/*.liquid` of via Theme Editor
- **Styling:** `assets/base.css.liquid`
- **Functionaliteit:** `assets/*.js`
- **Componenten:** `snippets/*.liquid`
