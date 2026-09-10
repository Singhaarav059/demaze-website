import { useEffect, useRef } from "react";
import { services } from "@/lib/site-data";

/** Homepage-only services layout: a sticky image panel crossfades between the
 * 4 service images while a scrolling list of rows becomes "active" as each
 * nears viewport-center. `/services` keeps the existing ServicesGrid. */
export function PinnedServicesShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayout = window.matchMedia("(max-width: 900px)");
    if (reducedMotion.matches || compactLayout.matches) return;

    const rows = Array.from(stage.querySelectorAll<HTMLElement>("[data-service-row]"));
    const imgs = Array.from(stage.querySelectorAll<HTMLElement>("[data-service-img]"));
    const falloff = window.innerHeight * 0.45; // subtle: wide falloff = gentle transitions

    let scheduled = 0;
    const measure = () => {
      scheduled = 0;
      const vh = window.innerHeight;
      rows.forEach((row, i) => {
        const rb = row.getBoundingClientRect();
        const center = rb.top + rb.height / 2;
        const dist = Math.abs(center - vh / 2);
        const focus = Math.max(0, 1 - dist / falloff);
        row.style.opacity = (0.4 + focus * 0.6).toFixed(2);
        row.style.transform = `translateX(${((1 - focus) * 10).toFixed(1)}px)`;
        const img = imgs[i];
        if (img) img.style.opacity = focus > 0.55 ? "1" : "0";
      });
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scheduled) window.cancelAnimationFrame(scheduled);
    };
  }, []);

  return (
    <div ref={stageRef} className="pinned-services-stage">
      <div className="pinned-services-visual">
        {services.map((service, i) => (
          <img
            key={service.id}
            data-service-img={i}
            {...service.image}
            alt=""
            style={{ opacity: i === 0 ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="pinned-services-list">
        {services.map((service, i) => (
          <article data-service-row key={service.id} style={{ opacity: i === 0 ? 1 : 0.4 }}>
            <small>{service.number}</small>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
