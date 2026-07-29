/**
 * Demo data for the Recruitment Portal dashboard.
 * Swap these exports for API responses later without changing UI components.
 */

export type TodayPriority = "critical" | "high" | "success" | "attention" | "warning";

export interface TodayAction {
  id: string;
  priority: TodayPriority;
  label: string;
  href: string;
}

export interface PortalStat {
  id: string;
  label: string;
  value: number;
  delta: number;
  deltaLabel: string;
}

export type IntroStatus =
  | "nieuw"
  | "in_beoordeling"
  | "goedgekeurd"
  | "afgewezen";

export interface PortalIntroduction {
  id: string;
  candidateName: string;
  candidateEmail: string;
  challengeTitle: string;
  company: string;
  location: string;
  referrerName: string;
  referrerEmail: string;
  date: string;
  status: IntroStatus;
  motivation: string;
  experience: string;
  href: string;
}

export interface PortalChallenge {
  id: string;
  title: string;
  company: string;
  location: string;
  reward: number;
  status: "open" | "actief" | "sluit_binnenkort";
  introductions: number;
  lastActivity: string;
  href: string;
}

export type AttentionKind =
  | "wacht_beoordeling"
  | "intake_ontbreekt"
  | "geen_feedback"
  | "gesprek_gepland"
  | "start_bevestigd";

export interface AttentionCandidate {
  id: string;
  name: string;
  challengeTitle: string;
  kind: AttentionKind;
  detail: string;
  daysWaiting?: number;
  href: string;
}

export type RewardAttention =
  | "kandidaat_gestart"
  | "wachtperiode"
  | "uitbetaling_gereed";

export interface PortalReward {
  id: string;
  candidateName: string;
  challengeTitle: string;
  amount: number;
  kind: RewardAttention;
  detail: string;
  href: string;
}

export interface PortalActivity {
  id: string;
  time: string;
  text: string;
}

export interface AIQuickAction {
  id: string;
  label: string;
}

export type SyncLevel = "ok" | "warn";

export interface SyncItem {
  id: string;
  level: SyncLevel;
  label: string;
}

export const PORTAL_USER = {
  firstName: "Joshua",
};

export const TODAY_ACTIONS: TodayAction[] = [
  {
    id: "ta-1",
    priority: "critical",
    label: "6 nieuwe introducties beoordelen",
    href: "/recruitment/introducties/in-1",
  },
  {
    id: "ta-2",
    priority: "high",
    label: "2 kandidaten wachten op feedback",
    href: "#aandacht",
  },
  {
    id: "ta-3",
    priority: "success",
    label: "1 kandidaat is geplaatst",
    href: "#beloningen",
  },
  {
    id: "ta-4",
    priority: "attention",
    label: "1 beloning kan worden goedgekeurd",
    href: "#beloningen",
  },
  {
    id: "ta-5",
    priority: "warning",
    label: "OTYS synchronisatie vereist aandacht",
    href: "#sync",
  },
];

export const PORTAL_STATS: PortalStat[] = [
  {
    id: "st-1",
    label: "Actieve challenges",
    value: 12,
    delta: 2,
    deltaLabel: "t.o.v. vorige week",
  },
  {
    id: "st-2",
    label: "Nieuwe introducties deze week",
    value: 18,
    delta: 5,
    deltaLabel: "t.o.v. vorige week",
  },
  {
    id: "st-3",
    label: "Kandidaten in procedure",
    value: 9,
    delta: -1,
    deltaLabel: "t.o.v. vorige week",
  },
  {
    id: "st-4",
    label: "Plaatsingen deze maand",
    value: 3,
    delta: 1,
    deltaLabel: "t.o.v. vorige maand",
  },
];

export const PORTAL_INTRODUCTIONS: PortalIntroduction[] = [
  {
    id: "in-1",
    candidateName: "Mike Jansen",
    candidateEmail: "mike.jansen@email.nl",
    challengeTitle: "Senior Financieel Medewerker",
    company: "Finova Group",
    location: "Almere",
    referrerName: "Lisa de Vries",
    referrerEmail: "lisa@email.nl",
    date: "Vandaag, 09:42",
    status: "nieuw",
    motivation:
      "Mike heeft 8 jaar ervaring in financiële administratie en zoekt een zelfstandige rol binnen een groeiende organisatie.",
    experience: "8 jaar finance · SAP · MKB en corporate",
    href: "/recruitment/introducties/in-1",
  },
  {
    id: "in-2",
    candidateName: "Sara Ahmed",
    candidateEmail: "sara.ahmed@email.nl",
    challengeTitle: "Accountmanager Noord",
    company: "Horizon Sales",
    location: "Groningen",
    referrerName: "Tom Bakker",
    referrerEmail: "tom@email.nl",
    date: "Vandaag, 08:15",
    status: "nieuw",
    motivation:
      "Sara heeft een sterk netwerk in het noorden en past qua energie en ervaring goed bij deze commerciële rol.",
    experience: "5 jaar B2B sales · regio Noord-Nederland",
    href: "/recruitment/introducties/in-2",
  },
  {
    id: "in-3",
    candidateName: "Peter van Dijk",
    candidateEmail: "peter@email.nl",
    challengeTitle: "Product Owner",
    company: "Byteworks",
    location: "Utrecht",
    referrerName: "Anna Vos",
    referrerEmail: "anna@email.nl",
    date: "Gisteren, 16:20",
    status: "in_beoordeling",
    motivation:
      "Peter heeft productteams begeleid in een scale-up en zoekt een omgeving met meer ownership.",
    experience: "6 jaar product · Agile · SaaS",
    href: "/recruitment/introducties/in-3",
  },
  {
    id: "in-4",
    candidateName: "Noa Vermeer",
    candidateEmail: "noa@email.nl",
    challengeTitle: "Operations Manager Bouw",
    company: "Bouw & Co",
    location: "Amsterdam",
    referrerName: "Kevin Smits",
    referrerEmail: "kevin@email.nl",
    date: "Gisteren, 11:05",
    status: "nieuw",
    motivation:
      "Noa heeft ervaring met operationele processen binnen bouwprojecten en zoekt een leidende rol.",
    experience: "10 jaar operations · bouw · teamlead",
    href: "/recruitment/introducties/in-4",
  },
  {
    id: "in-5",
    candidateName: "Jamal El Amrani",
    candidateEmail: "jamal@email.nl",
    challengeTitle: "Senior Werkvoorbereider",
    company: "Techniek Partners",
    location: "Rotterdam",
    referrerName: "Emma Kuiper",
    referrerEmail: "emma@email.nl",
    date: "Maandag, 14:30",
    status: "goedgekeurd",
    motivation:
      "Jamal is technisch sterk en heeft ervaring met complexe installatieprojecten.",
    experience: "12 jaar werkvoorbereiding · technische installatie",
    href: "/recruitment/introducties/in-5",
  },
];

export const PORTAL_CHALLENGES: PortalChallenge[] = [
  {
    id: "ch-1",
    title: "Senior Financieel Medewerker",
    company: "Finova Group",
    location: "Almere",
    reward: 1500,
    status: "actief",
    introductions: 6,
    lastActivity: "2 uur geleden",
    href: "#",
  },
  {
    id: "ch-2",
    title: "Accountmanager Noord",
    company: "Horizon Sales",
    location: "Groningen",
    reward: 1000,
    status: "open",
    introductions: 3,
    lastActivity: "Gisteren",
    href: "#",
  },
  {
    id: "ch-3",
    title: "Product Owner",
    company: "Byteworks",
    location: "Utrecht",
    reward: 1750,
    status: "sluit_binnenkort",
    introductions: 8,
    lastActivity: "4 uur geleden",
    href: "#",
  },
  {
    id: "ch-4",
    title: "Operations Manager Bouw",
    company: "Bouw & Co",
    location: "Amsterdam",
    reward: 1250,
    status: "actief",
    introductions: 2,
    lastActivity: "Vandaag",
    href: "#",
  },
];

export const ATTENTION_CANDIDATES: AttentionCandidate[] = [
  {
    id: "at-1",
    name: "Mike Jansen",
    challengeTitle: "Senior Financieel Medewerker",
    kind: "wacht_beoordeling",
    detail: "Wacht al 5 dagen op beoordeling",
    daysWaiting: 5,
    href: "/recruitment/introducties/in-1",
  },
  {
    id: "at-2",
    name: "Sara Ahmed",
    challengeTitle: "Accountmanager Noord",
    kind: "intake_ontbreekt",
    detail: "Intake nog niet gepland",
    href: "#",
  },
  {
    id: "at-3",
    name: "Peter van Dijk",
    challengeTitle: "Product Owner",
    kind: "geen_feedback",
    detail: "Geen feedback ontvangen",
    daysWaiting: 3,
    href: "#",
  },
  {
    id: "at-4",
    name: "Noa Vermeer",
    challengeTitle: "Operations Manager Bouw",
    kind: "gesprek_gepland",
    detail: "Gesprek gepland voor donderdag",
    href: "#",
  },
  {
    id: "at-5",
    name: "Jamal El Amrani",
    challengeTitle: "Senior Werkvoorbereider",
    kind: "start_bevestigd",
    detail: "Startdatum bevestigd: 1 september",
    href: "#",
  },
];

export const PORTAL_REWARDS: PortalReward[] = [
  {
    id: "rw-1",
    candidateName: "Jamal El Amrani",
    challengeTitle: "Senior Werkvoorbereider",
    amount: 1250,
    kind: "kandidaat_gestart",
    detail: "Kandidaat gestart — wachtperiode loopt",
    href: "#",
  },
  {
    id: "rw-2",
    candidateName: "Fleur Hofman",
    challengeTitle: "HR Business Partner",
    amount: 1500,
    kind: "wachtperiode",
    detail: "Wachtperiode bijna voorbij (2 dagen)",
    href: "#",
  },
  {
    id: "rw-3",
    candidateName: "Bram Willems",
    challengeTitle: "Controller",
    amount: 1750,
    kind: "uitbetaling_gereed",
    detail: "Uitbetaling gereed voor goedkeuring",
    href: "#",
  },
];

export const PORTAL_ACTIVITY: PortalActivity[] = [
  { id: "ac-1", time: "09:14", text: "Joshua keurde introductie goed." },
  { id: "ac-2", time: "09:42", text: "Nieuwe kandidaat ontvangen." },
  { id: "ac-3", time: "10:15", text: "Challenge gepubliceerd." },
  { id: "ac-4", time: "11:05", text: "OTYS synchronisatie voltooid." },
  { id: "ac-5", time: "11:48", text: "Feedback gedeeld met referrer." },
];

export const AI_QUICK_ACTIONS: AIQuickAction[] = [
  { id: "ai-1", label: "Maak van OTYS-vacature een betere challenge" },
  { id: "ai-2", label: "Vat nieuwe introducties samen" },
  { id: "ai-3", label: "Welke challenges presteren slecht?" },
  { id: "ai-4", label: "Welke kandidaten verdienen prioriteit?" },
  { id: "ai-5", label: "Schrijf feedback voor een referrer" },
];

export const SYNC_ITEMS: SyncItem[] = [
  {
    id: "sy-1",
    level: "ok",
    label: "OTYS succesvol gesynchroniseerd",
  },
  {
    id: "sy-2",
    level: "warn",
    label: "1 vacature mist verplichte velden",
  },
  {
    id: "sy-3",
    level: "warn",
    label: "Laatste synchronisatie 18 minuten geleden",
  },
];

export function formatEuro(amount: number): string {
  return `€ ${amount.toLocaleString("nl-NL")}`;
}

export function introStatusLabel(status: IntroStatus): string {
  const map: Record<IntroStatus, string> = {
    nieuw: "Nieuw",
    in_beoordeling: "In beoordeling",
    goedgekeurd: "Goedgekeurd",
    afgewezen: "Afgewezen",
  };
  return map[status];
}

export function challengeStatusLabel(
  status: PortalChallenge["status"]
): string {
  const map = {
    open: "Open",
    actief: "Actief",
    sluit_binnenkort: "Sluit binnenkort",
  };
  return map[status];
}

export function attentionChipLabel(kind: AttentionKind): string {
  const map: Record<AttentionKind, string> = {
    wacht_beoordeling: "Wacht op beoordeling",
    intake_ontbreekt: "Intake ontbreekt",
    geen_feedback: "Geen feedback",
    gesprek_gepland: "Gesprek gepland",
    start_bevestigd: "Start bevestigd",
  };
  return map[kind];
}

export function rewardKindLabel(kind: RewardAttention): string {
  const map: Record<RewardAttention, string> = {
    kandidaat_gestart: "Kandidaat gestart",
    wachtperiode: "Wachtperiode",
    uitbetaling_gereed: "Uitbetaling gereed",
  };
  return map[kind];
}

export function getIntroductionById(id: string): PortalIntroduction | undefined {
  return PORTAL_INTRODUCTIONS.find((item) => item.id === id);
}

export function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";
  return "Goedenavond";
}
