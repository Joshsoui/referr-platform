import type { Metadata } from "next";
import { INVESTOR_META } from "@/lib/investors/investorsData";
import { InvestorsExperience } from "@/components/investors/InvestorsExperience";

export const metadata: Metadata = {
  title: {
    absolute: INVESTOR_META.title,
  },
  description: INVESTOR_META.description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvestorsPage() {
  return <InvestorsExperience />;
}
