"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PortalIntroProvider } from "@/lib/recruitment/PortalIntroContext";
import { PortalDashboardHeader } from "./PortalDashboardHeader";
import { GreetingCard } from "./GreetingCard";
import { TodayCard } from "./TodayCard";
import { StatsCards } from "./StatsCards";
import { IntroductionsTable } from "./IntroductionsTable";
import { ChallengeCards } from "./ChallengeCards";
import { AttentionList } from "./AttentionList";
import { RewardWidget } from "./RewardWidget";
import { ActivityTimeline } from "./ActivityTimeline";
import { AIWidget } from "./AIWidget";
import { SyncWidget } from "./SyncWidget";

function Block({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function PortalDashboardContent() {
  return (
    <div className="min-h-screen bg-fk-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Block>
          <PortalDashboardHeader />
        </Block>

        <div className="mt-8 space-y-8 lg:mt-10">
          <Block delay={0.04}>
            <GreetingCard />
          </Block>

          <Block delay={0.08}>
            <TodayCard />
          </Block>

          <Block delay={0.12}>
            <StatsCards />
          </Block>

          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-start lg:gap-10">
            <div className="space-y-8">
              <Block delay={0.16}>
                <IntroductionsTable />
              </Block>
              <Block delay={0.2}>
                <ChallengeCards />
              </Block>
              <Block delay={0.24}>
                <AttentionList />
              </Block>
            </div>

            <div className="space-y-8 lg:sticky lg:top-24">
              <Block delay={0.18}>
                <ActivityTimeline />
              </Block>
              <Block delay={0.22}>
                <RewardWidget />
              </Block>
              <Block delay={0.26}>
                <AIWidget />
              </Block>
              <Block delay={0.3}>
                <SyncWidget />
              </Block>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortalDashboard() {
  return (
    <PortalIntroProvider>
      <PortalDashboardContent />
    </PortalIntroProvider>
  );
}
