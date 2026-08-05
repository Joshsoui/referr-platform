import type { Metadata, Viewport } from "next";
import { ComingSoonExperience } from "@/components/landing/ComingSoonExperience";

export const metadata: Metadata = {
  title: "referr – Coming soon",
  description: "Ken iemand. Maak het verschil. referr komt eraan.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.referr.nl" },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

export default function ComingSoonPage() {
  return <ComingSoonExperience />;
}
