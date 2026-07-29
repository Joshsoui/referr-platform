# Legal placeholders requiring human confirmation

These appear in legal pages and docs. Replace before production launch.

| Placeholder | Where |
| --- | --- |
| `[JURIDISCHE NAAM INVULLEN]` | Privacy, Voorwaarden |
| `[KVK-NUMMER INVULLEN]` | Privacy |
| `[PRIVACYCONTACT INVULLEN]` | Privacy |
| `[RECHTSGRONDEN BEVESTIGEN]` | Privacy, data map |
| `[VERWERKER EN HOSTINGLOCATIE BEVESTIGEN]` | Privacy |
| `[INTERNATIONALE DOORGIFTE BEVESTIGEN]` | Privacy |
| `[BEWAARTERMIJN BEVESTIGEN]` | Privacy, data map |
| `[BELONINGSVOORWAARDEN BEVESTIGEN]` | Voorwaarden |
| `[AANSPRAKELIJKHEID EN TOEPASSELIJK RECHT INVULLEN]` | Voorwaarden |
| `[SECURITYCONTACT INVULLEN]` | Beveiliging |
| `[TOEGANKELIJKHEIDSCONTACT INVULLEN]` | Toegankelijkheid |

Also configure: `AUTH_SECRET`, production SMTP, SPF/DKIM/DMARC, HTTPS, and turn off `AUTH_DEMO_MODE` once email works.
