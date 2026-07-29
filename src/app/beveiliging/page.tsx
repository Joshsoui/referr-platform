import type { Metadata } from "next";
import { LegalPage, Placeholder } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Beveiliging",
};

export default function SecurityPage() {
  return (
    <LegalPage title="Beveiliging">
      <section>
        <h2 className="text-lg font-bold text-fk-navy">Onze aanpak</h2>
        <p>
          We beveiligen accounts met gehashte wachtwoorden, server-side
          sessies, rate limiting op gevoelige acties, en autorisatiecontroles
          op privéroutes. Productie vereist HTTPS.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">Wat we niet claimen</h2>
        <p>
          Deze pagina beschrijft een technische baseline. Het is geen
          certificaat van volledige AVG-naleving of een
          penetratietestrapport.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">Melding</h2>
        <p>
          Verdachte activiteit of beveiligingsproblemen melden via{" "}
          <Placeholder>[SECURITYCONTACT INVULLEN]</Placeholder>.
        </p>
      </section>
    </LegalPage>
  );
}
