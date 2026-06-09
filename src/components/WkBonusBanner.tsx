import { Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function WkBonusBanner() {
  const bonuses = [
    { trigger: "Nederland wint?", reward: "+50 XP" },
    { trigger: "Nederland scoort 3 doelpunten?", reward: "+25 XP" },
    { trigger: "Nederland houdt de nul?", reward: "+10 XP" },
  ];

  return (
    <Card
      variant="highlight"
      className="mb-8 overflow-hidden border-0 p-0"
    >
      <div className="relative p-6 sm:p-8">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fk-white/10 blur-2xl" />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-fk-white/5 blur-xl" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              ⚽
            </span>
            <h2 className="text-xl font-extrabold sm:text-2xl">WK Bonus XP</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {bonuses.map((bonus) => (
              <div
                key={bonus.trigger}
                className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-sm font-medium text-fk-white/90">
                  {bonus.trigger}
                </p>
                <p className="mt-1 flex items-center gap-1 text-lg font-extrabold">
                  <Zap size={16} className="text-fk-white/80" />
                  Iedere Scout ontvangt {bonus.reward}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
