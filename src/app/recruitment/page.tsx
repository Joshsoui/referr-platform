import type { Metadata } from "next";
import { PortalDashboard } from "@/components/recruitment/PortalDashboard";

export const metadata: Metadata = {
  title: "Beheeromgeving · Dashboard",
  description:
    "Centrale werkplek voor recruiters: acties van vandaag, introducties, challenges en beloningen.",
  robots: { index: false, follow: false },
};

export default function RecruitmentPortalPage() {
  return <PortalDashboard />;
}
