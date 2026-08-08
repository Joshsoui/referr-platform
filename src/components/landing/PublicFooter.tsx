import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/vacatures", label: "Ontdek challenges" },
      { href: "/#hoe-het-werkt", label: "Hoe het werkt" },
      { href: "/media", label: "Media" },
      { href: "/inloggen", label: "Inloggen" },
      { href: "/account-aanmaken", label: "Maak account aan" },
    ],
  },
  {
    title: "Info",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookies" },
      { href: "/voorwaarden", label: "Voorwaarden" },
      { href: "/beveiliging", label: "Beveiliging" },
      { href: "/toegankelijkheid", label: "Toegankelijkheid" },
      { href: "/investors", label: "Investors" },
    ],
  },
];

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-fk-navy/[0.06] bg-fk-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <BrandLogo height={28} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fk-navy/50">
            Iedereen kent talent. Ontdek challenges, introduceer iemand uit je
            netwerk en speel bij een succesvolle plaatsing een beloning vrij.
          </p>
        </div>
        {footerLinks.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-medium tracking-[0.14em] text-fk-navy/35">
              {group.title.toUpperCase()}
            </p>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fk-navy/55 transition-colors hover:text-fk-navy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-fk-navy/[0.06] px-4 py-5 text-center text-xs text-fk-navy/40 sm:px-6 lg:px-8">
        © {year} referr
      </div>
    </footer>
  );
}
