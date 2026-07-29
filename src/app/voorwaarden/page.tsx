import type { Metadata } from "next";
import { LegalPage, Placeholder } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Gebruikersvoorwaarden",
};

export default function TermsPage() {
  return (
    <LegalPage title="Gebruikersvoorwaarden">
      <section>
        <h2 className="text-lg font-bold text-fk-navy">1. Over referr</h2>
        <p>
          referr is een communityplatform waarmee je vacatures ontdekt,
          iemand uit je netwerk aandracht en voortgang van introducties volgt.
          Aanbieder: <Placeholder>[JURIDISCHE NAAM INVULLEN]</Placeholder>.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">2. Account</h2>
        <p>
          Je bent verantwoordelijk voor je inloggegevens en voor de juistheid
          van informatie die je deelt. Misbruik, scraping of ongeautoriseerde
          toegang is niet toegestaan.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">3. Introducties</h2>
        <p>
          Je deelt alleen gegevens die nodig zijn voor de introductie en
          informeert de kandidaat. referr is geen ATS en neemt geen
          arbeidsbeslissingen.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">4. Beloningen</h2>
        <p>
          Beloningen volgen de afspraken per vacature en zijn afhankelijk van
          een succesvolle plaatsing volgens de geldende regels.{" "}
          <Placeholder>[BELONINGSVOORWAARDEN BEVESTIGEN]</Placeholder>.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">5. Aansprakelijkheid</h2>
        <p>
          <Placeholder>[AANSPRAKELIJKHEID EN TOEPASSELIJK RECHT INVULLEN]</Placeholder>.
        </p>
      </section>
    </LegalPage>
  );
}
