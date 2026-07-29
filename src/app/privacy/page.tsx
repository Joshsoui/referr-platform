import type { Metadata } from "next";
import { LegalPage, Placeholder } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Hoe referr omgaat met persoonsgegevens.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacyverklaring">
      <section>
        <h2 className="text-lg font-bold text-fk-navy">1. Verantwoordelijke</h2>
        <p>
          De verwerkingsverantwoordelijke is{" "}
          <Placeholder>[JURIDISCHE NAAM INVULLEN]</Placeholder>, KvK{" "}
          <Placeholder>[KVK-NUMMER INVULLEN]</Placeholder>. Privacycontact:{" "}
          <Placeholder>[PRIVACYCONTACT INVULLEN]</Placeholder>.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">2. Welke gegevens</h2>
        <p>
          Accountgegevens (naam, e-mail, wachtwoordhash), sessiegegevens,
          optionele marketingvoorkeuren, introductiegegevens die jij deelt over
          kandidaten, en technische logs voor beveiliging. Zie de interne
          privacy data map voor details.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">3. Doeleinden</h2>
        <p>
          Accountbeheer, introducties en voortgang, beloningsafhandeling,
          beveiliging, en — alleen met aparte toestemming — optionele updates.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">4. Rechtsgrond</h2>
        <p>
          Rechtsgronden worden bevestigd door de organisatie vóór productielancering:{" "}
          <Placeholder>[RECHTSGRONDEN BEVESTIGEN]</Placeholder>.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">
          5. Ontvangers en verwerkers
        </h2>
        <p>
          Hosting en e-mailproviders:{" "}
          <Placeholder>[VERWERKER EN HOSTINGLOCATIE BEVESTIGEN]</Placeholder>.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">
          6. Internationale doorgifte
        </h2>
        <p>
          <Placeholder>[INTERNATIONALE DOORGIFTE BEVESTIGEN]</Placeholder>.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">7. Bewaartermijnen</h2>
        <p>
          <Placeholder>[BEWAARTERMIJN BEVESTIGEN]</Placeholder>. Accountgegevens
          worden verwijderd of geanonimiseerd na een verwijderingsverzoek,
          behalve waar wettelijke of operationele bewaarplicht geldt.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">
          8. Kandidaatgegevens
        </h2>
        <p>
          Gegevens over kandidaten die jij aandragt zijn niet openbaar. Deel
          alleen wat nodig is om contact op te nemen over de vacature, en
          bespreek de introductie eerst met de kandidaat.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">9. Cookies</h2>
        <p>
          Zie de{" "}
          <a href="/cookies" className="font-semibold text-fk-primary">
            cookieverklaring
          </a>
          .
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">
          10. Geautomatiseerde besluitvorming
        </h2>
        <p>
          referr neemt geen geautomatiseerde arbeidsbeslissingen over
          kandidaten namens werkgevers.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">11. Jouw rechten</h2>
        <p>
          Je kunt inzage, correctie, export en verwijdering aanvragen via het
          Privacycentrum in je account. Klachten kun je indienen bij de
          Autoriteit Persoonsgegevens.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">12. Wijzigingen</h2>
        <p>
          Bij materiële wijzigingen werken we deze pagina bij en vermelden we
          de datum.
        </p>
      </section>
    </LegalPage>
  );
}
