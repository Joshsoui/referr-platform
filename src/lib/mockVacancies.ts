import type { Vacancy } from "@/types/vacancy";

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: "v1",
    title: "Productiemedewerker Dagdienst",
    sector: "Productie",
    location: "Utrecht",
    description:
      "Ervaren productiemedewerker gezocht voor een stabiele dagdienst. Geen zware eisen, ideaal om snel te starten.",
    difficulty: "easy",
    status: "open",
    createdAt: "2026-06-01T09:00:00",
  },
  {
    id: "v2",
    title: "Senior Werkvoorbereider Techniek",
    sector: "Techniek",
    location: "Rotterdam",
    description:
      "Complexe rol met verantwoordelijkheid over planning, materiaal en klantcontact. Sterk technisch profiel vereist.",
    difficulty: "hard",
    status: "open",
    createdAt: "2026-06-03T11:00:00",
  },
  {
    id: "v3",
    title: "Operations Manager Bouw",
    sector: "Bouw",
    location: "Amsterdam",
    description:
      "Leidinggevende rol met P&L-verantwoordelijkheid. Zoeken naar bewezen manager met bouwachtergrond en teamopbouw.",
    difficulty: "expert",
    status: "open",
    createdAt: "2026-06-05T14:00:00",
  },
  {
    id: "v4",
    title: "Logistiek Medewerker",
    sector: "Logistiek",
    location: "Den Bosch",
    description:
      "Orderpicken en magazijnwerk in een groeiend distributiecentrum. Ervaring is een pré, geen must.",
    difficulty: "easy",
    status: "open",
    createdAt: "2026-06-07T08:30:00",
  },
];
