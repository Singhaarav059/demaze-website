import { Link } from "@tanstack/react-router";
import { images } from "@/assets/images";

/**
 * Horizontal-scroll projects gallery from the design bundle's home state. The
 * four named cards use the short design blurbs (which differ from the longer
 * lib/site-data descriptions), so they are hand-built here. Images map to the
 * existing project assets in images.ts; the bundle's UUID srcs are never used.
 * A "View all work" tail card closes the track.
 */
const GALLERY_CARDS = [
  {
    number: "01",
    title: "AI-Based Software for Luxury Car Dealers",
    copy: "Streamlines used-car valuation, EMI calculations, refurbishment, and sales operations.",
    image: images["project-car"],
  },
  {
    number: "02",
    title: "Investigative Case Management Software",
    copy: "AI-powered tools, structured case management, and secure media storage.",
    image: images["project-investigation"],
  },
  {
    number: "03",
    title: "AI-Powered Luxury eCommerce Platform",
    copy: "Sustainability-focused commerce with personalization and scalable operations.",
    image: images["project-luxury"],
  },
  {
    number: "04",
    title: "Senior Engagement & Support Platform",
    copy: "Coaching, meetups, and community for seniors to lead connected lives.",
    image: images["project-sukoon"],
  },
] as const;

export function PreviewProjectsGallery() {
  return (
    <section className="preview-gallery">
      <div className="preview-gallery-intro section-wrap">
        <p className="preview-eyebrow">Our work</p>
        <h2 className="preview-section-title">Complex problems, useful products.</h2>
        <p className="preview-section-copy">
          Selected platforms designed around real operations, customers, and growth.
        </p>
      </div>
      <div className="preview-gallery-track" role="list">
        {GALLERY_CARDS.map((card) => (
          <article className="preview-gallery-card" role="listitem" key={card.title}>
            <div className="preview-gallery-media">
              <img
                {...card.image}
                alt={`${card.title} interface`}
                loading="lazy"
                decoding="async"
                className="preview-gallery-img"
              />
            </div>
            <div className="preview-gallery-body">
              <small className="preview-gallery-no">{card.number}</small>
              <h3 className="preview-gallery-card-title">{card.title}</h3>
              <p className="preview-gallery-card-copy">{card.copy}</p>
            </div>
          </article>
        ))}
        <div className="preview-gallery-tail" role="listitem">
          <p className="preview-gallery-tail-copy">
            Eight more platforms across automotive, BFSI, commerce, and community.
          </p>
          <Link to="/projects" className="preview-btn preview-btn-primary">
            View all work ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
