import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { images } from "@/assets/images";
import { Button } from "@/components/ui/button";

const navigation = [
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["About Us", "/about-us"],
  ["Blogs", "/blogs"],
] as const;

export function Brand() {
  return (
    <Link to="/" className="site-brand" aria-label="DEMAze Technologies home">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <strong>demaze</strong>
      <small>technologies</small>
    </Link>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu?.querySelector<HTMLAnchorElement>("a")?.focus();

    // Take the rest of the page out of the tab order and the accessibility tree
    // while the overlay covers it. `inert` is the native primitive for exactly this.
    const backdrop = Array.from(menu?.closest(".site-page")?.children ?? []).filter(
      (child): child is HTMLElement => child instanceof HTMLElement && !child.contains(menu),
    );
    backdrop.forEach((element) => (element.inert = true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !menu || !toggle) return;
      // The close button lives outside the <nav>, so include it in the cycle
      // or keyboard users can never reach it.
      const stops = [...menu.querySelectorAll<HTMLElement>("a, button"), toggle];
      const first = stops[0];
      const last = stops.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      backdrop.forEach((element) => (element.inert = false));
      window.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open]);
  return (
    <header className={`site-header ${overlay ? "site-header-overlay" : ""}`}>
      <Link to="/" className="header-logo" aria-label="DEMAze Technologies home">
        {/* alt="" so the link's aria-label is not announced twice. */}
        <img src="/demaze-logo.png" alt="" width={1344} height={420} fetchPriority="high" />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(([label, to]) => (
          <Link key={to} to={to} activeProps={{ className: "active", "aria-current": "page" }}>
            {label}
          </Link>
        ))}
      </nav>
      <Button variant="editorial" size="hero" className="header-cta" asChild>
        <Link to="/contact-us">
          Book a call <ArrowUpRight />
        </Link>
      </Button>
      <Button
        ref={toggleRef}
        className="menu-toggle"
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open && (
        <nav
          ref={menuRef}
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "active", "aria-current": "page" }}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link to="/contact-us" onClick={() => setOpen(false)}>
            Contact Us <ArrowUpRight />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-cta section-wrap">
        <img {...images.footer} alt="" loading="lazy" decoding="async" />
        <div>
          <p className="section-kicker">Have a project in mind?</p>
          <h2>
            Let’s build smarter,
            <br />
            <span>together.</span>
          </h2>
        </div>
        <Button variant="editorial" size="hero" asChild>
          <Link to="/contact-us">
            Start a conversation <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <div className="footer-main section-wrap">
        <div className="footer-about">
          <Brand />
          <p>
            We combine AI, software engineering, and automation with deep industry expertise to
            build scalable, sustainable solutions, working alongside you as a trusted, long-term
            partner.
          </p>
        </div>
        <div className="footer-links">
          <span>Explore</span>
          {navigation.map(([label, to]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
        </div>
        <div className="footer-links">
          <span>Connect</span>
          <a href="mailto:contact@demazetech.com">Email</a>
          <a
            href="https://www.linkedin.com/in/krupalchaudhary"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn, opens in a new tab"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/demaze_technologies"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram, opens in a new tab"
          >
            Instagram
          </a>
          <a
            href="https://x.com/growwithkrupal"
            target="_blank"
            rel="noreferrer"
            aria-label="X, opens in a new tab"
          >
            X
          </a>
        </div>
      </div>
      <div className="footer-base section-wrap">
        <span>DEMAze Technologies © 2026. All rights reserved.</span>
        <span>Ahmedabad, India</span>
      </div>
    </footer>
  );
}

export function PageLayout({
  children,
  overlayHeader = false,
}: {
  children: ReactNode;
  overlayHeader?: boolean;
}) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = page.querySelectorAll<HTMLElement>(
      ".section-heading, .project-card, .industry-grid article, .values-grid article, .process-grid article, .founder-story, .tech-band, .faq-list, .about-split, .benefit-row article, .featured-article, .contact-options > a, .contact-form, .playbook-form, .case-visual, .case-columns > div",
    );
    const revealItems = Array.from(items).filter((item) => !item.closest(".motion-stack"));
    revealItems.forEach((item, index) => {
      item.classList.add("scroll-reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 55}ms`);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="site-page">
      <div className="site-atmosphere" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <SiteHeader overlay={overlayHeader} />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
}) {
  return (
    <section className="page-intro section-wrap">
      <p className="section-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}
