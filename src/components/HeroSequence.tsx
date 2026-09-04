import Image from "next/image";
import Link from "next/link";
import HeroScene from "./HeroScene";
import WordReveal from "./WordReveal";
import Reveal from "./Reveal";
import { site } from "@/content/site";
import { whoWeAre, whatWeAreTags } from "@/content/about";
import { flagshipProjects } from "@/content/projects";

/**
 * Sticky hero with a full-bleed colour curtain riding up over it.
 * The wipe is pure CSS: the hero is `sticky`, the accent panel is its next
 * sibling with a higher stacking context, so scrolling slides one over the
 * other with no scroll listener involved.
 */
export default function HeroSequence() {
  const lead = flagshipProjects[0];

  return (
    <div className="relative">
      {/* ---------- Hero, pinned ---------- */}
      <section className="bg-void text-void-fg grain sticky top-0 z-0 flex h-screen flex-col overflow-hidden">
        <div className="hero-glow bg-accent/25 pointer-events-none absolute top-[-20%] left-1/2 h-[70vh] w-[70vw] -translate-x-1/2 rounded-full blur-[140px]" />
        {/* Second, slower blob. Below lg there is no knot, and one centred glow
            on flat black leaves the top half of the hero empty. */}
        <div
          className="hero-glow bg-accent-deep/30 pointer-events-none absolute top-[6%] right-[-20%] h-[45vh] w-[80vw] rounded-full blur-[120px] lg:hidden"
          style={{ animationDelay: "-12s", animationDuration: "38s" }}
        />
        <HeroScene />
        <div className="from-void via-void/20 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
        {/* Keeps the headline off the knot's bright lobes without dimming the
            whole scene. Only lg renders the knot, so below that this scrim has
            nothing to protect against and would just flatten the hero. */}
        <div className="from-void via-void/75 pointer-events-none absolute inset-0 hidden bg-gradient-to-r to-transparent to-70% lg:block" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-end px-6 pt-24 pb-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="label text-accent">{site.eyebrow}</p>
              <h1 className="display d-xl mt-3 text-balance">{site.tagline}</h1>
              <p className="lede text-void-fg/65 mt-4 max-w-lg">{site.intro}</p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <Link
                  href="/contact-us"
                  className="bg-accent hover:bg-accent-deep rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
                >
                  Start a project
                </Link>
                <Link
                  href="/projects"
                  className="border-void-fg/25 hover:border-void-fg/60 rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
                >
                  See our work
                </Link>
              </div>
            </div>

            {/* Floating proof card */}
            <Link
              href={`/projects#${lead.slug}`}
              className="border-void-fg/12 bg-void-fg/6 hover:bg-void-fg/10 group hidden w-64 shrink-0 rounded-[18px] border p-2.5 backdrop-blur-xl transition-colors lg:block"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[12px]">
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  sizes="256px"
                  className="scale-[1.18] object-cover saturate-[0.5] transition-transform duration-700 group-hover:scale-[1.24]"
                />
              </div>
              <div className="flex items-end justify-between gap-3 px-1.5 pt-2.5 pb-0.5">
                <div>
                  <p className="label text-accent">Flagship</p>
                  <p className="mt-1 text-xs leading-snug font-semibold">{lead.title}</p>
                </div>
                <span className="text-void-dim shrink-0 text-lg leading-none">↗</span>
              </div>
            </Link>
          </div>

          <div className="border-void-fg/10 mt-6 flex items-center justify-between border-t pt-4">
            <p className="text-void-dim text-xs font-semibold">
              {site.stats[0].value}
              {site.stats[0].suffix} projects delivered · {site.stats[3].value}
              {site.stats[3].suffix} years
            </p>
            <p className="text-void-dim text-xs font-semibold tracking-[0.2em] uppercase">Scroll</p>
          </div>
        </div>
      </section>

      {/* ---------- Curtain: full-bleed accent rides up over the hero ---------- */}
      <section className="bg-accent relative z-10 text-white">
        {/* A held beat of pure colour before any content, on purpose. */}
        <div className="h-[28vh]" />

        <div className="mx-auto max-w-5xl px-6 pb-14">
          <WordReveal
            as="h2"
            text="We are digital transformation architects, not just developers."
            className="display d-lg max-w-3xl"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {whoWeAre.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className="text-sm leading-relaxed font-medium text-white/70">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="overflow-hidden border-t border-white/15 py-4">
          <div className="ticker-track" style={{ ["--ticker-duration" as string]: "48s" }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                {whatWeAreTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-6 px-6 text-sm font-semibold whitespace-nowrap text-white/85"
                  >
                    {tag}
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
