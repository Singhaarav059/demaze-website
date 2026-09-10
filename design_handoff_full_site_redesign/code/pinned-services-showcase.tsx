import { useEffect, useRef } from "react";
import { services } from "@/lib/site-data";

/** Homepage-only services layout: a sticky image panel and the scrolling text
 * column move together as ONE lerp-smoothed composition (not independent
 * crossfades) — the active row's focus (0..1) drives both the image's
 * scale/drift/blur and the text's opacity/translate/scale every frame. */
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

    let target = rows.map(() => 0);
    let current = rows.map(() => 0);
    let paintFrame = 0;

    const paint = () => {
      paintFrame = 0;
      let unsettled = false;
      const vh = window.innerHeight;
      current = current.map((v, i) => {
        const t = target[i] ?? 0;
        const next = v + (t - v) * 0.14;
        if (Math.abs(t - next) > 0.0015) unsettled = true;
        return Math.abs(t - next) <= 0.0015 ? t : next;
      });
      rows.forEach((row, i) => {
        const focus = current[i];
        const bounds = row.getBoundingClientRect();
        const direction = bounds.top > vh * 0.5 ? 1 : -1;
        row.style.opacity = (0.32 + focus * 0.68).toFixed(3);
        row.style.transform = `translate3d(${((1 - focus) * 10).toFixed(1)}px, ${(direction * (1 - focus) * 14).toFixed(1)}px, 0) scale(${(0.985 + focus * 0.015).toFixed(3)})`;
        const img = imgs[i];
        if (img) {
          img.style.opacity = focus.toFixed(3);
          img.style.transform = `translate3d(0, ${(direction * (1 - focus) * 12).toFixed(1)}px, 0) scale(${(1.045 - focus * 0.045).toFixed(3)})`;
          img.style.filter = `blur(${((1 - focus) * 1.6).toFixed(2)}px)`;
        }
      });
      if (unsettled) paintFrame = window.requestAnimationFrame(paint);
    };

    let scheduled = 0;
    const measure = () => {
      scheduled = 0;
      const vh = window.innerHeight;
      target = rows.map((row) => {
        const rb = row.getBoundingClientRect();
        const center = rb.top + rb.height / 2;
        const dist = Math.abs(center - vh / 2);
        return Math.max(0, 1 - dist / falloff);
      });
      if (!paintFrame) paintFrame = window.requestAnimationFrame(paint);
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
      if (paintFrame) window.cancelAnimationFrame(paintFrame);
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
          <article data-service-row key={service.id} style={{ opacity: i === 0 ? 1 : 0.32 }}>
            <small>{service.number}</small>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
