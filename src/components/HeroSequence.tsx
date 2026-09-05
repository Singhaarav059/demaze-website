import Image from "next/image";
import Link from "next/link";
import WordReveal from "./WordReveal";
import Reveal from "./Reveal";
import { site } from "@/content/site";
import { whoWeAre, whatWeAreTags } from "@/content/about";
import { flagshipProjects } from "@/content/projects";

/**
 * Sticky hero with a curtain riding up over it.
 * The wipe is pure CSS: the hero is `sticky`, the paper panel is its next
 * sibling with a higher stacking context, so scrolling slides one over the
 * other with no scroll listener involved.
 */
export default function HeroSequence() {
  const lead = flagshipProjects[0];

  return (
    <div className="relative">
      {/* ---------- Hero, pinned ---------- */}
      <section className="bg-void text-void-fg grain sticky top-0 z-0 flex h-screen flex-col overflow-hidden">
        {/* A 140px blur on a phone-width element is over half its own width, so
            the glow dissolves instead of reading as a field. Below lg the blobs
            are sized past the viewport and the blur is pulled back, which is
            what actually makes them visible there.

            Both blobs were tuned as a backdrop for the WebGL knot, where they
            were the dimmest thing in the frame. With the knot gone they became
            the loudest — a flat saturated wash, in the one colour the rest of
            the site no longer uses as a surface. Alpha is roughly halved so the
            hero reads as ink carrying type, with the product card as its only
            image. */}
        <div className="hero-glow bg-accent/20 pointer-events-none absolute top-[-18%] left-1/2 h-[60vh] w-[135vw] -translate-x-1/2 rounded-full blur-[90px] lg:h-[70vh] lg:w-[70vw] lg:bg-accent/12 lg:blur-[140px]" />
        {/* Second, slower blob. One centred glow on flat ink leaves the top half
            of the hero empty, which is what this fills. It used to be mobile-only
            because the WebGL knot occupied that space at lg; the knot is gone, so
            the treatment that was already designed for its absence now runs
            everywhere. Bright accent, not accent-deep: a dark blue at low alpha
            over near-black has almost no luminance to contribute and reads as
            nothing. Sized in the same width-aware way as the first blob — a
            fixed blur on a 105vw element is a hard-edged disc on a wide screen. */}
        <div
          className="hero-glow bg-accent/16 pointer-events-none absolute top-[2%] right-[-35%] h-[42vh] w-[105vw] rounded-full blur-[80px] lg:right-[-14%] lg:h-[54vh] lg:w-[52vw] lg:blur-[130px]"
          style={{ animationDelay: "-12s", animationDuration: "38s" }}
        />
        <div className="from-void via-void/20 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />

        {/* Height-derived top padding, same clamp the pinned sections use. A
            flat pt-24 is 96px of clearance for a 76px bar, which is fine until
            the viewport is short: at 520px tall the hero's own content ran 5px
            past the frame and the eyebrow was clipped by overflow-hidden. */}
        <div className="relative z-10 mx-auto flex w-full max-w-page flex-1 flex-col justify-end px-6 pt-[clamp(4.5rem,10vh,6rem)] pb-6">
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
              {/* The real product screen, cropped to its headline figure, not
                  the old stock mockup. Chapter 01 sits immediately below this
                  card showing the same platform, and advertising it here with a
                  tilted phone render made the two read as different projects.
                  Cropped because a whole dashboard at 256px is illegible. */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[12px]">
                <div
                  className="absolute inset-0"
                  style={{ transform: "scale(2)", transformOrigin: "66% 29%" }}
                >
                  <Image
                    src="/projects/flagship/automotive-valuation.webp"
                    alt={lead.title}
                    fill
                    sizes="512px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
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

      {/* ---------- Curtain: paper rides up over the dark hero ----------
          Was a full-bleed accent slab. A saturated brand-blue surface is the
          loudest template tell on a page like this, and the wipe reads better
          light-over-dark anyway: it hands the reader the page's real surface
          rather than a third one they will never see again. */}
      <section className="bg-paper relative z-10">
        {/* A held beat of empty paper before any content, on purpose. */}
        <div className="h-[28vh]" />

        <div className="mx-auto max-w-page px-6 pb-14">
          <WordReveal
            as="h2"
            text="We are digital transformation architects, not just developers."
            className="display d-lg max-w-3xl"
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {whoWeAre.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className="text-sm leading-relaxed font-medium text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="overflow-hidden border-t border-line py-4">
          <div className="ticker-track" style={{ ["--ticker-duration" as string]: "48s" }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                {whatWeAreTags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-6 px-6 text-sm font-semibold whitespace-nowrap text-ink"
                  >
                    {tag}
                    <span className="h-1 w-1 rounded-full bg-accent/45" />
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
