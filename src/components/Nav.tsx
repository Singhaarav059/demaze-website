"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/services", label: "Expertise" },
  { href: "/about-us", label: "Studio" },
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
    <header className="site-nav">
      <div className="shell nav-inner">
        <Link href="/" className="brand" aria-label="Demaze Technologies home">
          <Image
            src="/demaze-logo.png"
            alt="Demaze"
            width={224}
            height={70}
            sizes="132px"
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
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
        <Link href="/contact-us" className="nav-cta">
          Let’s talk <span aria-hidden>↗</span>
        </Link>
        <details
          className="mobile-nav"
          ref={menu}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              event.currentTarget.open = false;
          }}
        >
          <summary>
            Menu <span aria-hidden>+</span>
          </summary>
          <nav aria-label="Mobile navigation">
            {[...links, { href: "/contact-us", label: "Let’s talk" }].map(
              ({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={current(href) ? "page" : undefined}
                  onClick={() => {
                    if (menu.current) menu.current.open = false;
                  }}
                >
                  <span className="eyebrow">0{i + 1}</span>
                  {label}
                  <span aria-hidden>↗</span>
                </Link>
              ),
            )}
            <p>
              AI & software engineering
              <br />
              Ahmedabad, India. Working worldwide.
            </p>
          </nav>
        </details>
      </div>
    </header>
  );
}
