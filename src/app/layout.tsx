import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { pageMeta, site, siteUrl } from "@/content/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-bricolage",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
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
    <html lang="en" className={`${bricolage.variable} ${interTight.variable}`}>
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
