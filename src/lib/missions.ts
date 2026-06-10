import type { Candidate } from "@/types";
import type { Challenge, MissionTrackType } from "@/types/gamification";
import { CHALLENGES } from "@/lib/mockChallenges";

const STATUS_INDEX: Record<Candidate["status"], number> = {
  nieuw: 0,
  intake_gepland: 1,
  voorgesteld: 2,
  geplaatst: 3,
  proeftijd_gehaald: 4,
};

function countForTrack(
  candidates: Candidate[],
  referrerName: string,
  trackType: MissionTrackType
): number {
  const mine = candidates.filter((c) => c.referredBy === referrerName);

  switch (trackType) {
    case "tips":
      return mine.length;
    case "intake":
      return mine.filter((c) => STATUS_INDEX[c.status] >= 1).length;
    case "match":
      return mine.filter((c) => STATUS_INDEX[c.status] >= 3).length;
    case "keeper":
      return mine.filter((c) => c.status === "proeftijd_gehaald").length;
    default:
      return 0;
  }
}

export function syncMissions(
  candidates: Candidate[],
  referrerName: string
): Challenge[] {
  return CHALLENGES.map((mission) => {
    if (mission.isCommunity || mission.trackType === "manual") {
      return mission;
    }

    const trackType = mission.trackType ?? "manual";
    const current = countForTrack(candidates, referrerName, trackType);
    const status = current >= mission.target ? "completed" : "active";

    return { ...mission, current: Math.min(current, mission.target), status };
  });
}

export function getActiveMissions(challenges: Challenge[]): Challenge[] {
  return challenges.filter((c) => c.status === "active" && !c.isCommunity);
}

export function getCompletedMissions(challenges: Challenge[]): Challenge[] {
  return challenges.filter((c) => c.status === "completed");
}
