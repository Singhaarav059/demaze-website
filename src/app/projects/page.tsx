import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/content/site";

export const metadata: Metadata = pageMeta(
  "Projects",
  "Explore 16 product engagements across AI, automotive, commerce, finance, healthcare, and more. The context, capabilities, and thinking behind the work.",
  "/projects",
);

type BentoTile = {
  no: string;
  title: string;
  slug: string;
  span: "span1" | "span2" | "span2row2";
  pastel: 1 | 2 | 3 | 4;
  image: string;
  alt: string;
};

const bentoTiles: BentoTile[] = [
  {
    no: "01",
    title: "AI-Based Software for Luxury Car Dealers",
    slug: "luxury-car-dealer-software",
    span: "span2row2",
    pastel: 1,
    image: "/project-car.webp",
    alt: "AI-based dealership platform for luxury car dealers",
  },
  {
    no: "02",
    title: "Investigative Case Management Software",
    slug: "investigative-case-management",
    span: "span2",
    pastel: 2,
    image: "/project-investigation.webp",
    alt: "Investigative case management software interface",
  },
  {
    no: "03",
    title: "Luxury eCommerce Platform",
    slug: "luxury-ecommerce-platform",
    span: "span1",
    pastel: 3,
    image: "/project-luxury.webp",
    alt: "AI-powered luxury eCommerce storefront",
  },
  {
    no: "04",
    title: "Senior Engagement Platform",
    slug: "senior-engagement-platform",
    span: "span1",
    pastel: 4,
    image: "/project-sukoon.webp",
    alt: "Senior engagement and support community platform",
  },
  {
    no: "05",
    title: "Multi-Vendor eCommerce Marketplace",
    slug: "multi-vendor-ecommerce-marketplace",
    span: "span2",
    pastel: 1,
    image: "/project-marketplace.webp",
    alt: "Multi-vendor eCommerce marketplace",
  },
  {
    no: "06",
    title: "Food & Grocery Delivery App",
    slug: "food-grocery-delivery-app",
    span: "span2row2",
    pastel: 2,
    image: "/project-grocery.webp",
    alt: "Food and grocery delivery app",
  },
  {
    no: "07",
    title: "CMA Report Generation Software",
    slug: "cma-report-generation-software",
    span: "span1",
    pastel: 3,
    image: "/project-cma.webp",
    alt: "CMA report generation software",
  },
  {
    no: "08",
    title: "Recruitment Platform",
    slug: "recruitment-platform",
    span: "span1",
    pastel: 4,
    image: "/project-recruitment.webp",
    alt: "Recruitment platform interface",
  },
];

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* HERO ------------------------------------------------------------ */}
      <section className="projects-hero">
        <div className="projects-hero-inner" data-reveal>
          <p className="eyebrow-dot">Our work</p>
          <h1 className="projects-hero-title">
            Products built for <em>real operations.</em>
          </h1>
          <p className="projects-hero-sub">
            AI systems, marketplaces, business platforms, and customer
            experiences designed to solve substantial problems.
          </p>
        </div>
      </section>

      {/* BENTO GRID ------------------------------------------------------ */}
      <section className="projects-bento-section">
        <div className="projects-bento">
          {bentoTiles.map((tile) => (
            <article
              className={`projects-tile projects-tile-${tile.span} projects-tile-pastel-${tile.pastel}`}
              data-reveal
              key={tile.slug}
            >
              <Link className="projects-tile-link" href={`/projects/${tile.slug}`}>
                <span className="projects-tile-media" data-parallax-img>
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    sizes="(max-width: 820px) 100vw, 50vw"
                    className="projects-tile-img"
                  />
                </span>
                <span className="projects-tile-overlay">
                  <span className="projects-tile-no">{tile.no}</span>
                  <h3 className="projects-tile-title">{tile.title}</h3>
                </span>
              </Link>
            </article>
          ))}
        </div>
        <p className="visually-hidden">
          Selected engagements. Imagery is illustrative and does not represent
          client data or live product screens.
        </p>
      </section>
    </main>
  );
}
