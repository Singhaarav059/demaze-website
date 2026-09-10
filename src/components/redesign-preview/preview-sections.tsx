import { images } from "@/assets/images";

/**
 * The remaining home-state sections from the design bundle: the dark
 * "Why choose us" values band, the founder quote block, and the "How we work"
 * process band. Copy is taken from the visible template markup; the founder
 * portrait reuses the existing images.ts asset.
 */
const PREVIEW_VALUES = [
  {
    number: "01",
    title: "Innovation at Our Core",
    copy: "We continuously explore emerging technologies to keep clients ahead.",
  },
  {
    number: "02",
    title: "Client Success Obsession",
    copy: "Your outcomes guide every decision, first idea through long-term growth.",
  },
  {
    number: "03",
    title: "Technology for Good",
    copy: "Thoughtful technology should simplify work and create sustainable value.",
  },
  {
    number: "04",
    title: "Continuous Learning",
    copy: "We invest in learning so every solution benefits from current thinking.",
  },
] as const;

const PREVIEW_PROCESS = [
  {
    number: "01",
    title: "Discover & Define",
    copy: "Focused discovery, research, and clear success metrics.",
  },
  {
    number: "02",
    title: "Design & Prototype",
    copy: "User-focused designs and prototypes before development.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    copy: "Scalable, secure products with continuous feedback.",
  },
  {
    number: "04",
    title: "Launch & Scale",
    copy: "Confident launches and long-term optimization.",
  },
] as const;

export function PreviewValuesBand() {
  return (
    <section className="preview-values-band">
      <div className="section-wrap">
        <div className="preview-values-intro">
          <p className="preview-eyebrow preview-eyebrow-light">Why choose us</p>
          <h2 className="preview-section-title preview-title-light">Built for lasting impact.</h2>
        </div>
        <div className="preview-values-grid">
          {PREVIEW_VALUES.map((value) => (
            <article className="preview-value-card" key={value.title}>
              <small className="preview-value-no">{value.number}</small>
              <h3 className="preview-value-title">{value.title}</h3>
              <p className="preview-value-copy">{value.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PreviewFounderQuote() {
  return (
    <section className="preview-founder section-wrap">
      <div className="preview-founder-media">
        <img
          {...images.founder}
          alt="Krupal Chaudhary, Founder and CEO of DEMAze Technologies"
          loading="lazy"
          decoding="async"
        />
      </div>
      <blockquote className="preview-founder-quote">
        <p>
          &ldquo;Through the strategic use of your vision and data, we design AI solutions that make
          your brand stand out and drive revenue growth, leading execution with focus and
          accountability.&rdquo;
        </p>
        <footer>
          <strong>Krupal Chaudhary</strong>
          <span>Founder &amp; CEO</span>
        </footer>
      </blockquote>
    </section>
  );
}

export function PreviewProcessBand() {
  return (
    <section className="preview-process-band">
      <div className="section-wrap">
        <div className="preview-process-intro">
          <p className="preview-eyebrow">How we work</p>
          <h2 className="preview-section-title">Clear from idea to scale.</h2>
        </div>
        <div className="preview-process-grid">
          {PREVIEW_PROCESS.map((step) => (
            <article className="preview-process-card" key={step.title}>
              <span className="preview-process-no">{step.number}</span>
              <h3 className="preview-process-title">{step.title}</h3>
              <p className="preview-process-copy">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
