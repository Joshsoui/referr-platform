"use client";

import {
  Banknote,
  Calendar,
  CheckCircle2,
  Eye,
  PartyPopper,
  Send,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import {
  groupMomentsByDay,
  formatRelativeTimeNl,
  type ActivityMoment,
  type MomentKind,
} from "@/lib/activityMoments";

const KIND_CONFIG: Record<
  MomentKind,
  { icon: LucideIcon; accent: string; ring: string }
> = {
  viewed: {
    icon: Eye,
    accent: "text-fk-secondary bg-fk-secondary/10",
    ring: "border-fk-secondary/20",
  },
  interview: {
    icon: Calendar,
    accent: "text-fk-primary bg-fk-primary/10",
    ring: "border-fk-primary/20",
  },
  proposal: {
    icon: Send,
    accent: "text-indigo-600 bg-indigo-50",
    ring: "border-indigo-200",
  },
  hired: {
    icon: PartyPopper,
    accent: "text-amber-600 bg-amber-50",
    ring: "border-amber-200",
  },
  reward: {
    icon: Banknote,
    accent: "text-emerald-700 bg-emerald-50",
    ring: "border-emerald-200",
  },
  submitted: {
    icon: CheckCircle2,
    accent: "text-fk-navy bg-fk-light",
    ring: "border-fk-primary/15",
  },
  attention: {
    icon: Eye,
    accent: "text-fk-primary bg-fk-primary/10",
    ring: "border-fk-primary/20",
  },
};

interface ActivityTimelineProps {
  moments: ActivityMoment[];
  title?: string;
  subtitle?: string;
  emptyTitle?: string;
  emptyBody?: string;
}

export function ActivityTimeline({
  moments,
  title = "Jouw activiteit",
  subtitle = "Momenten die ertoe doen",
  emptyTitle = "Nog geen momenten",
  emptyBody = "Zodra je iemand aandragen, verschijnen hier updates over gesprekken, plaatsingen en beloningen.",
}: ActivityTimelineProps) {
  const groups = groupMomentsByDay(moments);

  if (moments.length === 0) {
    return (
      <Card className="border-fk-primary/15 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-fk-primary/10 text-fk-primary">
          <Eye size={22} />
        </div>
        <h2 className="text-lg font-bold text-fk-navy">{emptyTitle}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-fk-navy/60">
          {emptyBody}
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-fk-primary/15">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-fk-navy">{title}</h2>
        <p className="mt-1 text-sm text-fk-navy/55">{subtitle}</p>
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-fk-secondary">
              {group.label}
            </p>
            <div className="relative space-y-3 pl-2">
              <div
                className="absolute bottom-2 left-[19px] top-2 w-px bg-fk-primary/10"
                aria-hidden
              />
              {group.moments.map((moment, index) => {
                const config = KIND_CONFIG[moment.kind];
                const Icon = config.icon;

                return (
                  <div
                    key={moment.id}
                    className="relative flex items-start gap-3 rounded-xl border border-transparent bg-fk-light/40 px-3 py-3 transition-colors duration-300 hover:border-fk-primary/15 hover:bg-fk-white"
                    style={{
                      animation: "fade-in-up 0.45s ease both",
                      animationDelay: `${index * 60}ms`,
                    }}
                  >
                    <div
                      className={`relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${config.ring} ${config.accent}`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-semibold text-fk-navy">{moment.title}</p>
                        <p className="shrink-0 text-xs text-fk-navy/40">
                          {formatRelativeTimeNl(moment.timestamp)}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-fk-navy/60">
                        {moment.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
