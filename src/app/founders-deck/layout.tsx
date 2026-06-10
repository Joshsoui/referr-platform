import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Private Founder Deck · FK Scout Engine",
  description: "Private founder and investor deck for FK Scout Engine.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function FoundersDeckLayout({ children }: { children: ReactNode }) {
  return children;
}
