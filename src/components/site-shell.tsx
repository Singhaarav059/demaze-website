import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { images } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll";
import { CustomCursor } from "@/components/motion/custom-cursor";

const navigation = [
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["About Us", "/about-us"],
  ["Contact Us", "/contact-us"],
] as const;

export function Brand() {
  return (
    <Link to="/" className="site-brand" aria-label="DEMAze Technologies home">
      {/* Same mark as the header, so the brand doesn't shift between a photo
          logo up top and a hand-drawn placeholder down here. */}
      <img src="/demaze-logo-mark.png" alt="" className="brand-mark" width={373} height={420} />
      <strong>demaze</strong>
      <small>technologies</small>
    </Link>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    let scheduled = 0;
    const onScroll = () => {
      if (scheduled) return;
      scheduled = window.requestAnimationFrame(() => {
        scheduled = 0;
        header.classList.toggle("is-condensed", window.scrollY > 40);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scheduled) window.cancelAnimationFrame(scheduled);
    };
  }, []);

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
    <header ref={headerRef} className={`site-header ${overlay ? "site-header-overlay" : ""}`}>
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
      <Link to="/contact-us" className="pill-button header-cta">
        Book a call <ArrowUpRight />
      </Link>
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
              {to === "/contact-us" && <ArrowUpRight />}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-cta-footer">
      <div className="section-wrap">
        <div className="cta-band">
          <span className="cta-band-mark" aria-hidden>
            <img
              src="/demaze-logo-mark.png"
              alt=""
              width={34}
              height={34}
              className="cta-band-mark-img"
            />
          </span>
          <div className="cta-band-copy">
            <span className="eyebrow-dot">Have a project in mind?</span>
            <h2>Let’s build smarter, together.</h2>
          </div>
          <Link to="/contact-us" className="pill-button">
            Start a conversation <ArrowUpRight />
          </Link>
        </div>
        <div className="slim-footer">
          <p>Demaze Technologies © {new Date().getFullYear()}. All rights reserved.</p>
          <nav aria-label="Footer navigation">
            {navigation.map(([label, to]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </nav>
          <p>Ahmedabad, India</p>
        </div>
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

  // Centralised scroll-reveal observer for the sections that are NOT already
  // wrapped in the <Reveal> primitive (SectionHeading and the industry/values/
  // process grids now compose <Reveal> directly). This keeps the same reduced-
  // motion behaviour as before: under prefers-reduced-motion nothing is
  // observed and every element stays in its natural, fully-visible state. The
  // add-`is-visible`-then-unobserve pattern is identical to <Reveal>, so the
  // two never fight over the same node.
  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = page.querySelectorAll<HTMLElement>(
      ".project-card, .project-showcase-card, .founder-story, .about-split, .benefit-row article, .contact-options > a, .contact-form, .playbook-form",
    );
    const revealItems = Array.from(items).filter(
      (item) => !item.closest(".motion-stack") && !item.closest(".scroll-reveal"),
    );
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
    <SmoothScrollProvider>
      <div ref={pageRef} className="site-page">
        <ScrollProgress />
        {/* Decorative, aria-hidden, and self-disabling on touch/coarse pointers
            and under reduced motion (never hides the native cursor). */}
        <CustomCursor />
        <div className="site-atmosphere" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="film-grain-overlay" aria-hidden="true" />
        <SiteHeader overlay={overlayHeader} />
        {children}
        <SiteFooter />
      </div>
    </SmoothScrollProvider>
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
