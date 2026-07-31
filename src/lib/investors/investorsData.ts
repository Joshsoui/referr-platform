export type RoadmapStatus = "gebouwd" | "in ontwikkeling" | "gepland" | "toekomst";

export type ScenarioId = "pilot" | "groei" | "schaal";

export interface RevenueScenario {
  id: ScenarioId;
  label: string;
  organizations: number;
  avgSubscription: number;
  placementsPerMonth: number;
  avgPlatformFee: number;
  monthlyOpCosts: number;
}

export interface RevenueInputLimits {
  organizations: { min: number; max: number };
  avgSubscription: { min: number; max: number };
  placementsPerMonth: { min: number; max: number };
  avgPlatformFee: { min: number; max: number };
  monthlyOpCosts: { min: number; max: number };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  linkedIn?: string;
  photo?: string;
}

export interface MarketSegment {
  id: "tam" | "sam" | "som";
  label: string;
  description: string;
  value?: string;
  source?: string;
}

export const INVESTOR_META = {
  title: "referr investors | Investeerderspresentatie",
  description:
    "Ontdek de visie, het businessmodel en het groeipotentieel van referr: het platform dat recruitment activeert via menselijke netwerken.",
  version: "1.0",
  confidentialLabel: "Vertrouwelijk",
} as const;

export const INVESTOR_LINKS = {
  product: "/vacatures",
  vision: "/vision",
  meeting: "mailto:info@referr.nl?subject=Investeerdersgesprek",
} as const;

export const PRODUCT_FLOW_STEPS = [
  "Een organisatie publiceert een challenge.",
  "Een gebruiker denkt direct aan iemand.",
  "De kandidaat wordt geïntroduceerd.",
  "De recruiter beoordeelt de introductie.",
  "De gebruiker volgt de voortgang.",
  "De kandidaat wordt geplaatst.",
  "De beloning wordt vrijgespeeld.",
] as const;

export const THESIS_FLOW = [
  "Challenge",
  "Introductie",
  "Selectie",
  "Plaatsing",
  "Beloning",
] as const;

export const PROBLEM_CARDS = [
  {
    title: "Iedereen zoekt op dezelfde plekken",
    description:
      "Recruiters, werkgevers en bureaus gebruiken grotendeels dezelfde vacaturebanken, databases en zoekmachines.",
  },
  {
    title: "De beste kandidaten solliciteren niet altijd",
    description:
      "Veel geschikte professionals zijn niet actief op zoek en reageren niet op standaardvacatures.",
  },
  {
    title: "Netwerken blijven onbenut",
    description:
      "Medewerkers, klanten, vrienden en oud-collega's kennen geschikte mensen, maar er is vaak geen laagdrempelig systeem om die kennis te activeren.",
  },
  {
    title: "Referralprogramma's zijn gesloten",
    description:
      "Traditionele referralprogramma's zijn meestal alleen toegankelijk voor eigen medewerkers en bieden weinig transparantie over de voortgang.",
  },
] as const;

export const APPROACH_COMPARISON = {
  traditional: {
    title: "Traditionele recruitment",
    items: [
      "Eén recruiter of recruitmentteam zoekt",
      "Kandidaten worden actief benaderd",
      "De vacature staat centraal",
      "Hoge afhankelijkheid van databases",
      "Referral is een aanvullende bron",
      "Beperkte transparantie voor de aanbrenger",
    ],
  },
  referr: {
    title: "Het referr-model",
    items: [
      "Een netwerk helpt talent ontdekken",
      "Mensen introduceren iemand die zij kennen",
      "De challenge staat centraal",
      "Menselijke relaties worden geactiveerd",
      "Referral vormt de kern van het model",
      "De introductie is van begin tot eind inzichtelijk",
    ],
  },
} as const;

export const MARKET_SHIFT_DEVELOPMENTS = [
  "Recruiters krijgen steeds betere zoek- en automatiseringstools.",
  "Kandidaten worden steeds vaker en sneller benaderd.",
  "Vertrouwen, herkenning en persoonlijke introducties worden daardoor belangrijker.",
] as const;

export const STAKEHOLDER_VALUE = [
  {
    title: "Voor recruitmentorganisaties",
    items: [
      "Extra bereik buiten bestaande databases",
      "Meer introducties via warme netwerken",
      "Lagere afhankelijkheid van jobboards",
      "Transparante referraladministratie",
      "Nieuwe community rond vacatures",
    ],
  },
  {
    title: "Voor werkgevers",
    items: [
      "Toegang tot latent talent",
      "Betere betrokkenheid van medewerkers en netwerk",
      "Extra recruitmentkanaal",
      "Meer grip op referrals",
      "Mogelijkheid voor eigen branded challenges",
    ],
  },
  {
    title: "Voor referrers",
    items: [
      "Eenvoudig iemand introduceren",
      "Voortgang blijven volgen",
      "Beloond worden voor een succesvolle introductie",
      "Geen recruiterervaring nodig",
      "Iemand helpen bij een volgende stap",
    ],
  },
] as const;

export const SUBSCRIPTION_TIERS = [
  {
    name: "Starter",
    price: "€99 per maand",
    description: "Voor kleine organisaties en pilots.",
  },
  {
    name: "Growth",
    price: "€299 per maand",
    description: "Voor organisaties met meerdere actieve challenges.",
  },
  {
    name: "Business",
    price: "€699 per maand",
    description: "Voor grotere teams, uitgebreid beheer en integraties.",
  },
  {
    name: "Enterprise",
    price: "Prijs op aanvraag",
    description: "Voor white-label, maatwerk, SSO, API en ATS-koppelingen.",
  },
] as const;

export const PLACEMENT_FEE_EXAMPLE = {
  clientFee: 6000,
  referrerReward: 1250,
  platformFee: 750,
  partnerMargin: 4000,
} as const;

export const CHALLENGE_CREDITS_FEATURES = [
  "extra challenges",
  "uitgelichte challenges",
  "prioriteitsplaatsing",
  "doelgroepcampagnes",
  "employer branding",
  "extra bereik binnen relevante communities",
] as const;

export const ENTERPRISE_FEATURES = [
  "eigen omgeving",
  "eigen branding",
  "meerdere teams en rollen",
  "ATS-integraties",
  "API-koppelingen",
  "eigen referralvoorwaarden",
  "rapportages en analytics",
  "SSO",
  "ondersteuning en implementatie",
] as const;

export const REVENUE_SCENARIOS: Record<ScenarioId, RevenueScenario> = {
  pilot: {
    id: "pilot",
    label: "Pilot",
    organizations: 10,
    avgSubscription: 199,
    placementsPerMonth: 5,
    avgPlatformFee: 500,
    monthlyOpCosts: 8000,
  },
  groei: {
    id: "groei",
    label: "Groei",
    organizations: 50,
    avgSubscription: 299,
    placementsPerMonth: 30,
    avgPlatformFee: 600,
    monthlyOpCosts: 25000,
  },
  schaal: {
    id: "schaal",
    label: "Schaal",
    organizations: 200,
    avgSubscription: 399,
    placementsPerMonth: 125,
    avgPlatformFee: 700,
    monthlyOpCosts: 75000,
  },
};

export const REVENUE_INPUT_LIMITS: RevenueInputLimits = {
  organizations: { min: 1, max: 500 },
  avgSubscription: { min: 50, max: 2000 },
  placementsPerMonth: { min: 0, max: 500 },
  avgPlatformFee: { min: 100, max: 5000 },
  monthlyOpCosts: { min: 1000, max: 500000 },
};

export const UNIT_ECONOMICS_STAKEHOLDERS = [
  "De opdrachtgever vindt talent.",
  "De recruitmentpartner realiseert omzet.",
  "De kandidaat vindt een nieuwe baan.",
  "De referrer ontvangt een beloning.",
  "referr ontvangt een platformfee.",
] as const;

export const FUTURE_KPIS = [
  "gemiddelde omzet per klant",
  "succesvolle plaatsingen per klant",
  "conversie van introductie naar gesprek",
  "conversie van gesprek naar plaatsing",
  "gemiddelde platformfee",
  "gemiddelde acquisitiekosten per organisatie",
  "retentie van betalende organisaties",
  "percentage actieve referrers",
] as const;

export const FLYWHEEL_STEPS = [
  "Meer organisaties",
  "Meer challenges",
  "Meer gebruikers",
  "Meer introducties",
  "Meer succesvolle plaatsingen",
  "Meer beloningen",
  "Meer mond-tot-mondgroei",
  "Meer organisaties",
] as const;

export const GROWTH_PHASES = [
  {
    phase: "Fase 1 — Pilot",
    items: [
      "Finderz Keeperz als eerste gebruiker",
      "Captain Recruit als mogelijke pilotpartner",
      "Beperkt aantal challenges",
      "Handmatige begeleiding",
      "Validatie van introducties, workflow en beloningen",
    ],
  },
  {
    phase: "Fase 2 — Recruitmentpartners",
    items: [
      "Aansluiten van zelfstandige bureaus",
      "Uitbreiden van challenge-aanbod",
      "Testen van abonnements- en succesfees",
      "Verbeteren van dashboard en rapportages",
    ],
  },
  {
    phase: "Fase 3 — Werkgevers",
    items: [
      "Directe corporate accounts",
      "Employer-branded challenges",
      "Interne en externe referralcommunity",
      "ATS-integraties",
    ],
  },
  {
    phase: "Fase 4 — Platformgroei",
    items: [
      "Schaalbare acquisitie",
      "Communitygroei",
      "Internationale uitbreiding",
      "Enterprise en white-label",
    ],
  },
] as const;

export const GTM_STEPS = [
  "Eigen vacatures van Finderz Keeperz.",
  "Recruitmentbureaus als launching partners.",
  "Uitnodigen van bestaande kandidaten en netwerken.",
  "Social campagnes rond concrete challenges.",
  "referrers activeren via gedeelde resultaten en beloningen.",
  "Werkgevers aansluiten nadat het model via bureaus is gevalideerd.",
] as const;

export const MARKET_SEGMENTS: MarketSegment[] = [
  {
    id: "tam",
    label: "TAM",
    description:
      "De totale relevante markt voor recruitmenttechnologie, externe recruitment en referraloplossingen.",
    value: "Nog te valideren met actuele marktdata.",
  },
  {
    id: "sam",
    label: "SAM",
    description:
      "Het deel van de markt dat bereikbaar is met een Nederlands platform voor recruitmentbureaus en werkgevers.",
    value: "Nog te valideren met actuele marktdata.",
  },
  {
    id: "som",
    label: "SOM",
    description:
      "Het realistische deel dat referr in de eerste jaren kan bedienen.",
    value: "Nog te valideren met actuele marktdata.",
  },
];

export const MARKET_SOURCES: string[] = [];

export const COMPETITIVE_POSITIONS = [
  { label: "Traditionele referralprogramma's", x: 0.15, y: 0.25 },
  { label: "Vacaturebanken", x: 0.85, y: 0.15 },
  { label: "Recruitmentbureaus", x: 0.2, y: 0.75 },
  { label: "Crowdsourced recruitmentplatformen", x: 0.75, y: 0.55 },
  { label: "referr", x: 0.82, y: 0.88, highlight: true },
] as const;

export const DEFENSIBILITY_PILLARS = [
  {
    title: "Community en netwerkdichtheid",
    description:
      "Hoe meer actieve referrers en relevante communities, hoe moeilijker dit netwerk te kopiëren wordt.",
  },
  {
    title: "Gedrags- en matchingdata",
    description:
      "referr leert welke challenges, netwerken en introducties tot goede matches leiden.",
  },
  {
    title: "Integraties en workflow",
    description:
      "ATS-koppelingen, klantprocessen en ingebouwde referraladministratie verhogen de overstapdrempel.",
  },
  {
    title: "Merk en categorie",
    description:
      "referr kan uitgroeien tot de herkenbare naam voor netwerkgedreven recruitment.",
  },
] as const;

export const PRODUCT_ROADMAP = [
  {
    phase: "MVP",
    items: [
      { label: "account en onboarding", status: "in ontwikkeling" as RoadmapStatus },
      { label: "challenges", status: "gebouwd" as RoadmapStatus },
      { label: "kandidaat introduceren", status: "in ontwikkeling" as RoadmapStatus },
      { label: "statusflow", status: "in ontwikkeling" as RoadmapStatus },
      { label: "notificaties", status: "in ontwikkeling" as RoadmapStatus },
      { label: "beloningsoverzicht", status: "in ontwikkeling" as RoadmapStatus },
      { label: "beheer voor recruitmentpartners", status: "gepland" as RoadmapStatus },
    ],
  },
  {
    phase: "Volgende fase",
    items: [
      { label: "geavanceerde dashboards", status: "gepland" as RoadmapStatus },
      { label: "klantaccounts", status: "gepland" as RoadmapStatus },
      { label: "analytics", status: "gepland" as RoadmapStatus },
      { label: "automatische notificaties", status: "gepland" as RoadmapStatus },
      { label: "betalings- en beloningsflow", status: "gepland" as RoadmapStatus },
      { label: "fraudepreventie", status: "gepland" as RoadmapStatus },
      { label: "verbeterde matching", status: "gepland" as RoadmapStatus },
    ],
  },
  {
    phase: "Schaalfase",
    items: [
      { label: "ATS-integraties", status: "toekomst" as RoadmapStatus },
      { label: "API", status: "toekomst" as RoadmapStatus },
      { label: "mobiele app of PWA", status: "toekomst" as RoadmapStatus },
      { label: "white-label", status: "toekomst" as RoadmapStatus },
      { label: "enterprisebeheer", status: "toekomst" as RoadmapStatus },
      { label: "internationale lokalisatie", status: "toekomst" as RoadmapStatus },
    ],
  },
] as const;

export const VALIDATION_QUESTIONS = [
  "Introduceren mensen daadwerkelijk kandidaten?",
  "Welke beloning activeert referrers zonder verkeerde prikkels?",
  "Willen recruitmentorganisaties voor toegang betalen?",
  "Hoeveel introducties zijn kwalitatief relevant?",
  "Hoe voorkomen we dubbele kandidaten, fraude en onduidelijkheid?",
] as const;

export const RISK_MITIGATIONS = [
  "kleinschalige pilots",
  "handmatige kwaliteitscontrole",
  "duidelijke voorwaarden",
  "betaling na succesvolle plaatsing en afgesproken dienstperiode",
  "meten van iedere stap in de funnel",
  "gesprekken met recruitmentpartners en referrers",
] as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder-1",
    name: "Naam nog toe te voegen",
    role: "Oprichter",
    expertise: "Recruitment & product",
    bio: "Achtergrond en expertise worden binnenkort toegevoegd.",
  },
  {
    id: "founder-2",
    name: "Naam nog toe te voegen",
    role: "Compagnon",
    expertise: "Strategie & partnerships",
    bio: "Achtergrond en expertise worden binnenkort toegevoegd.",
  },
];

export const COLLABORATION_FORMS = [
  {
    title: "Strategische partner",
    items: [
      "pilot draaien",
      "vacatures en challenges aanleveren",
      "productfeedback geven",
      "meedenken over integraties",
    ],
  },
  {
    title: "Launching customer",
    items: [
      "eerste betaalde klant",
      "actief gebruik van het platform",
      "gezamenlijke validatie",
      "praktijkcase opbouwen",
    ],
  },
  {
    title: "Investeerder",
    items: [
      "financiering van productontwikkeling en groei",
      "strategische begeleiding",
      "toegang tot netwerk en markt",
      "voorbereiding op schaalbare commerciële uitrol",
    ],
  },
] as const;

export const INVESTMENT_ASK = {
  amount: "Nog vast te stellen",
  structure: "Bespreekbaar",
  type: "Seed / pre-seed — nog te bepalen",
  runway: "Nog vast te stellen",
  goal: "MVP valideren, pilots uitvoeren en commerciële uitrol voorbereiden",
  spending: [
    "productontwikkeling",
    "UX en techniek",
    "juridische inrichting",
    "pilotimplementatie",
    "communitygroei",
    "sales en partnerships",
  ],
  milestones: [
    "MVP valideren",
    "Eerste pilotorganisaties",
    "Prijsmodel testen",
    "Commerciële basis leggen",
  ],
} as const;

export const CONCEPT_MILESTONES = [
  "werkend en getest MVP",
  "eerste drie pilotorganisaties",
  "eerste honderd actieve gebruikers",
  "eerste succesvolle betaalde plaatsingen",
  "validatie van prijsmodel",
  "basis voor ATS-integraties",
  "aantoonbare introductie- en plaatsingsfunnel",
] as const;

export const DISCLAIMER_TEXT =
  "Deze presentatie bevat concepten, aannames en illustratieve financiële scenario's. Aan de getoonde prognoses, prijsmodellen en groeiscenario's kunnen geen rechten worden ontleend. Definitieve voorwaarden en financiële afspraken worden afzonderlijk vastgesteld.";

export const DEMO_CHALLENGE = {
  title: "Senior Financieel Medewerker",
  location: "Almere",
  reward: 1250,
  hours: "32–40 uur",
} as const;

export function formatInvestorEuro(value: number): string {
  return `€ ${Math.round(value).toLocaleString("nl-NL")}`;
}

export function calculateRevenue(inputs: {
  organizations: number;
  avgSubscription: number;
  placementsPerMonth: number;
  avgPlatformFee: number;
  monthlyOpCosts: number;
}) {
  const monthlySubscription = inputs.organizations * inputs.avgSubscription;
  const monthlyPlacement = inputs.placementsPerMonth * inputs.avgPlatformFee;
  const totalMonthly = monthlySubscription + monthlyPlacement;
  const annualRevenue = totalMonthly * 12;
  const operatingResult = totalMonthly - inputs.monthlyOpCosts;

  return {
    monthlySubscription,
    monthlyPlacement,
    totalMonthly,
    annualRecurring: monthlySubscription * 12,
    annualRevenue,
    operatingResult,
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
