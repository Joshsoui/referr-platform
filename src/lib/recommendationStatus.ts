import { formatCurrency } from "@/lib/xp";
import type { Candidate, CandidateStatus } from "@/types";
import type { CashStatus } from "@/types/incentives";

/** User-facing journey steps shown in the introduction pipeline. */
export const USER_JOURNEY_STEPS = [
  "Introductie ontvangen",
  "Profiel bekeken",
  "Kennismaking gepland",
  "In gesprek",
  "Geplaatst",
  "Beloning vrijgegeven",
] as const;

const STATUS_TO_JOURNEY_INDEX: Record<CandidateStatus, number> = {
  nieuw: 0,
  intake_gepland: 3,
  voorgesteld: 4,
  geplaatst: 5,
  proeftijd_gehaald: 5,
};

export function getUserJourneyIndex(candidate: Candidate): number {
  if (candidate.referralApproval === "afgekeurd") return -1;

  const base = STATUS_TO_JOURNEY_INDEX[candidate.status];
  if (candidate.status === "nieuw" && candidate.referralApproval === "goedgekeurd") {
    return 1;
  }
  if (
    candidate.status === "intake_gepland" &&
    candidate.referralApproval === "goedgekeurd"
  ) {
    return 3;
  }
  return base;
}

export function getUserStatusLabel(candidate: Candidate): string {
  if (candidate.referralApproval === "afgekeurd") {
    return "Niet geplaatst";
  }
  if (candidate.referralApproval === "pending" && candidate.status === "nieuw") {
    return "Introductie ontvangen";
  }

  const labels: Record<CandidateStatus, string> = {
    nieuw: "Profiel bekeken",
    intake_gepland: "Kennismaking gepland",
    voorgesteld: "In gesprek",
    geplaatst: "Geplaatst",
    proeftijd_gehaald: "Geplaatst",
  };

  return labels[candidate.status];
}

export function getReferralStatusLabel(candidate: Candidate): string {
  if (candidate.referralApproval === "afgekeurd") return "Niet doorgegaan";
  if (candidate.status === "nieuw" && candidate.referralApproval === "pending") {
    return "Tip ontvangen";
  }
  if (candidate.status === "nieuw" && candidate.referralApproval === "goedgekeurd") {
    return "Wordt bekeken";
  }
  if (candidate.status === "intake_gepland") return "Wordt bekeken";
  if (candidate.status === "voorgesteld") return "In gesprek";
  if (candidate.status === "geplaatst") return "Aangenomen";
  if (candidate.status === "proeftijd_gehaald") {
    return candidate.cashStatus === "retentie_goedgekeurd"
      ? "Uitbetaald"
      : "Reward in behandeling";
  }
  return "Tip ontvangen";
}

export function getReferralActionHint(candidate: Candidate): string | null {
  if (candidate.referralApproval === "afgekeurd") {
    return "Deze tip is afgesloten. Je kunt direct een nieuwe challenge delen.";
  }
  if (candidate.status === "nieuw" && candidate.referralApproval === "pending") {
    return "We beoordelen de tip. Je ontvangt een update zodra het profiel is bekeken.";
  }
  if (candidate.status === "nieuw" && candidate.referralApproval === "goedgekeurd") {
    return "Profiel wordt gedeeld met de partner. Je hoeft nu niets te doen.";
  }
  if (candidate.status === "intake_gepland") {
    return "Kennismaking wordt ingepland. Je krijgt bericht zodra er beweging is.";
  }
  if (candidate.status === "voorgesteld") {
    return "Kandidaat is in gesprek. Volgende update volgt na terugkoppeling.";
  }
  if (candidate.status === "geplaatst") {
    return "Plaatsing is rond. Reward wordt nu verwerkt.";
  }
  if (candidate.status === "proeftijd_gehaald") {
    if (candidate.cashStatus === "retentie_goedgekeurd") {
      return "Reward is uitbetaald.";
    }
    return "Plaatsing is bevestigd. Reward wordt afgerond.";
  }
  return null;
}

export function getUserCashLabel(cashStatus: CashStatus): string | null {
  switch (cashStatus) {
    case "geen_cash":
      return null;
    case "intake_in_behandeling":
    case "plaatsing_in_behandeling":
      return "In behandeling";
    case "intake_goedgekeurd":
    case "plaatsing_goedgekeurd":
      return "Vrijgespeeld";
    case "retentie_goedgekeurd":
      return "Beschikbaar voor uitbetaling";
    case "afgekeurd":
      return "Niet toegekend";
    default:
      return null;
  }
}

export function getNextStepLabel(candidate: Candidate): string | null {
  if (candidate.referralApproval === "afgekeurd") return null;

  if (candidate.status === "proeftijd_gehaald") {
    if (candidate.cashStatus === "retentie_goedgekeurd") return null;
    if (
      candidate.cashStatus === "intake_in_behandeling" ||
      candidate.cashStatus === "plaatsing_in_behandeling" ||
      candidate.cashStatus === "geen_cash"
    ) {
      return "Beloning wordt verwerkt";
    }
    return null;
  }

  if (candidate.status === "geplaatst") {
    if (
      candidate.cashStatus === "intake_in_behandeling" ||
      candidate.cashStatus === "plaatsing_in_behandeling"
    ) {
      return "Beloning wordt verwerkt";
    }
  }

  const index = getUserJourneyIndex(candidate);
  if (index < 0 || index >= USER_JOURNEY_STEPS.length - 1) return null;
  return USER_JOURNEY_STEPS[index + 1];
}

export function getStatusChangeNotification(
  candidateName: string,
  newStatus: CandidateStatus
): { title: string; message: string; kind: "progress" | "celebration" } {
  switch (newStatus) {
    case "intake_gepland":
      return {
        kind: "progress",
        title: "Eerste gesprek gepland",
        message: `Er staat een gesprek gepland voor ${candidateName}.`,
      };
    case "voorgesteld":
      return {
        kind: "progress",
        title: "Voorstel gedaan",
        message: `${candidateName} is voorgesteld bij de werkgever.`,
      };
    case "geplaatst":
      return {
        kind: "celebration",
        title: "Kandidaat aangenomen!",
        message: `${candidateName} is aangenomen. Goed gedaan.`,
      };
    case "proeftijd_gehaald":
      return {
        kind: "celebration",
        title: "Succesvolle plaatsing!",
        message: `${candidateName} is succesvol geplaatst — maximale beloning in zicht.`,
      };
    default:
      return {
        kind: "progress",
        title: "Introductie bijgewerkt",
        message: `De status van ${candidateName} is bijgewerkt.`,
      };
  }
}

export function getCashNotification(
  candidateName: string,
  cashStatus: CashStatus,
  amount?: number
): { title: string; message: string; kind: "reward" | "progress" | "rejected" } | null {
  switch (cashStatus) {
    case "intake_in_behandeling":
    case "plaatsing_in_behandeling":
      return {
        kind: "progress",
        title: "Beloning wordt verwerkt",
        message: `De beloning voor ${candidateName} wordt beoordeeld.`,
      };
    case "intake_goedgekeurd":
    case "plaatsing_goedgekeurd":
      return amount
        ? {
            kind: "reward",
            title: "Beloning goedgekeurd",
            message: `Je beloning van ${formatCurrency(amount)} voor ${candidateName} is goedgekeurd.`,
          }
        : {
            kind: "reward",
            title: "Beloning goedgekeurd",
            message: `Je beloning voor ${candidateName} is goedgekeurd.`,
          };
    case "retentie_goedgekeurd":
      return amount
        ? {
            kind: "reward",
            title: "Beloning uitbetaald",
            message: `Je beloning van ${formatCurrency(amount)} voor ${candidateName} is uitbetaald.`,
          }
        : {
            kind: "reward",
            title: "Beloning uitbetaald",
            message: `Je beloning voor ${candidateName} is uitbetaald.`,
          };
    case "afgekeurd":
      return {
        kind: "rejected",
        title: "Introductie niet geaccepteerd",
        message: `De introductie van ${candidateName} past helaas niet bij de vacature.`,
      };
    default:
      return null;
  }
}
