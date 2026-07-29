import type { Metadata } from "next";
import { LandingExperience } from "@/components/landing/LandingExperience";

export const metadata: Metadata = {
  title: "referr – Ken iemand. Maak het verschil.",
  description:
    "Ontdek challenges, introduceer iemand uit je netwerk en volg iedere stap. Bij een succesvolle plaatsing speel je een echte beloning vrij.",
  alternates: { canonical: "/" },
};

export default function LandingPage() {
  return <LandingExperience />;
}
