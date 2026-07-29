"use client";

import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { COMMUNITY_PULSE } from "@/lib/communityPulse";

const TONE_DOT: Record<string, string> = {
  reward: "bg-emerald-500",
  hire: "bg-amber-500",
  vacancy: "bg-fk-primary",
  milestone: "bg-fk-secondary",
};

export function CommunityPulse() {
  return (
    <Card className="border-fk-primary/15">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={16} className="text-fk-secondary" />
        <div>
          <h2 className="text-lg font-bold text-fk-navy">Community</h2>
          <p className="text-sm text-fk-navy/55">Wat er zojuist gebeurde</p>
        </div>
      </div>

      <div className="space-y-2">
        {COMMUNITY_PULSE.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-xl bg-fk-light/50 px-3 py-2.5 transition-colors duration-300 hover:bg-fk-light"
            style={{
              animation: "fade-in-up 0.4s ease both",
              animationDelay: `${index * 50}ms`,
            }}
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${TONE_DOT[item.tone]}`}
              aria-hidden
            />
            <p className="text-sm text-fk-navy/75">{item.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
