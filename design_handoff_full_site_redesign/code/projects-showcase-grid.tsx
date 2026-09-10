import { useEffect, useRef } from "react";
import { projects } from "@/lib/site-data";

const SPANS = [
  "span 2 / span 2",
  "span 1 / span 1",
  "span 1 / span 1",
  "span 1 / span 1",
  "span 1 / span 1",
  "span 2 / span 2",
  "span 1 / span 1",
  "span 1 / span 1",
];

/** Editorial asymmetric grid for the /projects page: large/small tiles, dark
 * gradient caption overlay, image parallax as each tile crosses the viewport.
 * Distinct from the homepage's ProjectsGrid (kept as-is there). */
export function ProjectsShowcaseGrid({ limit = 8 }: { limit?: number }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const imgs = Array.from(grid.querySelectorAll<HTMLImageElement>("[data-parallax-img]"));
    let scheduled = 0;
    const measure = () => {
      scheduled = 0;
      const vh = window.innerHeight;
      imgs.forEach((img) => {
        const parent = img.parentElement;
        if (!parent) return;
        const rb = parent.getBoundingClientRect();
        const p = (vh - rb.top) / (vh + rb.height);
        img.style.top = `${(-8 + (p - 0.5) * 10).toFixed(1)}%`;
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

  const entries = projects.slice(0, limit);
  return (
    <div ref={gridRef} className="project-showcase-grid">
      {entries.map((project, i) => (
        <article
          key={project.title}
          className="project-showcase-card scroll-reveal"
          style={{ gridArea: SPANS[i % SPANS.length] }}
        >
          <img data-parallax-img {...project.image} alt={`${project.title} interface`} loading="lazy" />
          <div className="project-showcase-caption">
            <small>{String(i + 1).padStart(2, "0")}</small>
            <h3>{project.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
