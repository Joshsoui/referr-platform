import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Account aanmaken",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
