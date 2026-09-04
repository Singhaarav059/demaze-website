"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-6">
      <div className="flex items-center justify-between gap-4 rounded-full border border-void-fg/10 bg-void/80 py-2 pr-2 pl-5 shadow-soft backdrop-blur-xl md:pr-3">
        <Link href="/" onClick={() => setOpen(false)} className="relative block h-6 w-24 shrink-0">
          <Image
            src="/demaze-logo-dark.png"
            alt={site.name}
            width={112}
            height={35}
            className="absolute inset-0 h-6 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 font-display text-sm text-void-fg-dim transition-colors hover:bg-void-fg/10 hover:text-void-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/contact-us"
            className="rounded-full bg-accent px-5 py-2.5 font-display text-sm text-white transition-transform hover:scale-105"
          >
            Let&apos;s Talk
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-void-fg/10 px-4 py-2 font-display text-sm text-void-fg md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="mt-2 flex flex-col gap-1 rounded-3xl border border-void-fg/10 bg-void/95 p-4 backdrop-blur-xl md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-display text-lg text-void-fg"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between px-4 pt-2">
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
