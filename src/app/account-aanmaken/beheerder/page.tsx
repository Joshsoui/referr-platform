import type { Metadata } from "next";
import { StaffRegisterForm } from "@/components/auth/StaffRegisterForm";

export const metadata: Metadata = {
  title: "Beheerderaccount aanmaken",
  robots: { index: false, follow: false },
};

export default function StaffRegisterPage() {
  const inviteConfigured = Boolean(process.env.ADMIN_BOOTSTRAP_TOKEN?.trim());

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <StaffRegisterForm inviteConfigured={inviteConfigured} />
    </div>
  );
}
