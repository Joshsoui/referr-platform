import { DISCLAIMER_TEXT } from "@/lib/investors/investorsData";

export function InvestorDisclaimer() {
  return (
    <aside
      className="border-t border-fk-navy/[0.06] bg-fk-light/50 px-4 py-8 sm:px-6 lg:px-8"
      aria-label="Disclaimer"
    >
      <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-fk-navy/40">
        {DISCLAIMER_TEXT}
      </p>
    </aside>
  );
}
