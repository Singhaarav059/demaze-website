import type { Metadata } from "next";
import {
  Manrope,
  Source_Serif_4,
  Nanum_Pen_Script,
  JetBrains_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionControl from "@/components/MotionControl";
import { pageMeta, site, siteUrl } from "@/content/site";

/**
 * Four faces now instead of three, following the redesign's indigo/orange
 * system (7shifts) with a serif headline pairing and hand-drawn accent
 * borrowed from Ditto. Manrope is the geometric grotesque that carries every
 * UI surface, nav link and paragraph. Source Serif 4 is the accent voice
 * reserved for the hero and section-level display headings, never body or
 * UI. Nanum Pen Script is the single hand-drawn flourish under one hero
 * keyword, and never appears anywhere else. JetBrains Mono keeps carrying
 * the eyebrow labels and figures, unchanged from before.
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-source-serif",
});

const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nanum-pen",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
});

/**
 * Hero-only for now (the Tedy-style poster headline). Kept separate from
 * --font-sans so the rest of the site's Manrope pairing is untouched until
 * this direction is confirmed for other sections.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
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
    streetAddress:
      "A-804, Ganesh Glory 11, Jagatpur Road, Sarkhej - Gandhinagar Hwy, Gota",
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
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "SaaS",
    "Cloud Engineering",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sourceSerif.variable} ${nanumPen.variable} ${jetbrains.variable} ${inter.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <MotionControl />
      </body>
    </html>
  );
}
