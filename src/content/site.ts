/**
 * Absolute origin, needed for canonical URLs, OG image URLs and the sitemap.
 * Override per environment; the default is the domain the contact address
 * already points at. Hosts often inject the variable as an empty string, and
 * a bare hostname is common, so both are normalised rather than trusted.
 */
function resolveSiteUrl(): string {
  const fallback = "https://www.demazetech.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return fallback;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return fallback;
  }
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "Demaze Technologies",
  eyebrow: "EXPERTISE / INNOVATION / PARTNERSHIP",
  tagline: "Complexity, made useful.",
  intro:
    "Demaze is an AI and software engineering studio. We turn complex operations into intuitive products, from the first data model to the software your business runs on.",
  email: "contact@demazetech.com",
  address:
    "A-804, Ganesh Glory 11, Jagatpur Road, Sarkhej - Gandhinagar Hwy, Gota, Ahmedabad, Gujarat 382470",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Demaze+Technologies+A-804+Ganesh+Glory+11+Jagatpur+Road+Gota+Ahmedabad",
  logo: "/demaze-logo.png",
  founder: {
    name: "Krupal Chaudhary",
    title: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/krupalchaudhary-ai/",
    photo: "/founder.webp",
    // Set at ~60px, the largest sustained block of text on the site, so it has
    // to be worth that size. The previous version ("through strategic use of
    // your vision and data, we design AI solutions that make your brand stand
    // out and drive revenue growth") was six lines of buzzwords at display
    // scale, which made the biggest thing on the page the emptiest.
    quote:
      "Most AI projects die between the demo and production. We take the boring half seriously: the data model, the edge cases, the handover. That is the half that decides whether any of it is still running a year later.",
  },
  stats: [
    { value: 45, suffix: "+", label: "Projects Delivered" },
    { value: 10, prefix: "$", suffix: "M+", label: "Client Value Generated" },
    { value: 35, suffix: "+", label: "Expert Team Members" },
    { value: 6, suffix: "+", label: "Years of Excellence" },
  ] as { value: number; prefix?: string; suffix: string; label: string }[],
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  footerNav: [
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About us", href: "/about-us" },
    { label: "Contact us", href: "/contact-us" },
  ],
  legalNav: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

/**
 * The redesigned hero renders its own stats bar, distinct from `site.stats`
 * (which about-us, contact-us and the home-studio block read by index). Two of
 * these figures do not exist in site.stats, and "4.9/5" has no clean
 * prefix/suffix, so each entry carries a pre-formatted `display` string instead
 * of the numeric {value, prefix?, suffix} shape.
 */
export const heroStats: { display: string; label: string }[] = [
  { display: "45+", label: "Projects Delivered" },
  { display: "$10M+", label: "Client Value Generated" },
  { display: "50+", label: "Teams Empowered" },
  { display: "4.9/5", label: "Client Satisfaction" },
];

/** Brand names for the hero trust row; markup and screen-reader text share this list. */
export const heroTrustLogos = [
  "OpenAI",
  "Shopify",
  "Vercel",
  "aws",
  "Google Cloud",
];

/**
 * Every page needs a canonical and its own share card. Building them from one
 * helper keeps a new page from silently shipping with neither.
 */
export function pageMeta(title: string, description: string, path: string) {
  const url = `${siteUrl}${path}`;
  // The generated card has to be named explicitly. Next only auto-attaches
  // opengraph-image.tsx to its own segment, and declaring `openGraph` here
  // replaces the inherited object, so sub-pages would ship with no image.
  const images = [
    { url: "/opengraph-image", width: 1200, height: 630, alt: title },
  ];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website" as const,
      images,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images,
    },
  };
}
