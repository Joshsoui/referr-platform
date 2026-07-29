import type { Candidate } from "@/types";
import {
  getUserCashLabel,
  getUserStatusLabel,
} from "@/lib/recommendationStatus";
import { formatCurrency } from "@/lib/xp";

export type MomentKind =
  | "viewed"
  | "interview"
  | "proposal"
  | "hired"
  | "reward"
  | "submitted"
  | "attention";

export interface ActivityMoment {
  id: string;
  kind: MomentKind;
  title: string;
  detail: string;
  timestamp: string;
  candidateName: string;
}

function momentFromCandidate(candidate: Candidate): ActivityMoment {
  const cashLabel = getUserCashLabel(candidate.cashStatus);
  const statusLabel = getUserStatusLabel(candidate);

  if (
    candidate.cashStatus === "retentie_goedgekeurd" ||
    candidate.cashStatus === "plaatsing_goedgekeurd" ||
    candidate.cashStatus === "intake_goedgekeurd"
  ) {
    return {
      id: `${candidate.id}-reward`,
      kind: "reward",
      title: cashLabel ?? "Beloning goedgekeurd",
      detail: `${candidate.name} · ${statusLabel}`,
      timestamp: candidate.createdAt,
      candidateName: candidate.name,
    };
  }

  if (
    candidate.cashStatus === "intake_in_behandeling" ||
    candidate.cashStatus === "plaatsing_in_behandeling"
  ) {
    return {
      id: `${candidate.id}-processing`,
      kind: "reward",
      title: "Beloning wordt verwerkt",
      detail: `${candidate.name} · ${statusLabel}`,
      timestamp: candidate.createdAt,
      candidateName: candidate.name,
    };
  }

  if (candidate.status === "geplaatst" || candidate.status === "proeftijd_gehaald") {
    return {
      id: `${candidate.id}-hired`,
      kind: "hired",
      title: "Kandidaat aangenomen",
      detail: `${candidate.name} · ${candidate.sector}`,
      timestamp: candidate.createdAt,
      candidateName: candidate.name,
    };
  }

  if (candidate.status === "voorgesteld") {
    return {
      id: `${candidate.id}-proposal`,
      kind: "proposal",
      title: "Voorstel gedaan",
      detail: `${candidate.name} · werkgever is in gesprek`,
      timestamp: candidate.createdAt,
      candidateName: candidate.name,
    };
  }

  if (candidate.status === "intake_gepland") {
    return {
      id: `${candidate.id}-interview`,
      kind: "interview",
      title: "Eerste gesprek gepland",
      detail: `${candidate.name} · ${candidate.sector}`,
      timestamp: candidate.createdAt,
      candidateName: candidate.name,
    };
  }

  if (candidate.referralApproval === "goedgekeurd") {
    return {
      id: `${candidate.id}-viewed`,
      kind: "viewed",
      title: "Introductie bekeken",
      detail: `${candidate.name} · werkgever heeft je introductie gezien`,
      timestamp: candidate.createdAt,
      candidateName: candidate.name,
    };
  }

  return {
    id: `${candidate.id}-submitted`,
    kind: "submitted",
    title: "Introductie verstuurd",
    detail: `${candidate.name} · wacht op beoordeling`,
    timestamp: candidate.createdAt,
    candidateName: candidate.name,
  };
}

export function buildPersonalMoments(
  candidates: Candidate[]
): ActivityMoment[] {
  return [...candidates]
    .map(momentFromCandidate)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
}

export function buildSinceLastVisitItems(
  candidates: Candidate[],
  _lastVisitAt: string | null,
  matchingVacancies: number,
  cashPending = 0
): string[] {
  const moments = buildPersonalMoments(candidates);
  const items = moments.slice(0, 3).map((m) => {
    if (m.kind === "reward") {
      return `${m.title} voor ${m.candidateName}.`;
    }
    if (m.kind === "viewed") {
      return `Je introductie van ${m.candidateName} is bekeken.`;
    }
    if (m.kind === "interview") {
      return `Er is een gesprek gepland voor ${m.candidateName}.`;
    }
    if (m.kind === "hired") {
      return `${m.candidateName} is aangenomen.`;
    }
    if (m.kind === "proposal") {
      return `Er is een voorstel gedaan voor ${m.candidateName}.`;
    }
    return `Introductie van ${m.candidateName} is verstuurd.`;
  });

  if (cashPending > 0) {
    items.unshift(
      `${formatCurrency(cashPending)} beloning wordt verwerkt.`
    );
  }

  if (matchingVacancies > 0) {
    items.push(
      matchingVacancies === 1
        ? "1 nieuwe vacature past bij jouw netwerk."
        : `${matchingVacancies} nieuwe vacatures passen bij jouw netwerk.`
    );
  }

  if (items.length === 0) {
    return [
      "Nog geen nieuwe updates. Draag iemand aan of bekijk openstaande vacatures.",
    ];
  }

  return items.slice(0, 5);
}

export function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Goedemorgen";
  if (hour < 18) return "Goedemiddag";
  return "Goedenavond";
}

export interface NetworkImpactStats {
  introductions: number;
  interviews: number;
  placements: number;
  earned: number;
  careersChanged: number;
}

export function getNetworkImpact(
  candidates: Candidate[],
  cashEarned: number
): NetworkImpactStats {
  const introductions = candidates.length;
  const interviews = candidates.filter(
    (c) =>
      c.status === "intake_gepland" ||
      c.status === "voorgesteld" ||
      c.status === "geplaatst" ||
      c.status === "proeftijd_gehaald"
  ).length;
  const placements = candidates.filter(
    (c) => c.status === "geplaatst" || c.status === "proeftijd_gehaald"
  ).length;

  return {
    introductions,
    interviews,
    placements,
    earned: cashEarned,
    careersChanged: placements,
  };
}

export function formatDayGroupLabel(timestamp: string, now = new Date()): string {
  const date = new Date(timestamp);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Vandaag";
  if (diffDays === 1) return "Gisteren";
  return date.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function groupMomentsByDay(
  moments: ActivityMoment[]
): { label: string; moments: ActivityMoment[] }[] {
  const groups = new Map<string, ActivityMoment[]>();

  for (const moment of moments) {
    const label = formatDayGroupLabel(moment.timestamp);
    const existing = groups.get(label) ?? [];
    existing.push(moment);
    groups.set(label, existing);
  }

  return Array.from(groups.entries()).map(([label, items]) => ({
    label,
    moments: items,
  }));
}

export function formatImpactEarned(amount: number): string {
  return formatCurrency(amount);
}

/** Relative time for nl-NL UI (calm, human). */
export function formatRelativeTimeNl(
  timestamp: string,
  now = new Date()
): string {
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 60) return "Zojuist";
  if (diffHours < 24) {
    return diffHours === 1 ? "1 uur geleden" : `${diffHours} uur geleden`;
  }
  if (diffDays === 1) return "Gisteren";
  if (diffDays < 7) return `${diffDays} dagen geleden`;
  return date.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
  });
}
