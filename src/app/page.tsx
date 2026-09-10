import Image from "next/image";
import Link from "next/link";
import {
  homeHero,
  homeHowWeWork,
  homeSections,
  homeServiceRows,
  homeWhyChooseUs,
  homeWorkCards,
} from "@/content/editorial";
import { techLogos } from "@/content/services";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* HERO ------------------------------------------------------------ */}
      <section className="home-hero">
        <div className="home-hero-grid">
          <div className="home-hero-copy" data-reveal>
            <p className="home-hero-eyebrow">
              <span className="home-hero-dot" aria-hidden />
              {homeHero.eyebrow}
            </p>
            <h1 className="home-hero-title">
              {homeHero.headingLead}
              <em>{homeHero.headingAccent}</em>
            </h1>
            <p className="home-hero-intro">{homeHero.intro}</p>
            <div className="home-hero-actions">
              <Link className="pill-button" href="/contact-us">
                Let&apos;s connect <span aria-hidden>-&gt;</span>
              </Link>
              <Link className="arrow-link" href="/services">
                Explore services <span aria-hidden>-&gt;</span>
              </Link>
            </div>
          </div>
          <div className="home-hero-frame" data-hero-frame aria-hidden>
            {/* No `autoPlay`: SiteMotion starts playback only when autoplay is
                enabled and reduced motion is not requested, and pauses under a
                reduced-motion preference. Without JS the video simply does not
                autoplay, and the poster is shown as the first-frame fallback. */}
            <video
              data-hero-video
              loop
              muted
              playsInline
              poster="/demaze-robot-studio-poster.webp"
            >
              <source src="/demaze-robot-studio.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* METRIC BAR ------------------------------------------------------ */}
      <div className="home-metric-bar">
        {site.stats.map((stat) => (
          <div className="home-metric-cell" key={stat.label}>
            <strong
              data-metric
              data-target={stat.value}
              data-prefix={stat.prefix ?? ""}
              data-suffix={stat.suffix}
            >
              {stat.prefix ?? ""}
              {stat.value}
              {stat.suffix}
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* OUR WORK -------------------------------------------------------- */}
      <section className="home-work-section">
        <header className="home-section-head" data-reveal>
          <p className="eyebrow-dot">{homeSections.work.eyebrow}</p>
          <h2 className="home-section-heading">{homeSections.work.heading}</h2>
          <p className="home-section-sub">{homeSections.work.sub}</p>
        </header>
        <div className="home-work-grid">
          {homeWorkCards.map((card) => (
            <article className="home-work-card" data-reveal key={card.slug}>
              <Link
                className="home-work-card-link"
                href={`/projects/${card.slug}`}
              >
                <span
                  className="home-work-media"
                  style={{ background: card.tint }}
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 820px) 100vw, 44vw"
                    className="home-work-img"
                  />
                </span>
                <span className="home-work-body">
                  <span className="home-work-title">{card.title}</span>
                  <span className="home-work-copy">{card.copy}</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
        <div className="home-center-cta">
          <Link className="pill-button" href="/projects">
            View all work <span aria-hidden>-&gt;</span>
          </Link>
        </div>
      </section>

      {/* SERVICES STICKY-STAGE ------------------------------------------- */}
      <section className="home-services">
        <header className="home-section-head" data-reveal>
          <p className="eyebrow-dot">{homeSections.services.eyebrow}</p>
          <h2 className="home-section-heading">
            {homeSections.services.heading}
          </h2>
        </header>
        <div className="home-services-stage" id="services-stage">
          <div className="home-services-sticky">
            <div className="home-services-stack">
              {homeServiceRows.map((row, i) => (
                <div
                  className="home-service-img"
                  data-service-img={i}
                  key={row.name}
                  aria-hidden
                >
                  <Image
                    src={row.image}
                    alt=""
                    fill
                    sizes="(max-width: 820px) 90vw, 40vw"
                    className="home-service-img-media"
                  />
                  <span className="home-service-img-no">{row.no}</span>
                  <span className="home-service-img-name">{row.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="home-services-rows">
            {homeServiceRows.map((row, i) => (
              <article
                className="home-service-row"
                data-service-row={i}
                key={row.name}
              >
                <span className="home-service-no">{row.no}</span>
                <h3 className="home-service-name">{row.name}</h3>
                <p className="home-service-copy">{row.copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="home-center-cta">
          <Link className="pill-button" href="/services">
            Explore services <span aria-hidden>-&gt;</span>
          </Link>
        </div>
      </section>

      {/* TECH MARQUEE ---------------------------------------------------- */}
      <section className="home-marquee-section">
        <header className="home-section-head" data-reveal>
          <p className="eyebrow-dot">{homeSections.marquee.eyebrow}</p>
          <h2 className="home-section-heading">
            {homeSections.marquee.heading}
          </h2>
        </header>
        <div className="home-marquee">
          <div className="home-marquee-track" aria-hidden>
            {techLogos.map((tech) => (
              <span className="home-marquee-item" key={`a-${tech.name}`}>
                <Image
                  className="home-marquee-logo"
                  src={tech.logo}
                  alt=""
                  width={28}
                  height={28}
                />
                <span className="home-marquee-name">{tech.name}</span>
              </span>
            ))}
          </div>
          <div className="home-marquee-track" aria-hidden>
            {techLogos.map((tech) => (
              <span className="home-marquee-item" key={`b-${tech.name}`}>
                <Image
                  className="home-marquee-logo"
                  src={tech.logo}
                  alt=""
                  width={28}
                  height={28}
                />
                <span className="home-marquee-name">{tech.name}</span>
              </span>
            ))}
          </div>
        </div>
        <p className="visually-hidden">
          Tools and technologies we work with:{" "}
          {techLogos.map((tech) => tech.name).join(", ")}.
        </p>
      </section>

      {/* WHY CHOOSE US --------------------------------------------------- */}
      <section className="home-why">
        <div className="home-why-inner">
          <header className="home-section-head home-section-head-dark" data-reveal>
            <p className="eyebrow-dot">{homeSections.whyChooseUs.eyebrow}</p>
            <h2 className="home-section-heading">
              {homeSections.whyChooseUs.heading}
            </h2>
          </header>
          <div className="home-quad-grid">
            {homeWhyChooseUs.map((item) => (
              <article className="home-quad-card" data-reveal key={item.no}>
                <span className="home-quad-no">{item.no}</span>
                <h3 className="home-quad-title">{item.title}</h3>
                <p className="home-quad-copy">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER QUOTE --------------------------------------------------- */}
      <section className="home-founder">
        <figure className="home-founder-grid" data-reveal>
          <div className="home-founder-photo">
            <Image
              src={site.founder.photo}
              alt={`${site.founder.name}, ${site.founder.title} of ${site.name}`}
              width={440}
              height={440}
              sizes="(max-width: 820px) 60vw, 220px"
            />
          </div>
          <blockquote className="home-founder-quote">
            <p>
              Through the strategic use of your vision and data, we design AI
              solutions that make your brand stand out and drive revenue growth,
              leading execution with focus and accountability.
            </p>
            <figcaption className="home-founder-caption">
              <strong>{site.founder.name}</strong>
              <span>{site.founder.title}</span>
            </figcaption>
          </blockquote>
        </figure>
      </section>

      {/* HOW WE WORK ----------------------------------------------------- */}
      <section className="home-how">
        <div className="home-how-inner">
          <header className="home-section-head" data-reveal>
            <p className="eyebrow-dot">{homeSections.howWeWork.eyebrow}</p>
            <h2 className="home-section-heading">
              {homeSections.howWeWork.heading}
            </h2>
          </header>
          <div className="home-quad-grid">
            {homeHowWeWork.map((item) => (
              <article className="home-quad-card" data-reveal key={item.no}>
                <span className="home-quad-no">{item.no}</span>
                <h3 className="home-quad-title">{item.title}</h3>
                <p className="home-quad-copy">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
