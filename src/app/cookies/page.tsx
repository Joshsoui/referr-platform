import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookieverklaring",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookieverklaring">
      <section>
        <h2 className="text-lg font-bold text-fk-navy">Noodzakelijke cookies</h2>
        <p>
          referr gebruikt strikt noodzakelijke cookies voor sessiebeheer en
          beveiliging (Auth.js-sessie). Deze zijn nodig om ingelogd te blijven
          en om je account te beschermen.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">Optionele cookies</h2>
        <p>
          Er is momenteel geen optionele analytics-, advertentie- of
          marketingtracking actief. Als die later worden toegevoegd, vragen we
          eerst je keuze via een consent-interface.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-bold text-fk-navy">Beheer</h2>
        <p>
          Omdat alleen noodzakelijke cookies actief zijn, tonen we geen cookie
          banner. Je kunt voorkeuren later beheren via het Privacycentrum
          wanneer optionele technologieën beschikbaar komen.
        </p>
      </section>
    </LegalPage>
  );
}
