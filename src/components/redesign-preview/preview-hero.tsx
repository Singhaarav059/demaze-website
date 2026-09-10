import { Link } from "@tanstack/react-router";
import { HeroVideo } from "@/components/hero-video";
import robotsVideo from "@/assets/demaze-robot-studio.mp4";
import robotsPoster from "@/assets/demaze-robot-studio-poster.webp";

/**
 * Rebuild of the design bundle's home hero (isHome state): an eyebrow pill,
 * a two-line masked H1 with the red emphasis on "scalable AI products.", the
 * subcopy, the two CTAs, and the perspective hero video card. Copy is taken
 * verbatim from the visible template markup; the video uses the existing
 * project assets rather than the bundle's UUID sources.
 */
export function PreviewHero() {
  return (
    <section className="preview-hero section-wrap">
      <div className="preview-hero-copy">
        <p className="preview-eyebrow">
          <span className="preview-eyebrow-dot" aria-hidden="true" />
          Expertise · Innovation · Partnership
        </p>
        <h1 className="preview-hero-title">
          <span className="preview-mask-line">
            <span>Your strategic partner</span>
          </span>
          <span className="preview-mask-line">
            <span>
              in building <em className="preview-hero-em">scalable AI products.</em>
            </span>
          </span>
        </h1>
        <p className="preview-hero-lede">
          We combine AI, software engineering, and automation with deep industry expertise to build
          scalable, sustainable solutions, working alongside you as a trusted, long-term partner.
        </p>
        <div className="preview-hero-actions">
          <Link to="/contact-us" className="preview-btn preview-btn-primary">
            Let&apos;s connect ↗
          </Link>
          <Link to="/services" className="preview-btn preview-btn-ghost">
            Explore services →
          </Link>
        </div>
      </div>
      <div className="preview-hero-frame">
        <HeroVideo poster={robotsPoster} mp4={robotsVideo} />
      </div>
    </section>
  );
}
