/**
 * Absolute origin, needed for canonical URLs, OG image URLs and the sitemap.
 * Override per environment; the default is the domain the contact address
 * already points at.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.demazetech.com"
).replace(/\/$/, "");

export const site = {
  name: "Demaze Technologies",
  eyebrow: "EXPERTISE / INNOVATION / PARTNERSHIP",
  tagline: "Your Strategic Partner in Building Scalable AI Products",
  intro:
    "We combine AI, software engineering, and automation with deep industry expertise to build scalable, sustainable solutions, working alongside you as a trusted, long-term partner.",
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
    photo: "/krupal-chaudhary.jpg",
    quote:
      "Through strategic use of your vision and data, we design AI solutions that make your brand stand out and drive revenue growth, leading execution with focus and accountability.",
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
};

/**
 * Every page needs a canonical and its own share card. Building them from one
 * helper keeps a new page from silently shipping with neither.
 */
export function pageMeta(title: string, description: string, path: string) {
  const url = `${siteUrl}${path}`;
  // The generated card has to be named explicitly. Next only auto-attaches
  // opengraph-image.tsx to its own segment, and declaring `openGraph` here
  // replaces the inherited object, so sub-pages would ship with no image.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: site.name, type: "website" as const, images },
    twitter: { card: "summary_large_image" as const, title, description, images },
  };
}
