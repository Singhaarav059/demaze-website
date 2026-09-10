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
  title: string;
  slug: string;
  span: "span1" | "span2" | "span2row2";
  image: string;
  alt: string;
};

// All 16 engagements, in the canonical order, each with its real image. The
// span pattern repeats every four tiles so the bento stays visually balanced
// while carrying the full set with nothing left out. The two-digit index and
// pastel are derived at render time.
const bentoSource: Omit<BentoTile, "span">[] = [
  {
    title: "AI-Based Software for Luxury Car Dealers",
    slug: "luxury-car-dealer-software",
    image: "/project-car.webp",
    alt: "AI-based dealership platform for luxury car dealers",
  },
  {
    title: "Investigative Case Management Software",
    slug: "investigative-case-management",
    image: "/project-investigation.webp",
    alt: "Investigative case management software interface",
  },
  {
    title: "AI-Powered Luxury eCommerce Platform",
    slug: "luxury-ecommerce-platform",
    image: "/project-luxury.webp",
    alt: "AI-powered luxury eCommerce storefront",
  },
  {
    title: "Senior Engagement & Support Platform",
    slug: "senior-engagement-platform",
    image: "/project-sukoon.webp",
    alt: "Senior engagement and support community platform",
  },
  {
    title: "Multi-Vendor eCommerce Marketplace",
    slug: "multi-vendor-ecommerce-marketplace",
    image: "/project-marketplace.webp",
    alt: "Multi-vendor eCommerce marketplace",
  },
  {
    title: "Food & Grocery Delivery App",
    slug: "food-grocery-delivery-app",
    image: "/project-grocery.webp",
    alt: "Food and grocery delivery app",
  },
  {
    title: "Car Service & Customer Engagement Platform",
    slug: "car-service-engagement-platform",
    image: "/project-car-service.webp",
    alt: "Car service and customer engagement platform",
  },
  {
    title: "B2B Gift Marketplace",
    slug: "b2b-gift-marketplace",
    image: "/project-gifting.webp",
    alt: "B2B gift marketplace platform",
  },
  {
    title: "Global Payment Transfer Platform",
    slug: "global-payment-transfer-platform",
    image: "/project-payment.webp",
    alt: "Global payment transfer platform",
  },
  {
    title: "CMA Report Generation Software",
    slug: "cma-report-generation-software",
    image: "/project-cma.webp",
    alt: "CMA report generation software",
  },
  {
    title: "Recruitment Platform",
    slug: "recruitment-platform",
    image: "/project-recruitment.webp",
    alt: "Recruitment platform interface",
  },
  {
    title: "Task, Staff & Document Management",
    slug: "task-staff-document-platform",
    image: "/project-management.webp",
    alt: "Task, staff and document management platform",
  },
  {
    title: "Educational Courses & LMS Platform",
    slug: "educational-courses-lms-platform",
    image: "/project-lms.webp",
    alt: "Educational courses and LMS platform",
  },
  {
    title: "AI Storyboard Creation for Film",
    slug: "ai-storyboard-platform",
    image: "/project-storyboard.webp",
    alt: "AI storyboard creation tool for film",
  },
  {
    title: "Insurance Management Platform",
    slug: "insurance-management-platform",
    image: "/project-insurance.webp",
    alt: "Insurance management platform interface",
  },
  {
    title: "Social Media & Social Commerce Platform",
    slug: "social-commerce-platform",
    image: "/project-social.webp",
    alt: "Social media and social commerce platform",
  },
];

// Repeating span rhythm keeps the bento lively across all 16 tiles.
const spanCycle: BentoTile["span"][] = [
  "span2row2",
  "span2",
  "span1",
  "span1",
];

const bentoTiles: BentoTile[] = bentoSource.map((tile, index) => ({
  ...tile,
  span: spanCycle[index % spanCycle.length],
}));

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
          {bentoTiles.map((tile, index) => (
            <article
              className={`projects-tile projects-tile-${tile.span} projects-tile-pastel-${(index % 4) + 1}`}
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
                  <span className="projects-tile-no">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="projects-tile-title">{tile.title}</h3>
                </span>
              </Link>
            </article>
          ))}
        </div>
        <p className="visually-hidden">
          Sixteen selected engagements across AI, automotive, commerce, finance,
          healthcare, and more.
        </p>
      </section>
    </main>
  );
}
