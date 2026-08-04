import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "referr – Ken iemand. Maak het verschil.",
    template: "%s · referr",
  },
  description:
    "Ontdek challenges, introduceer iemand uit je netwerk en volg iedere stap. Bij een succesvolle plaatsing speel je een echte beloning vrij.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  applicationName: "referr",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/brand/manifest.webmanifest",
  openGraph: {
    title: "referr – Ken iemand. Maak het verschil.",
    description:
      "Ontdek challenges, introduceer iemand uit je netwerk en volg iedere stap.",
    locale: "nl_NL",
    type: "website",
    siteName: "referr",
    images: [
      {
        url: "/brand/og.png",
        width: 1200,
        height: 630,
        alt: "referr",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ff4d59",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
