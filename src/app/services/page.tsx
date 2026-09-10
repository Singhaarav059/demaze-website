import type { Metadata } from "next";
import { serviceCategories } from "@/content/services";
import { industries } from "@/content/industries";
import { pageMeta } from "@/content/site";

export const metadata: Metadata = pageMeta(
  "Services",
  "AI and ML, web, mobile and SaaS, e-commerce, and cloud engineering.",
  "/services",
);

// Prototype-shortened checklist copy, keyed to the serviceCategories ids so the
// /services#<key> deep links from the home expertise section still resolve.
const cardChecklists: Record<string, string[]> = {
  "ai-ml": [
    "Predictive Analytics",
    "NLP & Conversational AI",
    "Computer Vision",
    "Generative Models",
  ],
  "web-mobile-saas": [
    "Web App Development",
    "Mobile App Development",
    "Custom SaaS",
    "Workflow Automation",
  ],
  ecommerce: [
    "Multi-Vendor Marketplace",
    "AI Personalization",
    "Subscription Billing",
    "Storefront UI/UX",
  ],
  cloud: [
    "Cloud Migration",
    "Cloud-Native Apps",
    "Security & Compliance",
    "Disaster Recovery",
  ],
};

const cardSummaries: Record<string, string> = {
  "ai-ml":
    "AI-powered solutions that turn data into insights, automate complex tasks, and drive smarter decisions.",
  "web-mobile-saas":
    "Scalable software and applications that deliver seamless user experiences and lasting business value.",
  ecommerce:
    "Intelligent commerce platforms that elevate shopping experiences, improve conversions, and drive growth.",
  cloud:
    "Cloud architectures built for scalability, security, and resilience across modern workloads.",
};

// Reversed tech marquee wordmarks (text only, no missing logo assets).
const techWordmarks = ["Langchain", "Python", "OpenAI", "Tensorflow", "Kafka"];

// Short prototype descriptors keyed by industry name. The tile names derive
// from src/content/industries.ts; the prototype closes the set with Real
// Estate in slot 08, so we swap it in for the content list's 8th entry while
// keeping the first seven straight from the source of truth.
const industryDescriptors: Record<string, string> = {
  Healthcare: "Telemedicine, EHR, patient management",
  Fintech: "Digital payments, mobile banking",
  Logistics: "Delivery, fleet, route optimization",
  Retail: "POS, inventory, loyalty programs",
  Ecommerce: "Marketplaces, B2B & B2C stores",
  Education: "LMS, virtual classrooms, AI tutoring",
  "BFSI Solutions": "Core banking, loan origination",
  "Real Estate": "Property management, virtual tours",
};

const industryNames = [
  ...industries.slice(0, 7).map((industry) => industry.name),
  "Real Estate",
];

const industryTiles = industryNames.map((name, index) => ({
  no: `0${index + 1}`,
  name,
  descriptor: industryDescriptors[name] ?? "",
}));

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* HERO ------------------------------------------------------------ */}
      <section className="services-hero">
        <div className="services-hero-inner" data-reveal>
          <span className="services-hero-float" aria-hidden>
            🧠
          </span>
          <p className="eyebrow-dot">Services</p>
          <h1 className="services-hero-title">
            Apps, websites, <em>AI and more.</em>
          </h1>
          <p className="services-hero-sub">
            End-to-end product engineering that turns complex ideas into
            secure, useful, scalable systems.
          </p>
        </div>
      </section>

      {/* SERVICE CARDS --------------------------------------------------- */}
      <section className="services-cards-section">
        <div className="services-cards">
          {serviceCategories.map((category, index) => (
            <article
              className={`services-card services-card-pastel-${index + 1}`}
              data-reveal
              id={category.key}
              key={category.key}
            >
              <span className="services-card-media" aria-hidden />
              <div className="services-card-body">
                <span className="services-card-no">0{index + 1}</span>
                <h3 className="services-card-title">{category.name}</h3>
                <p className="services-card-copy">
                  {cardSummaries[category.key] ?? category.summary}
                </p>
                <ul className="services-card-list">
                  {(cardChecklists[category.key] ?? []).map((item) => (
                    <li key={item}>
                      <span className="services-card-check" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TECH MARQUEE (reversed) ----------------------------------------- */}
      <section className="services-marquee-section">
        <header className="services-section-head" data-reveal>
          <p className="eyebrow-dot">Platforms &amp; partners</p>
          <h2 className="services-section-heading">
            A modern technology toolkit.
          </h2>
        </header>
        <div className="services-marquee">
          <div className="services-marquee-track">
            {techWordmarks.map((tech) => (
              <span className="services-marquee-item" key={`a-${tech}`}>
                {tech}
              </span>
            ))}
          </div>
          <div className="services-marquee-track" aria-hidden>
            {techWordmarks.map((tech) => (
              <span className="services-marquee-item" key={`b-${tech}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        <p className="visually-hidden">
          Platforms and partners we build with: {techWordmarks.join(", ")}.
        </p>
      </section>

      {/* INDUSTRIES ------------------------------------------------------ */}
      <section className="services-industries-section">
        <header className="services-section-head" data-reveal>
          <p className="eyebrow-dot">Industries</p>
          <h2 className="services-section-heading">
            Solutions grounded in context.
          </h2>
        </header>
        <div className="services-industries-grid">
          {industryTiles.map((tile) => (
            <article className="services-industry-tile" data-reveal key={tile.name}>
              <span className="services-industry-no">{tile.no}</span>
              <h3 className="services-industry-name">{tile.name}</h3>
              <p className="services-industry-copy">{tile.descriptor}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
