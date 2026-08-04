import type { Vacancy } from "@/types/vacancy";

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: "v1",
    title: "Productiemedewerker Dagdienst",
    sector: "Productie",
    location: "Utrecht",
    postalCode: "3511",
    latitude: 52.0907,
    longitude: 5.1214,
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
    postalCode: "3011",
    latitude: 51.9225,
    longitude: 4.4792,
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
    postalCode: "1012",
    latitude: 52.3676,
    longitude: 4.9041,
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
    postalCode: "5211",
    latitude: 51.688,
    longitude: 5.301,
    description:
      "Orderpicken en magazijnwerk in een groeiend distributiecentrum. Ervaring is een pré, geen must.",
    difficulty: "easy",
    status: "open",
    createdAt: "2026-06-07T08:30:00",
  },
];
