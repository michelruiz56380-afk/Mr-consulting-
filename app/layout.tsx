import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollEffects from "@/components/ScrollEffects";
import { site } from "@/lib/content";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MR Consulting — Conseil indépendant : accompagnement, audit, IA et création",
    template: "%s — MR Consulting",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: "MR Consulting — Nous rendons les technologies utiles et maîtrisées",
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  founder: { "@type": "Person", name: site.founder },
  areaServed: "FR",
  knowsAbout: ["Accompagnement stratégique", "Audit qualité", "Intelligence artificielle", "Identité de marque", "Création web"],
};

const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <head>
        {/* Active les états initiaux des animations uniquement si JS est disponible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <SmoothScroll />
        <ScrollEffects />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
        {plausible ? (
          <Script defer data-domain={plausible} src="https://plausible.io/js/script.outbound-links.js" strategy="afterInteractive" />
        ) : null}
      </body>
    </html>
  );
}
