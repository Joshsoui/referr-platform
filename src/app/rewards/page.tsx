"use client";

import { Gift } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { RewardRules } from "@/components/RewardRules";
import { Card } from "@/components/ui/Card";

export default function RewardsPage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
              <Gift size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-fk-navy">
                Zo verdien je als Scout
              </h1>
              <p className="text-fk-navy/60">
                XP, Scout Score en cash — helder gescheiden
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <Card variant="highlight" className="mb-8 border-0">
            <p className="text-lg font-bold">Kernprincipe</p>
            <ul className="mt-3 space-y-2 text-sm text-fk-white/90">
              <li>XP verdien je met activiteit.</li>
              <li>Scout Score bouw je op met kwaliteit.</li>
              <li>Cash verdien je alleen met resultaat.</li>
            </ul>
          </Card>
        </FadeIn>

        <FadeIn delay={120}>
          <RewardRules />
        </FadeIn>
      </div>
    </div>
  );
}
