export const FAIR_USE_RULES = [
  "Alleen unieke kandidaten tellen mee.",
  "Dubbele kandidaten worden samengevoegd.",
  "De kandidaat moet toestemming geven om benaderd te worden.",
  "Cash geldt alleen als Finderz Keeperz de kandidaat nog niet kende.",
  "Geen beloning voor nepgegevens of onbereikbare kandidaten.",
  "XP kan worden ingetrokken bij misbruik.",
  "Finderz Keeperz bepaalt of een referral geldig is.",
  "Maximaal één scout kan gekoppeld zijn aan één kandidaat.",
  "Eerste geldige referral krijgt prioriteit.",
  "Cash wordt pas uitgekeerd na controle.",
];

export const CASH_STATUS_LABELS: Record<string, string> = {
  geen_cash: "Geen cash",
  intake_in_behandeling: "Intake bonus in behandeling",
  intake_goedgekeurd: "Intake bonus goedgekeurd",
  plaatsing_in_behandeling: "Plaatsingsbonus in behandeling",
  plaatsing_goedgekeurd: "Plaatsingsbonus goedgekeurd",
  retentie_goedgekeurd: "Retentiebonus goedgekeurd",
  afgekeurd: "Afgekeurd",
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
  "Anders",
] as const;

export const RELATIONSHIP_OPTIONS = [
  { value: "gewerkt", label: "Ik heb met deze kandidaat gewerkt" },
  { value: "persoonlijk", label: "Ik ken deze kandidaat persoonlijk" },
  { value: "netwerk", label: "Ik ken deze kandidaat via mijn netwerk" },
  { value: "online", label: "Ik heb deze kandidaat alleen online gevonden" },
] as const;
