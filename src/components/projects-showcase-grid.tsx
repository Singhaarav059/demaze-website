import { useEffect, useRef, useState, useMemo } from "react";
import { projects } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";

const SPAN_CLASSES = [
  "projects-tile-span2row2",
  "projects-tile-span2",
  "projects-tile-span1",
  "projects-tile-span1",
];

const PASTEL_CLASSES = [
  "projects-tile-pastel-1",
  "projects-tile-pastel-2",
  "projects-tile-pastel-3",
  "projects-tile-pastel-4",
];

const CATEGORIES = [
  "All",
  "AI & Automation",
  "SaaS & Web Platforms",
  "Commerce & Retail",
  "Mobile & Apps",
] as const;

function getProjectCategory(title: string, desc: string): string {
  const combined = (title + " " + desc).toLowerCase();
  if (
    combined.includes("ai") ||
    combined.includes("investigat") ||
    combined.includes("analytics") ||
    combined.includes("automation")
  ) {
    return "AI & Automation";
  }
  if (
    combined.includes("commerce") ||
    combined.includes("marketplace") ||
    combined.includes("gifting") ||
    combined.includes("billing") ||
    combined.includes("payment") ||
    combined.includes("luxury")
  ) {
    return "Commerce & Retail";
  }
  if (
    combined.includes("app") ||
    combined.includes("delivery") ||
    combined.includes("senior") ||
    combined.includes("cma")
  ) {
    return "Mobile & Apps";
  }
  return "SaaS & Web Platforms";
}

/**
 * Editorial Bento Grid for /projects:
 * - Interactive filter pills with project counts
 * - 4-column dense-packing Bento layout
 * - Category badges, capability pills, and parallax hover effects
 */
export function ProjectsShowcaseGrid({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const categorizedProjects = useMemo(() => {
    return projects.map((p) => ({
      ...p,
      category: getProjectCategory(p.title, p.description),
    }));
  }, []);

  const filteredProjects = useMemo(() => {
    const list =
      activeCategory === "All"
        ? categorizedProjects
        : categorizedProjects.filter((p) => p.category === activeCategory);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [activeCategory, categorizedProjects, limit]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
        img.style.transform = `scale(1.05) translateY(${((p - 0.5) * 14).toFixed(1)}px)`;
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
  }, [filteredProjects]);

  return (
    <div className="projects-showcase-container">
      <nav className="projects-filter-bar" aria-label="Filter projects by category">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? categorizedProjects.length
              : categorizedProjects.filter((p) => p.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              className={`projects-filter-pill ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} <span className="filter-pill-count">({count})</span>
            </button>
          );
        })}
      </nav>

      <div ref={gridRef} className="projects-bento">
        {filteredProjects.map((project, i) => (
          <article
            key={project.title}
            className={`projects-tile ${SPAN_CLASSES[i % SPAN_CLASSES.length]} ${PASTEL_CLASSES[i % PASTEL_CLASSES.length]}`}
          >
            <span className="projects-tile-media">
              <img
                data-parallax-img
                {...project.image}
                alt={`${project.title} interface`}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                className="projects-tile-img"
              />
            </span>
            <div className="projects-tile-overlay">
              <div className="projects-tile-top-meta">
                <span className="projects-tile-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="projects-tile-badge">{project.category}</span>
                <ArrowUpRight size={18} className="projects-tile-arrow" />
              </div>
              <h3 className="projects-tile-title">{project.title}</h3>
              {project.features && project.features.length > 0 && (
                <ul className="projects-tile-pills">
                  {project.features.slice(0, 2).map((f) => (
                    <li key={f} className="projects-tile-pill">
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
