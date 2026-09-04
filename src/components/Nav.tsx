"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

/**
 * Reads the actual painted surface under the bar rather than being told about
 * it. The page alternates cream, near-black and full-bleed accent, and a bar
 * that is always near-black lands as a hard slab on the cream stretches.
 * Sampling the computed background means new sections need no annotation.
 */
function surfaceIsDark(y: number) {
  const stack = document.elementsFromPoint(window.innerWidth / 2, y);
  for (const node of stack) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);
    if (!m) continue;
    const [r, g, b] = [+m[1], +m[2], +m[3]];
    if ((m[4] === undefined ? 1 : +m[4]) < 0.5) continue; // see through it
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.6;
  }
  return true;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const toggle = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      // Just under the bar, so it reports what the bar is sitting on.
      setOnDark(surfaceIsDark(80));

      // A fixed bar has nowhere to go, so whatever headline happens to scroll
      // under it stays covered for as long as it is there. Reading downward
      // retracts it; any upward intent brings it straight back. The 5px
      // deadzone stops smooth-scroll sub-pixel jitter flipping it every frame.
      const dy = y - lastY.current;
      if (Math.abs(dy) > 5) {
        setHidden(y > 160 && dy > 0);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus();
  }, []);

  // Escape closes, and focus is kept inside the sheet while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const stops = [
        toggle.current,
        ...sheet.current.querySelectorAll<HTMLElement>("a[href], button"),
      ].filter(Boolean) as HTMLElement[];
      if (stops.length === 0) return;
      const edge = e.shiftKey ? stops[0] : stops[stops.length - 1];
      if (document.activeElement === edge) {
        e.preventDefault();
        (e.shiftKey ? stops[stops.length - 1] : stops[0]).focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const barTone = onDark
    ? solid
      ? "bg-void/85 text-void-fg shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      : "bg-void/35 text-void-fg backdrop-blur-md"
    : solid
      ? "bg-paper/80 text-ink ring-line/70 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.45)] ring-1 backdrop-blur-xl"
      : "bg-paper/35 text-ink backdrop-blur-md";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pt-5 ${
          hidden && !open ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4 transition-[background-color,color,box-shadow] duration-500 sm:pl-6 ${barTone}`}
        >
          <Link href="/" className="shrink-0" aria-label={site.name}>
            <Image
              src={onDark ? "/demaze-logo-dark.png" : "/demaze-logo.png"}
              alt={site.name}
              width={224}
              height={70}
              sizes="112px"
              priority
              className="h-6 w-auto sm:h-7"
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold opacity-70 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact-us"
              className="bg-accent hover:bg-accent-deep hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors sm:inline-flex"
            >
              Start a project
            </Link>
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid h-10 w-10 place-items-center rounded-full border md:hidden ${
                open || onDark ? "border-void-fg/20 text-void-fg" : "border-ink/20 text-ink"
              }`}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet. `inert` while closed, otherwise the four links stay in
          the tab order behind a pane nobody can see. */}
      <div
        ref={sheet}
        id="mobile-menu"
        inert={!open}
        className={`bg-void text-void-fg fixed inset-0 z-40 flex flex-col justify-end px-6 pb-16 transition-opacity duration-400 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {site.nav.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="display d-lg block py-1 transition-transform duration-500"
                style={{
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                  transitionDelay: `${80 + i * 60}ms`,
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* The bar hides this button below sm, so without it here the primary
            call to action is unreachable on a phone. */}
        <Link
          href="/contact-us"
          onClick={() => setOpen(false)}
          className="bg-accent hover:bg-accent-deep mt-8 inline-flex w-fit rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          Start a project
        </Link>

        <a
          href={`mailto:${site.email}`}
          className="text-void-dim hover:text-void-fg mt-6 text-sm font-semibold transition-colors"
        >
          {site.email}
        </a>
      </div>
    </>
  );
}
