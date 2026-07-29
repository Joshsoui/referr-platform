import type { Metadata } from "next";
import { LegalPage, Placeholder } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Toegankelijkheid",
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Toegankelijkheidsverklaring">
      <section>
        <h2 className="text-lg font-bold text-fk-navy">Doel</h2>
        <p>
          referr streeft naar WCAG 2.2 AA voor de landingspagina,
          authenticatie en primaire gebruikersstromen: toetsenbordnavigatie,
          zichtbare focus, semantische koppen, formulierlabels en
          verminderde-motion-ondersteuning.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">Feedback</h2>
        <p>
          Problemen of suggesties:{" "}
          <Placeholder>[TOEGANKELIJKHEIDSCONTACT INVULLEN]</Placeholder>.
        </p>
      </section>
    </LegalPage>
  );
}
