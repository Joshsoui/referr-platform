import {
  Flame,
  Medal,
  TrendingUp,
  Trophy,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import type { FeedActivity, FeedActivityType } from "@/types/gamification";
import { FEED_ACTIVITIES } from "@/lib/mockActivities";

const ACTIVITY_ICONS: Record<FeedActivityType, LucideIcon> = {
  referral: UserPlus,
  challenge: Trophy,
  level: Medal,
  placement: TrendingUp,
  streak: Flame,
};

const ACTIVITY_COLORS: Record<FeedActivityType, string> = {
  referral: "bg-fk-primary/10 text-fk-primary",
  challenge: "bg-amber-100 text-amber-700",
  level: "bg-violet-100 text-violet-700",
  placement: "bg-emerald-100 text-emerald-700",
  streak: "bg-orange-100 text-orange-700",
};

interface ActivityFeedProps {
  activities?: FeedActivity[];
  limit?: number;
}

export function ActivityFeed({
  activities = FEED_ACTIVITIES,
  limit,
}: ActivityFeedProps) {
  const items = limit ? activities.slice(0, limit) : activities;

  return (
    <div className="space-y-0 divide-y divide-fk-primary/5">
      {items.map((activity, i) => {
        const Icon = ACTIVITY_ICONS[activity.type];
        const colorClass = ACTIVITY_COLORS[activity.type];

        return (
          <div
            key={activity.id}
            className={`flex items-start gap-4 py-4 first:pt-0 last:pb-0 ${
              i === 0 ? "animate-slide-in-right" : ""
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorClass}`}
            >
              <Icon size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-fk-navy">
                <span className="font-bold">{activity.userName}</span>{" "}
                {activity.text}
              </p>
              <p className="mt-1 text-xs text-fk-navy/45">{activity.timeAgo}</p>
            </div>

            <div className="shrink-0 text-right">
              {activity.xp !== undefined && (
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  +{activity.xp} XP
                </span>
              )}
              {activity.badgeLabel && (
                <span className="inline-flex rounded-full bg-fk-primary-muted px-3 py-1 text-xs font-bold text-fk-primary">
                  {activity.badgeLabel}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
