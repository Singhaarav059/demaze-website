import { images } from "@/assets/images";

/**
 * The sticky services section from the design bundle's home state: the four
 * services (AI & ML / Web-Mobile-SaaS / E-commerce / Cloud) each with a short
 * blurb and a row of tag pills. Copy and pills are taken from the visible
 * template markup. Service imagery reuses the existing images.ts service art.
 */
const PREVIEW_SERVICES = [
  {
    number: "01",
    title: "AI & ML",
    copy: "Predictive analytics, computer vision, and generative AI that turn data into decisions.",
    pills: ["Predictive Analytics", "Computer Vision", "Generative AI"],
    image: images["service-ai"],
  },
  {
    number: "02",
    title: "Web / Mobile App / SaaS",
    copy: "Enterprise SaaS, web, and mobile apps built to perform and grow.",
    pills: ["Web Apps", "Mobile Apps", "Custom SaaS"],
    image: images["service-web"],
  },
  {
    number: "03",
    title: "E-commerce",
    copy: "Marketplaces and subscription commerce that improve conversions.",
    pills: ["Multi-Vendor", "Personalization", "Subscriptions"],
    image: images["service-commerce"],
  },
  {
    number: "04",
    title: "Cloud",
    copy: "Migration, DevOps automation, and disaster recovery for resilient systems.",
    pills: ["Migration", "DevOps", "Resilience"],
    image: images["service-cloud"],
  },
] as const;

export function PreviewServices() {
  return (
    <section id="services" className="preview-services section-wrap">
      <div className="preview-services-intro">
        <p className="preview-eyebrow">Services</p>
        <h2 className="preview-section-title">Apps, websites, AI and more.</h2>
      </div>
      <div className="preview-services-grid">
        {PREVIEW_SERVICES.map((service) => (
          <article className="preview-service-row" key={service.title}>
            <div className="preview-service-media">
              <img {...service.image} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="preview-service-copy">
              <small className="preview-service-no">{service.number}</small>
              <h3 className="preview-service-title">{service.title}</h3>
              <p className="preview-service-desc">{service.copy}</p>
              <ul className="preview-service-pills">
                {service.pills.map((pill) => (
                  <li key={pill} className="preview-service-pill">
                    {pill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
