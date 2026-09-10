import { useEffect, useRef } from "react";
import { services } from "@/lib/site-data";

/**
 * Homepage-only services layout: an image that crossfades between the 4
 * service shots as a compact list on the right highlights the active one.
 * `/services` keeps the existing ServicesGrid.
 *
 * Progress is driven off the ancestor `.motion-stage`'s scroll distance —
 * the same measurement and lerp-toward-target smoothing ServicesGrid uses —
 * rather than each row's own position. This chapter renders inside
 * `.stack-chapter`, a flex-centered sticky box pinned by the outer
 * ScrollFocusStack system, so there's no room for a second, independently
 * sticky/scrolling panel nested inside it; this reuses the stack's scroll
 * budget instead of carrying its own.
 */
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
    const motionStage = stage.closest<HTMLElement>(".motion-stage");
    const lastIndex = rows.length - 1;

    let frame = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let activeIndex = -1;

    const paint = () => {
      frame = 0;
      currentProgress += (targetProgress - currentProgress) * 0.14;
      if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;

      // Continuous crossfade: each image's opacity is its distance-1 from the
      // current (fractional) progress, so adjacent services blend through the
      // transition instead of snapping.
      imgs.forEach((img, i) => {
        const focus = Math.max(0, 1 - Math.abs(currentProgress - i));
        img.style.opacity = focus.toFixed(3);
      });

      // Titles/descriptions can't blend, so they snap to the nearest index —
      // but only touch the DOM when that index actually changes.
      const nextActive = Math.min(lastIndex, Math.round(currentProgress));
      if (nextActive !== activeIndex) {
        activeIndex = nextActive;
        rows.forEach((row, i) => row.classList.toggle("is-service-row-active", i === activeIndex));
      }

      if (currentProgress !== targetProgress) frame = window.requestAnimationFrame(paint);
    };

    let scheduled = 0;
    const measure = () => {
      scheduled = 0;
      const bounds = (motionStage ?? stage).getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = motionStage ? viewportHeight * 0.18 : viewportHeight * 0.72;
      const travel = motionStage
        ? Math.max((motionStage.offsetHeight - viewportHeight) * 0.92, 1)
        : Math.max(stage.offsetHeight * 0.72, 1);
      const normalized = Math.max(0, Math.min(1, (start - bounds.top) / travel));
      targetProgress = normalized * lastIndex;
      if (!frame) frame = window.requestAnimationFrame(paint);
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
      if (frame) window.cancelAnimationFrame(frame);
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
          <article
            data-service-row
            key={service.id}
            className={i === 0 ? "is-service-row-active" : ""}
          >
            <small>{service.number}</small>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
