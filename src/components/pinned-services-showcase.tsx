import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";

/**
 * Cinematic Services Showcase
 * Inspired by hobro.digital:
 * - High-end sticky visual container with soft gradient backdrop and contained preview
 * - Interactive numbered service rows with active highlight pills and capability tags
 * - Integrated discovery & capabilities CTA card
 */
export function PinnedServicesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="cinema-services-grid">
      <div className="cinema-services-visual-wrap">
        {services.map((service, i) => (
          <img
            key={service.id}
            {...service.image}
            alt={`${service.title} architecture`}
            style={{
              opacity: i === activeIdx ? 1 : 0,
              transform: i === activeIdx ? "scale(1)" : "scale(0.96)",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      <div className="cinema-services-list">
        {services.map((service, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={service.id}
              className={`cinema-service-item ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIdx(i);
                }
              }}
            >
              <div className="cinema-service-header">
                <span className="cinema-service-num">({service.number})</span>
                <h3 className="cinema-service-title">{service.title}</h3>
                <ArrowUpRight
                  className="cinema-service-arrow"
                  style={{
                    marginLeft: "auto",
                    opacity: isActive ? 1 : 0.28,
                    transform: isActive ? "translate(2px, -2px)" : "none",
                    transition: "all 0.25s var(--ease-out)",
                    color: isActive ? "var(--color-accent-oklch)" : "inherit",
                    flexShrink: 0,
                  }}
                  size={22}
                />
              </div>

              {isActive && (
                <div className="cinema-service-body">
                  <p className="cinema-service-desc">{service.description}</p>
                  <ul className="cinema-service-tags">
                    {service.items.slice(0, 4).map((item) => (
                      <li key={item} className="cinema-service-tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        <div className="cinema-service-cta-card">
          <div className="cinema-service-cta-text">
            <span className="cinema-service-cta-kicker">Discover how we can help</span>
            <span className="cinema-service-cta-title">Explore our full engineering capabilities</span>
          </div>
          <Link
            to="/services"
            className="pill-button"
            style={{ padding: "0.65rem 1.35rem", fontSize: "0.88rem", flexShrink: 0 }}
          >
            All services <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
