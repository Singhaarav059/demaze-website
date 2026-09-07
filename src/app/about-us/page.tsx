import type { Metadata } from "next";
import Image from "next/image";
import StudioVisual from "@/components/StudioVisual";
import { pageMeta, site } from "@/content/site";
import {
  whoWeAre,
  whatDrivesUs,
  whyChooseUsAbout,
  whyChooseUsHome,
  whatWeAreTags,
} from "@/content/about";
import "@/components/StudioPages.css";

export const metadata: Metadata = pageMeta(
  "About us",
  whoWeAre.paragraphs[0],
  "/about-us",
);

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="sp-page">
      <header className="sp-hero sp-about-hero">
        <div className="shell sp-hero-grid">
          <div>
            <p className="eyebrow">Demaze Technologies</p>
            <h1>
              Technology should make the next move <em>clearer.</em>
            </h1>
          </div>
          <aside className="sp-hero-note">
            <span>Our point of view</span>
            <strong>Ambitious systems deserve practical thinking.</strong>
            <p>
              We make advanced technology understandable, useful and sustainable
              for the people who rely on it.
            </p>
          </aside>
        </div>
      </header>
      <section className="shell sp-section sp-about-intro">
        <div className="sp-about-model">
          <span className="eyebrow">Who we are</span>
          <StudioVisual />
        </div>
        <div>
          <h2>{whoWeAre.heading}, in practice.</h2>
          {whoWeAre.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className="sp-ethos">
        <div className="shell">
          <div className="sp-section-top">
            <div>
              <p className="eyebrow">What drives us</p>
              <h2>
                Curiosity with
                <br />
                <em>consequences.</em>
              </h2>
            </div>
            <p>
              We are interested in new technology when it gives people a better
              way to work, decide or serve, not because it makes a louder demo.
            </p>
          </div>
          <ol>
            {whatDrivesUs.map((item, index) => (
              <li key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="shell sp-founder">
        <div className="sp-founder-image">
          <Image
            src={site.founder.photo}
            alt={`${site.founder.name}, ${site.founder.title}`}
            fill
            sizes="(max-width: 760px) 100vw, 38vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="sp-founder-copy">
          <p className="eyebrow">A note from our founder</p>
          <blockquote>“{site.founder.quote}”</blockquote>
          <p className="sp-signature">
            <b>{site.founder.name}</b>
            <span>{site.founder.title}</span>
          </p>
          <a
            href={site.founder.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="text-link"
          >
            Connect on LinkedIn <span aria-hidden>↗</span>
          </a>
        </div>
      </section>
      <section className="shell sp-section sp-why">
        <div className="sp-section-top">
          <div>
            <p className="eyebrow">Why clients choose us</p>
            <h2>
              Serious about
              <br />
              the <em>whole system.</em>
            </h2>
          </div>
          <p>
            Our studio brings product, engineering and AI thinking into the same
            room so a business does not have to reconcile them after the fact.
          </p>
        </div>
        <div className="sp-why-grid">
          {[...whyChooseUsHome, ...whyChooseUsAbout].map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <ul className="sp-tags">
          {whatWeAreTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </section>
      <section className="sp-numbers">
        <div className="shell">
          <p className="eyebrow">Demaze, by the numbers</p>
          <dl>
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt>
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
