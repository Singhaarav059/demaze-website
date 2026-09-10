import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
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
import { images, type SiteImage } from "@/assets/images";

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
    <Reveal className="section-heading">
      <p className="section-kicker">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </Reveal>
  );
}

function Metric({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.match(/^\D*/)?.[0].replace(/[0-9]/g, "") ?? "";
    const suffix = value.match(/\D*$/)?.[0] ?? "";
    // Qualitative values have nothing to count up, so show the final text right away
    // instead of the placeholder "0" until the element scrolls into view.
    if (Number.isNaN(target)) {
      el.textContent = value;
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        if (reducedMotion.matches) {
          el.textContent = value;
          return;
        }
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / 1100);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div>
      <small>0{index + 1}</small>
      <strong ref={ref}>0</strong>
      <span>{label}</span>
    </div>
  );
}

export function MetricsStrip() {
  return (
    <div className="metrics-strip section-wrap">
      {metrics.map(([value, label], i) => (
        <Metric key={label} value={value} label={label} index={i} />
      ))}
    </div>
  );
}

const cardTints = [
  "var(--color-pastel-lavender)",
  "var(--color-pastel-blue)",
  "var(--color-pastel-mint)",
  "var(--color-pastel-butter)",
];

function BentoSpotlightCard({
  project,
  index,
  cardTint,
}: {
  project: (typeof projects)[number];
  index: number;
  cardTint: string;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <article
      ref={cardRef}
      className="home-work-card spotlight-card"
      onPointerMove={handlePointerMove}
      key={project.title}
    >
      <Link to="/projects" className="home-work-card-link">
        <span className="home-work-media" style={{ background: cardTint }}>
          <img
            {...project.image}
            alt={`${project.title} interface`}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            className="home-work-img"
          />
        </span>
        <span className="home-work-body">
          <span className="home-work-meta">
            <span className="home-work-tag">{project.features[0] || "Featured"}</span>
            <ArrowUpRight size={18} className="home-work-arrow" />
          </span>
          <span className="home-work-title">{project.title}</span>
          <span className="home-work-copy">{project.description}</span>

          {/* Living UI micro-widgets */}
          {index === 0 && (
            <div className="bento-live-badge">
              <span className="bento-sparkline">↗ +38% Valuation</span>
              <span>· Instant EMI Engine</span>
            </div>
          )}
          {index === 1 && (
            <div className="bento-live-badge">
              <span className="bento-beacon-dot" />
              <span>Evidence Vault · Encrypted</span>
            </div>
          )}
          {index === 2 && (
            <div className="bento-live-badge">
              <span style={{ color: "var(--color-accent-oklch)", fontWeight: 700 }}>
                ★ Live Fitting AI
              </span>
              <span>· 99.4% Match</span>
            </div>
          )}
          {index === 3 && (
            <div className="bento-live-badge">
              <div className="bento-soundwave" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <span>Live Sarathi Companion · Active</span>
            </div>
          )}

          <ul className="home-work-features">
            {project.features.slice(1, 3).map((feat) => (
              <li key={feat} className="home-work-feature-pill">
                {feat}
              </li>
            ))}
          </ul>
        </span>
      </Link>
    </article>
  );
}

export function ProjectsGrid({ limit }: { limit?: number }) {
  const entries = typeof limit === "number" ? projects.slice(0, limit) : projects;
  return (
    <div className="home-work-grid">
      {entries.map((project, index) => (
        <BentoSpotlightCard
          key={project.title}
          project={project}
          index={index}
          cardTint={cardTints[index % cardTints.length] ?? "var(--color-pastel-lavender)"}
        />
      ))}
    </div>
  );
}

function AnimatedServiceVisual({
  image,
  title,
  index,
}: {
  image: SiteImage;
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
    // resetPointer only writes CSS custom props, never preventDefault -> passive.
    visual.addEventListener("pointerleave", resetPointer, { passive: true });
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
      <img {...image} alt="" loading="lazy" decoding="async" />
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

    // Same reason as ScrollFocusStack: one forced layout read per frame, not per
    // scroll event.
    let scheduled = 0;
    const onScroll = () => {
      if (scheduled) return;
      scheduled = window.requestAnimationFrame(() => {
        scheduled = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scheduled) window.cancelAnimationFrame(scheduled);
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

function TechnologyRow() {
  return (
    <>
      {technologies.map(([name, image]) => (
        <div className="tech-band-item" key={name}>
          <img {...image} alt={`${name} logo`} loading="lazy" decoding="async" />
          <span>{name}</span>
        </div>
      ))}
    </>
  );
}

export function TechnologyBand({ reverse = false }: { reverse?: boolean }) {
  // Built on the accessible <Marquee> primitive: it handles the seamless
  // duplicated track (with the clone hidden from assistive tech), a keyboard/
  // pointer-reachable pause control, and full neutralisation under reduced
  // motion. The `reverse` prop maps to the marquee's scroll direction so the
  // /services band still runs the opposite way from the homepage band. The
  // outer .tech-band keeps the existing frame, edge mask, and logo styling.
  return (
    <div className="tech-band tech-band-marquee">
      <Marquee
        speed={reverse ? 30 : 26}
        direction={reverse ? "right" : "left"}
        label="Platforms and technologies we work with"
      >
        <TechnologyRow />
      </Marquee>
    </div>
  );
}

export function ServicesCards() {
  return (
    <div className="services-cards">
      {services.map((service, index) => (
        // The `id` is a deep-link anchor target (e.g. #ai-ml), so it stays on a
        // real <article>. Reveal wraps it for the staggered scroll entrance.
        <Reveal key={service.title} className="services-card-reveal" stagger={index}>
          <article
            id={service.id}
            className={`services-card-custom services-card-pastel-${index + 1}`}
          >
            <div className="services-card-media">
              <img {...service.image} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="services-card-body">
              <span className="services-card-no">{service.number}</span>
              <h3 className="services-card-title">{service.title}</h3>
              <p className="services-card-copy">{service.description}</p>
              <ul className="services-card-list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function IndustryGrid({ limit }: { limit?: number }) {
  const entries = typeof limit === "number" ? industries.slice(0, limit) : industries;
  return (
    <div className="industry-grid">
      {entries.map(([industry, solutions], index) => (
        <Reveal as="article" key={industry} stagger={index}>
          <small>{String(index + 1).padStart(2, "0")}</small>
          <h3>{industry}</h3>
          <ul>
            {solutions.map((solution) => (
              <li key={solution}>{solution}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function ValuesGrid() {
  return (
    <div className="values-grid">
      {values.map(([title, copy], index) => (
        <Reveal as="article" key={title} stagger={index}>
          <small>0{index + 1}</small>
          <h3>{title}</h3>
          <p>{copy}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function ProcessGrid() {
  return (
    <div className="process-grid">
      {process.map(([title, copy], index) => (
        <Reveal as="article" key={title} stagger={index}>
          <span>0{index + 1}</span>
          <h3>{title}</h3>
          <p>{copy}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function FounderStory() {
  return (
    <div className="founder-story">
      <img
        {...images.founder}
        alt="Krupal Chaudhary, Founder and CEO of DEMAze Technologies"
        loading="lazy"
        decoding="async"
      />
      <blockquote>
        <p>
          “Through the strategic use of your vision and data, we design AI solutions that make your
          brand stand out and drive revenue growth, leading execution with focus and
          accountability.”
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
    <Magnetic strength={14}>
      <Button variant="editorial" size="hero" asChild>
        <Link to={to}>
          {label}
          <ArrowUpRight />
        </Link>
      </Button>
    </Magnetic>
  );
}
