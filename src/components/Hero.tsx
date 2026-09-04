import Link from "next/link";
import { site } from "@/content/site";

export function Hero() {
  const words = site.tagline.split(" ");
  const gradientCut = 3;

  return (
    <section className="relative flex h-screen flex-col overflow-hidden bg-void px-6 pt-28 pb-8 md:px-10">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute top-0 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -top-[6vw] right-[-4vw] text-[34vw] leading-none font-medium text-void-fg/[0.04] select-none"
      >
        AI
      </span>

      <div className="relative flex flex-1 flex-col justify-center gap-8">
        <p className="font-display text-xs tracking-[0.3em] text-void-fg-dim uppercase">
          {site.eyebrow}
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(3rem,9.5vw,7.5rem)] leading-[0.92] font-medium tracking-tight text-void-fg">
          {words.map((word, i) => (
            <span
              key={i}
              className={`hero-word inline-block ${i < gradientCut ? "text-gradient" : ""}`}
              style={{ animationDelay: `${0.5 + i * 0.06}s` }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <div className="mt-4 flex flex-col gap-8 border-t border-void-fg/10 pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base text-void-fg-dim md:text-lg">{site.intro}</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/contact-us"
              className="rounded-full bg-accent px-7 py-3 font-display text-sm text-white transition-transform hover:scale-105"
            >
              Let&apos;s Connect
            </Link>
            <Link
              href="/services"
              className="font-display text-sm text-void-fg-dim transition-colors hover:text-void-fg"
            >
              Explore Services &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-between gap-6 pt-6 text-xs tracking-[0.3em] text-void-fg-dim uppercase">
        <span>{site.name}</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
