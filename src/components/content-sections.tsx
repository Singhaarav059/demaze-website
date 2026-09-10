import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  faqs,
  industries,
  metrics,
  process,
  projects,
  services,
  technologies,
  values,
} from "@/lib/site-data";
import founder from "@/assets/original/founder.jpeg";

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function MetricsStrip() {
  return (
    <div className="metrics-strip section-wrap">
      {metrics.map(([value, label], i) => (
        <div key={label}>
          <small>0{i + 1}</small>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function ProjectsGrid({ limit }: { limit?: number }) {
  const entries = typeof limit === "number" ? projects.slice(0, limit) : projects;
  return (
    <div className="project-grid">
      {entries.map((project, index) => (
        <article className="project-card" key={project.title}>
          <div className="project-image">
            <img
              src={project.image}
              alt={`${project.title} interface`}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>
          <div className="project-body">
            <small>0{index + 1}</small>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

function AnimatedServiceVisual({
  image,
  title,
  index,
}: {
  image: string;
  title: string;
  index: number;
}) {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visual.classList.toggle("is-live", Boolean(entry?.isIntersecting));
      },
      { rootMargin: "100px 0px", threshold: 0.08 },
    );

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      visual.style.setProperty("--service-rx", `${(-y * 5).toFixed(2)}deg`);
      visual.style.setProperty("--service-ry", `${(x * 6).toFixed(2)}deg`);
      visual.style.setProperty("--service-x", `${(x * 8).toFixed(2)}px`);
      visual.style.setProperty("--service-y", `${(y * 8).toFixed(2)}px`);
    };
    const resetPointer = () => {
      visual.style.setProperty("--service-rx", "0deg");
      visual.style.setProperty("--service-ry", "0deg");
      visual.style.setProperty("--service-x", "0px");
      visual.style.setProperty("--service-y", "0px");
    };

    visibilityObserver.observe(visual);
    visual.addEventListener("pointermove", handlePointerMove, { passive: true });
    visual.addEventListener("pointerleave", resetPointer);
    return () => {
      visibilityObserver.disconnect();
      visual.removeEventListener("pointermove", handlePointerMove);
      visual.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <div
      ref={visualRef}
      className="service-live-visual"
      data-scene={index + 1}
      aria-label={`Animated illustration for ${title}`}
      role="img"
    >
      <span className="service-orbit" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="service-scan" aria-hidden="true" />
      <img src={image} alt="" loading="lazy" />
    </div>
  );
}

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".service-card"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayout = window.matchMedia("(max-width: 700px)");
    const stickyStage =
      grid.closest<HTMLElement>(".motion-stage") ?? grid.closest<HTMLElement>(".stack-services");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("is-service-visible", entry.isIntersecting),
        );
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );
    cards.forEach((card) => observer.observe(card));

    let frame = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    const paint = () => {
      frame = 0;
      if (reducedMotion.matches || compactLayout.matches) {
        cards.forEach((card) => {
          card.classList.remove("is-service-active");
          card.style.removeProperty("--service-focus");
          card.style.removeProperty("--service-depth");
          card.style.removeProperty("--service-scroll-y");
        });
        grid.style.removeProperty("--service-light-x");
        grid.style.removeProperty("--service-light-y");
        return;
      }

      currentProgress += (targetProgress - currentProgress) * 0.11;
      if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;
      const activeIndex = Math.min(cards.length - 1, Math.round(currentProgress));
      const lowerIndex = Math.floor(currentProgress);
      const upperIndex = Math.min(cards.length - 1, lowerIndex + 1);
      const blend = currentProgress - lowerIndex;
      const lowerBounds = cards[lowerIndex]?.getBoundingClientRect();
      const upperBounds = cards[upperIndex]?.getBoundingClientRect();
      const gridBounds = grid.getBoundingClientRect();

      if (lowerBounds && upperBounds) {
        const lowerX = lowerBounds.left - gridBounds.left + lowerBounds.width / 2;
        const upperX = upperBounds.left - gridBounds.left + upperBounds.width / 2;
        const lowerY = lowerBounds.top - gridBounds.top + lowerBounds.height / 2;
        const upperY = upperBounds.top - gridBounds.top + upperBounds.height / 2;
        grid.style.setProperty("--service-light-x", `${lowerX + (upperX - lowerX) * blend}px`);
        grid.style.setProperty("--service-light-y", `${lowerY + (upperY - lowerY) * blend}px`);
      }

      cards.forEach((card, index) => {
        const signedDistance = index - currentProgress;
        const distance = Math.min(Math.abs(signedDistance), 1);
        const focus = 1 - distance;
        card.style.setProperty("--service-focus", focus.toFixed(3));
        card.style.setProperty("--service-depth", distance.toFixed(3));
        card.style.setProperty("--service-scroll-y", `${(signedDistance * 10).toFixed(2)}px`);
        card.classList.toggle("is-service-active", index === activeIndex);
      });

      if (currentProgress !== targetProgress) frame = window.requestAnimationFrame(paint);
    };
    const measure = () => {
      const bounds = (stickyStage ?? grid).getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = stickyStage ? viewportHeight * 0.18 : viewportHeight * 0.72;
      const travel = stickyStage
        ? Math.max((stickyStage.offsetHeight - viewportHeight) * 0.92, 1)
        : Math.max(grid.offsetHeight * 0.72, 1);
      const normalized = Math.max(0, Math.min(1, (start - bounds.top) / travel));
      targetProgress = normalized * (cards.length - 1);
      grid.style.setProperty("--service-scroll", normalized.toFixed(3));
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={`service-grid service-spatial-grid ${detailed ? "service-grid-detailed" : ""}`}
    >
      <span className="service-grid-lines" aria-hidden="true" />
      {services.map((service, index) => (
        <article
          id={service.id}
          className="service-card"
          data-service-index={index + 1}
          key={service.title}
        >
          <div className="service-card-top">
            <small>{service.number}</small>
            <AnimatedServiceVisual image={service.image} title={service.title} index={index} />
          </div>
          <div className="service-card-copy">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
          {detailed && (
            <ul>
              {service.items.map((item) => (
                <li key={item}>
                  <ArrowRight />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

export function TechnologyBand() {
  return (
    <div className="tech-band">
      {technologies.map(([name, image]) => (
        <div key={name}>
          <img src={image} alt={`${name} logo`} loading="lazy" />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

export function IndustryGrid() {
  return (
    <div className="industry-grid">
      {industries.map(([industry, solutions], index) => (
        <article key={industry}>
          <small>{String(index + 1).padStart(2, "0")}</small>
          <h3>{industry}</h3>
          <ul>
            {solutions.map((solution) => (
              <li key={solution}>{solution}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function ValuesGrid() {
  return (
    <div className="values-grid">
      {values.map(([title, copy], index) => (
        <article key={title}>
          <small>0{index + 1}</small>
          <h3>{title}</h3>
          <p>{copy}</p>
        </article>
      ))}
    </div>
  );
}

export function ProcessGrid() {
  return (
    <div className="process-grid">
      {process.map(([title, copy], index) => (
        <article key={title}>
          <span>0{index + 1}</span>
          <h3>{title}</h3>
          <p>{copy}</p>
        </article>
      ))}
    </div>
  );
}

export function FounderStory() {
  return (
    <div className="founder-story">
      <img
        src={founder}
        alt="Krupal Chaudhary, Founder and CEO of DEMAze Technologies"
        loading="lazy"
      />
      <blockquote>
        <p>
          “We harness your vision and data to build AI-driven solutions that help your brand stand
          out and grow revenue. When you thrive, we thrive, and we’re with you, executing every step
          of the way.”
        </p>
        <footer>
          <strong>Krupal Chaudhary</strong>
          <span>Founder &amp; CEO</span>
        </footer>
      </blockquote>
    </div>
  );
}

export function FaqSection({ compact = false }: { compact?: boolean }) {
  const entries = compact ? faqs.slice(0, 2) : faqs;
  return (
    <Accordion type="single" collapsible className="faq-list">
      {entries.map(([question, answer], index) => (
        <AccordionItem value={`faq-${index}`} key={question}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function ExploreCta({
  label = "View all work",
  to = "/projects",
}: {
  label?: string;
  to?: "/projects" | "/services" | "/about-us" | "/contact-us";
}) {
  return (
    <Button variant="editorial" size="hero" asChild>
      <Link to={to}>
        {label}
        <ArrowUpRight />
      </Link>
    </Button>
  );
}
