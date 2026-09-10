import type { Metadata } from "next";
import Image from "next/image";
import { serviceCategories, techLogos } from "@/content/services";
import { industries } from "@/content/industries";
import { pageMeta } from "@/content/site";

export const metadata: Metadata = pageMeta(
  "Services",
  "AI and ML, web, mobile and SaaS, e-commerce, and cloud engineering.",
  "/services",
);

// Real service artwork, keyed to the serviceCategories ids. The card media sits
// behind the pastel gradient and is decorative (the card title/copy carry the
// meaning), so each image is alt="" inside the aria-hidden media span.
const cardImages: Record<string, string> = {
  "ai-ml": "/service-ai.webp",
  "web-mobile-saas": "/service-web.webp",
  ecommerce: "/service-commerce.png",
  cloud: "/service-cloud.png",
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

// All 19 industries render from src/content/industries.ts, each with its five
// sub-items, so the services page carries the full canonical set with nothing
// left out. The two-digit index is derived at render time.
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
              <span className="services-card-media" aria-hidden>
                <Image
                  src={cardImages[category.key]}
                  alt=""
                  fill
                  sizes="(max-width: 820px) 100vw, 50vw"
                  className="services-card-img"
                />
              </span>
              <div className="services-card-body">
                <span className="services-card-no">0{index + 1}</span>
                <h3 className="services-card-title">{category.name}</h3>
                <p className="services-card-copy">
                  {cardSummaries[category.key] ?? category.summary}
                </p>
                <ul className="services-card-list">
                  {category.items.map((item) => (
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
          <div className="services-marquee-track" aria-hidden>
            {techLogos.map((tech) => (
              <span className="services-marquee-item" key={`a-${tech.name}`}>
                <Image
                  className="services-marquee-logo"
                  src={tech.logo}
                  alt=""
                  width={28}
                  height={28}
                />
                <span className="services-marquee-name">{tech.name}</span>
              </span>
            ))}
          </div>
          <div className="services-marquee-track" aria-hidden>
            {techLogos.map((tech) => (
              <span className="services-marquee-item" key={`b-${tech.name}`}>
                <Image
                  className="services-marquee-logo"
                  src={tech.logo}
                  alt=""
                  width={28}
                  height={28}
                />
                <span className="services-marquee-name">{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
        <p className="visually-hidden">
          Platforms and partners we build with:{" "}
          {techLogos.map((tech) => tech.name).join(", ")}.
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
          {industries.map((industry, index) => (
            <article
              className="services-industry-tile"
              data-reveal
              key={industry.name}
            >
              <span className="services-industry-no">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="services-industry-name">{industry.name}</h3>
              <ul className="services-industry-list">
                {industry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
