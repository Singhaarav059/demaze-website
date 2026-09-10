"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Redesigned header. Logo links home, a centred nav marks the active route via
 * usePathname, and a solid pink "Book a call" pill sits on the right. The
 * frosted [data-scrolled] state is toggled by SiteMotion (one place owns the
 * scroll listener), so this component only renders markup and stays fully
 * usable without JavaScript. Below 820px the desktop nav collapses into a
 * details/summary disclosure that still navigates.
 */
const links = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Nav() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node))
        menu.current.open = false;
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);

  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <Link
        href="/"
        className="header-brand"
        aria-label="Demaze Technologies home"
      >
        <Image
          src="/demaze-logo.png"
          alt="Demaze"
          width={224}
          height={70}
          sizes="96px"
          priority
        />
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={current(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <Link href="/contact-us" className="pill-button header-cta">
        Book a call <span aria-hidden>↗</span>
      </Link>
      <details
        className="header-menu"
        ref={menu}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            event.currentTarget.open = false;
        }}
      >
        <summary>
          Menu <span aria-hidden>+</span>
        </summary>
        <nav className="header-menu-panel" aria-label="Mobile navigation">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={current(href) ? "page" : undefined}
              onClick={() => {
                if (menu.current) menu.current.open = false;
              }}
            >
              {label}
              <span aria-hidden>↗</span>
            </Link>
          ))}
          <Link
            href="/contact-us"
            className="pill-button"
            onClick={() => {
              if (menu.current) menu.current.open = false;
            }}
          >
            Book a call <span aria-hidden>↗</span>
          </Link>
        </nav>
      </details>
    </header>
  );
}
