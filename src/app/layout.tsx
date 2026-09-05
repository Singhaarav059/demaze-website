import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { pageMeta, site, siteUrl } from "@/content/site";

/**
 * Three faces, three jobs. The previous pair was Bricolage Grotesque over
 * Inter Tight: two grotesques, so the site paid for two downloads and got one
 * voice, and a section headline was indistinguishable from a card headline.
 * A serif display against a sans UI is the contrast that was missing, and the
 * mono carries every index, eyebrow and figure number.
 */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMeta(`${site.name} · ${site.tagline}`, site.intro, "/"),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
};

/**
 * Organization schema. A studio with one office and a named founder is exactly
 * what this markup is for, and search results for an agency lean on it.
 */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.intro,
  url: siteUrl,
  email: site.email,
  image: `${siteUrl}${site.logo}`,
  logo: `${siteUrl}${site.logo}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "A-804, Ganesh Glory 11, Jagatpur Road, Sarkhej - Gandhinagar Hwy, Gota",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "382470",
    addressCountry: "IN",
  },
  founder: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.title,
    sameAs: [site.founder.linkedin],
  },
  areaServed: "Worldwide",
  knowsAbout: ["Artificial Intelligence", "Machine Learning", "SaaS", "Cloud Engineering"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
