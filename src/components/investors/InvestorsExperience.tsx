"use client";

import { PublicFooter } from "@/components/landing/PublicFooter";
import { BusinessModel } from "./BusinessModel";
import { CompetitiveLandscape } from "./CompetitiveLandscape";
import { Defensibility } from "./Defensibility";
import { GrowthStrategy } from "./GrowthStrategy";
import { InvestmentAsk } from "./InvestmentAsk";
import { InvestorClosing } from "./InvestorClosing";
import { InvestorDisclaimer } from "./InvestorDisclaimer";
import { InvestorHero } from "./InvestorHero";
import { InvestorsGate } from "./InvestorsGate";
import { ProblemSection } from "./ProblemSection";
import { ProductFlow } from "./ProductFlow";
import { ProductRoadmap } from "./ProductRoadmap";
import { RevenueCalculator } from "./RevenueCalculator";
import { RiskValidation } from "./RiskValidation";
import { StakeholderValue } from "./StakeholderValue";
import { TeamSection } from "./TeamSection";

export function InvestorsExperience() {
  return (
    <InvestorsGate>
      <div className="landing-surface min-h-screen overflow-x-hidden bg-fk-white">
        <InvestorHero />
        <ProblemSection />
        <ProductFlow />
        <StakeholderValue />
        <BusinessModel />
        <RevenueCalculator />
        <GrowthStrategy />
        <CompetitiveLandscape />
        <Defensibility />
        <ProductRoadmap />
        <RiskValidation />
        <TeamSection />
        <InvestmentAsk />
        <InvestorClosing />
        <InvestorDisclaimer />
        <PublicFooter />
      </div>
    </InvestorsGate>
  );
}
