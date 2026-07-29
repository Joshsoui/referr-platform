"use client";

import { PublicFooter } from "@/components/landing/PublicFooter";
import { ApproachComparison } from "./ApproachComparison";
import { BusinessModel } from "./BusinessModel";
import { CollaborationNeeds } from "./CollaborationNeeds";
import { CompetitiveLandscape } from "./CompetitiveLandscape";
import { Defensibility } from "./Defensibility";
import { GoToMarket } from "./GoToMarket";
import { GrowthStrategy } from "./GrowthStrategy";
import { InvestmentAsk } from "./InvestmentAsk";
import { InvestmentThesis } from "./InvestmentThesis";
import { InvestorClosing } from "./InvestorClosing";
import { InvestorDisclaimer } from "./InvestorDisclaimer";
import { InvestorHero } from "./InvestorHero";
import { InvestorsGate } from "./InvestorsGate";
import { MarketOpportunity } from "./MarketOpportunity";
import { MarketShift } from "./MarketShift";
import { Milestones } from "./Milestones";
import { NetworkFlywheel } from "./NetworkFlywheel";
import { ProblemSection } from "./ProblemSection";
import { ProductFlow } from "./ProductFlow";
import { ProductRoadmap } from "./ProductRoadmap";
import { RevenueCalculator } from "./RevenueCalculator";
import { RiskValidation } from "./RiskValidation";
import { StakeholderValue } from "./StakeholderValue";
import { TeamSection } from "./TeamSection";
import { UnitEconomics } from "./UnitEconomics";

export function InvestorsExperience() {
  return (
    <InvestorsGate>
      <div className="landing-surface min-h-screen overflow-x-hidden bg-fk-white">
        <InvestorHero />
        <InvestmentThesis />
        <ProblemSection />
        <ApproachComparison />
        <MarketShift />
        <ProductFlow />
        <StakeholderValue />
        <BusinessModel />
        <RevenueCalculator />
        <UnitEconomics />
        <NetworkFlywheel />
        <GrowthStrategy />
        <GoToMarket />
        <MarketOpportunity />
        <CompetitiveLandscape />
        <Defensibility />
        <ProductRoadmap />
        <RiskValidation />
        <TeamSection />
        <CollaborationNeeds />
        <InvestmentAsk />
        <Milestones />
        <InvestorClosing />
        <InvestorDisclaimer />
        <PublicFooter />
      </div>
    </InvestorsGate>
  );
}
