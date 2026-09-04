"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <nav
          className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4 transition-all duration-500 sm:pl-6 ${
            solid
              ? "bg-void/85 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-xl"
              : "bg-void/35 backdrop-blur-md"
          }`}
        >
          <Link href="/" className="shrink-0" aria-label={site.name}>
            <Image
              src="/demaze-logo-dark.png"
              alt={site.name}
              width={1344}
              height={420}
              priority
              className="h-6 w-auto sm:h-7"
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-void-fg/70 hover:text-void-fg rounded-full px-4 py-2 text-sm font-semibold transition-colors"
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
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="border-void-fg/20 text-void-fg grid h-10 w-10 place-items-center rounded-full border md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`bg-void-fg absolute left-0 block h-[1.5px] w-4 transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`bg-void-fg absolute left-0 block h-[1.5px] w-4 transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
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
        <p className="text-void-dim mt-10 text-sm font-semibold">{site.email}</p>
      </div>
    </>
  );
}
