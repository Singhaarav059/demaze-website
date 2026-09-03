import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <p className="max-w-xl font-display text-2xl leading-tight text-paper md:text-3xl">
          {site.intro}
        </p>

        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {site.footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-paper-dim transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1 text-sm text-paper-dim">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-paper">
              {site.email}
            </a>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="max-w-xs transition-colors hover:text-paper"
            >
              {site.address}
            </a>
          </div>
        </div>

        <p className="text-xs text-paper-dim/70">
          {site.name} © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
