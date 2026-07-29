# Privacy data map

| Field | Purpose | Visibility | Retention (confirm) | Deletion |
| --- | --- | --- | --- | --- |
| firstName, lastName | Account identity | User + authorized staff | `[BEWAARTERMIJN BEVESTIGEN]` | Removed on account deletion |
| email | Login + notifications | User + authorized staff | `[BEWAARTERMIJN BEVESTIGEN]` | Removed / anonymized on deletion |
| passwordHash | Authentication | Never exposed | Until password change / deletion | Deleted with account |
| marketingConsent (+ version, timestamp) | Optional email updates | User | Until withdrawn / deleted | Cleared on deletion |
| termsAcceptedAt + version | Proof of terms acceptance | Internal | `[BEWAARTERMIJN BEVESTIGEN]` | Retained if legally required, else deleted |
| emailVerifiedAt | Gate sensitive features | User | With account | Cleared on deletion |
| Candidate intro fields (client mock) | Introduction flow | Referrer + employer process (future) | `[BEWAARTERMIJN BEVESTIGEN]` | Per product rules |

## Legal bases

Do not invent legal bases. Organisation must confirm before production:

`[RECHTSGRONDEN BEVESTIGEN]`

## Controllers / processors

- Controller: `[JURIDISCHE NAAM INVULLEN]`
- KvK: `[KVK-NUMMER INVULLEN]`
- Privacy contact: `[PRIVACYCONTACT INVULLEN]`
- Hosting / processors: `[VERWERKER EN HOSTINGLOCATIE BEVESTIGEN]`
