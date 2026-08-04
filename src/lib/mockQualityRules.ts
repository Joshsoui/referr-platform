export const FAIR_USE_RULES = [
  "Alleen unieke kandidaten tellen mee.",
  "Dubbele introducties worden samengevoegd.",
  "De kandidaat moet toestemming geven om benaderd te worden.",
  "Geen nepgegevens.",
  "Geen onbereikbare personen.",
  "Beloningen kunnen worden ingetrokken bij misbruik.",
  "De eerste geldige introductie krijgt prioriteit.",
  "referr bepaalt of een introductie geldig is.",
  "Beloningen worden pas uitgekeerd na controle.",
];

export const CASH_STATUS_LABELS: Record<string, string> = {
  geen_cash: "Geen beloning",
  intake_in_behandeling: "Beloning wordt verwerkt",
  intake_goedgekeurd: "Beloning goedgekeurd",
  plaatsing_in_behandeling: "Beloning wordt verwerkt",
  plaatsing_goedgekeurd: "Beloning goedgekeurd",
  retentie_goedgekeurd: "Beloning uitbetaald",
  afgekeurd: "Beloning niet toegekend",
};

export const SECTORS = [
  "Productie",
  "Techniek",
  "Bouw",
  "Logistiek",
  "Kantoor",
  "Sales",
  "Management",
  "Overig",
] as const;

export const INTEREST_REASONS = [
  "Staat open voor een nieuwe uitdaging",
  "Heeft sterke technische kennis",
  "Heeft leidinggevende ervaring",
  "Zoekt meer salaris",
  "Zoekt werk dichter bij huis",
  "Zoekt groeimogelijkheden",
  "Past goed bij een openstaande vacature",
  "Kan een echte aanwinst worden",
] as const;

export const RELATIONSHIP_OPTIONS = [
  { value: "gewerkt", label: "Ik heb met deze persoon gewerkt" },
  { value: "persoonlijk", label: "Ik ken deze persoon persoonlijk" },
  { value: "netwerk", label: "Ik ken deze persoon via mijn netwerk" },
  { value: "online", label: "Ik heb deze persoon alleen online gezien" },
] as const;
