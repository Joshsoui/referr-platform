export interface CommunityPulseItem {
  id: string;
  text: string;
  tone: "reward" | "hire" | "vacancy" | "milestone";
}

/** Subtle community activity — no social mechanics. */
export const COMMUNITY_PULSE: CommunityPulseItem[] = [
  {
    id: "p1",
    text: "Iemand ontving zojuist een beloning.",
    tone: "reward",
  },
  {
    id: "p2",
    text: "Iemand hielp iemand aan een nieuwe baan.",
    tone: "hire",
  },
  {
    id: "p3",
    text: "Nieuwe vacature toegevoegd in Techniek.",
    tone: "vacancy",
  },
  {
    id: "p4",
    text: "Iemand behaalde de mijlpaal Eerste plaatsing.",
    tone: "milestone",
  },
];
