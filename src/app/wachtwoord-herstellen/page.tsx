import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Wachtwoord herstellen",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <ResetPasswordForm token={params.token ?? ""} />
    </div>
  );
}
