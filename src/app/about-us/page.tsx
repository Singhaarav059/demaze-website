import type { Metadata } from "next";
import Image from "next/image";
import { pageMeta, site } from "@/content/site";
import {
  principles,
  whatWeAreTags,
  whoWeAre,
  whyChooseUsAbout,
} from "@/content/about";

export const metadata: Metadata = pageMeta(
  "About us",
  whoWeAre.splitParagraph,
  "/about-us",
);

// Rotating pastel backgrounds for the "what we are" pill tags, cycling the four
// oklch pastel tokens (lavender 305, mint 145, blue 220, butter 88).
const tagPastels = [
  "var(--color-pastel-lavender)",
  "var(--color-pastel-mint)",
  "var(--color-pastel-blue)",
  "var(--color-pastel-butter)",
];

// Rotating pastels for the why-choose-us cards.
const whyPastels = [
  "about-why-pastel-1",
  "about-why-pastel-2",
  "about-why-pastel-3",
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* HERO ------------------------------------------------------------ */}
      <section className="about-hero">
        <div className="about-hero-inner" data-reveal>
          <p className="eyebrow-dot">What we are</p>
          <h1 className="about-hero-title">
            Technology partners, <em>not just developers.</em>
          </h1>
          <p className="about-hero-sub">
            We bridge complex technical possibilities and real business outcomes
            through AI-first thinking and accountable delivery.
          </p>
        </div>
      </section>

      {/* WHO WE ARE ------------------------------------------------------ */}
      <section className="about-who">
        <div className="about-who-grid">
          <div className="about-who-media" data-reveal>
            <Image
              src="/about.webp"
              alt="The Demaze Technologies team at work"
              fill
              sizes="(max-width: 820px) 100vw, 46vw"
              className="about-who-photo"
            />
          </div>
          <div className="about-who-copy" data-reveal>
            <p className="eyebrow-dot">Who we are</p>
            <h2 className="about-who-heading">{whoWeAre.splitHeading}</h2>
            <p className="about-who-para">{whoWeAre.splitParagraph}</p>
            <ul className="about-tags">
              {whatWeAreTags.slice(0, 6).map((tag, index) => (
                <li
                  key={tag}
                  style={{
                    background: tagPastels[index % tagPastels.length],
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRINCIPLES (dark band) ------------------------------------------ */}
      <section className="about-principles">
        <div className="about-principles-inner">
          <header
            className="about-section-head about-section-head-dark"
            data-reveal
          >
            <p className="eyebrow-dot">What drives us</p>
            <h2 className="about-section-heading">
              Principles behind the work.
            </h2>
          </header>
          <div className="about-principles-grid">
            {principles.map((item, index) => (
              <article className="about-principle-card" data-reveal key={item.title}>
                <span className="about-principle-no">0{index + 1}</span>
                <h3 className="about-principle-title">{item.title}</h3>
                <p className="about-principle-copy">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US --------------------------------------------------- */}
      <section className="about-why">
        <header className="about-section-head" data-reveal>
          <p className="eyebrow-dot">Why choose us</p>
          <h2 className="about-section-heading">Clarity at every level.</h2>
        </header>
        <div className="about-why-grid">
          {whyChooseUsAbout.map((item, index) => (
            <article
              className={`about-why-card ${whyPastels[index % whyPastels.length]}`}
              data-reveal
              key={item.title}
            >
              <h3 className="about-why-title">{item.title}</h3>
              <p className="about-why-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FOUNDER QUOTE --------------------------------------------------- */}
      <section className="about-founder">
        <figure className="about-founder-card" data-reveal>
          <div className="about-founder-photo">
            <Image
              src={site.founder.photo}
              alt={`${site.founder.name}, ${site.founder.title} of ${site.name}`}
              width={200}
              height={200}
              sizes="(max-width: 820px) 40vw, 160px"
            />
          </div>
          <blockquote className="about-founder-quote">
            <p>
              Through the strategic use of your vision and data, we design AI
              solutions that make your brand stand out and drive revenue growth,
              leading execution with focus and accountability.
            </p>
            <figcaption className="about-founder-caption">
              <strong>{site.founder.name}</strong>
              <span>{site.founder.title}</span>
            </figcaption>
          </blockquote>
        </figure>
      </section>
    </main>
  );
}
