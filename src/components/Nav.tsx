"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-paper/10 bg-ink/80 px-6 py-4 backdrop-blur-md md:px-10">
      <Link href="/" onClick={() => setOpen(false)} className="relative block h-7 w-28">
        <Image
          src={site.logo}
          alt={site.name}
          width={112}
          height={35}
          className="logo-light absolute inset-0 h-7 w-auto"
          priority
        />
        <Image
          src="/demaze-logo-dark.png"
          alt={site.name}
          width={112}
          height={35}
          className="logo-dark absolute inset-0 h-7 w-auto"
          priority
        />
      </Link>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="font-display text-sm tracking-tight text-paper md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      <nav className="hidden items-center gap-8 md:flex">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-display text-sm tracking-tight text-paper transition-opacity hover:opacity-60"
          >
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-1 bg-ink px-6 py-4 md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 font-display text-lg text-paper"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
