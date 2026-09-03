import Link from "next/link";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-32 pb-10 md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--color-accent)_0%,transparent_60%)] opacity-20"
      />

      <div className="relative flex flex-1 flex-col justify-center gap-8">
        <p className="font-display text-xs tracking-[0.3em] text-paper-dim uppercase">
          {site.eyebrow}
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] font-light tracking-tight text-paper">
          {site.tagline}
        </h1>
        <p className="max-w-md text-base text-paper-dim md:text-lg">{site.intro}</p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/contact-us"
            className="rounded-full bg-accent px-7 py-3 font-display text-sm text-ink transition-transform hover:scale-105"
          >
            Let&apos;s Connect
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-paper/30 px-7 py-3 font-display text-sm text-paper transition-colors hover:border-paper"
          >
            Explore Services
          </Link>
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-6 border-t border-paper/10 pt-6 text-xs tracking-[0.3em] text-paper-dim uppercase">
        <span>{site.name}</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
