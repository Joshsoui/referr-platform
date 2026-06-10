export const FAIR_USE_RULES = [
  "Alleen unieke talenten tellen mee.",
  "Duplicates worden samengevoegd.",
  "Het talent moet toestemming geven om benaderd te worden.",
  "Geen nepgegevens.",
  "Geen onbereikbare personen.",
  "XP kan worden ingetrokken.",
  "Eerste geldige tip krijgt prioriteit.",
  "Finderz Keeperz bepaalt of een tip geldig is.",
  "Cash wordt pas uitgekeerd na controle.",
];

export const CASH_STATUS_LABELS: Record<string, string> = {
  geen_cash: "Geen cash",
  intake_in_behandeling: "Intake bonus in behandeling",
  intake_goedgekeurd: "Intake bonus goedgekeurd",
  plaatsing_in_behandeling: "Matchbonus in behandeling",
  plaatsing_goedgekeurd: "Matchbonus goedgekeurd",
  retentie_goedgekeurd: "🏆 Keeper Bonus goedgekeurd",
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
  "Kan een echte Keeper worden",
] as const;

export const RELATIONSHIP_OPTIONS = [
  { value: "gewerkt", label: "Ik heb met deze persoon gewerkt" },
  { value: "persoonlijk", label: "Ik ken deze persoon persoonlijk" },
  { value: "netwerk", label: "Ik ken deze persoon via mijn netwerk" },
  { value: "online", label: "Ik heb deze persoon alleen online gezien" },
] as const;
