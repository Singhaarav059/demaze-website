import Link from "next/link";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import Glyph, { type GlyphName } from "./Glyph";
import { serviceCategories } from "@/content/services";
import { industries } from "@/content/industries";

const PRACTICE_GLYPHS: GlyphName[] = ["ai", "app", "commerce", "cloud"];

/**
 * Four practices as one dense index rather than four pinned panels.
 *
 * The pinned version spent four full screens, the largest scroll allocation on
 * the page, showing four bullet lists, and it used the same slide mechanic as
 * the flagship sequence, so two of the page's three set-pieces moved
 * identically. Both problems go away by letting a list be a list and giving the
 * reclaimed scroll back to the work.
 *
 * On paper, not void. Dark is now reserved for the flagship chapters and the
 * two bookends, so a dark section means "product moment" rather than "a new
 * section started"; a services index is neither.
 */
export default function ServicesStack() {
  return (
    <section className="bg-paper section-y relative overflow-hidden">
      <div className="mx-auto max-w-page px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <SectionLabel index="003">What we build</SectionLabel>
            <h2 className="display d-lg mt-2.5 max-w-xl">Four practices, one delivery team.</h2>
          </div>
          <Link
            href="/services"
            className="border-line hover:border-ink rounded-full border px-5 py-2 text-xs font-semibold transition-colors"
          >
            All services
          </Link>
        </div>

        <ol className="mt-10">
          {serviceCategories.map((cat, i) => (
            <Reveal as="li" key={cat.key} delay={Math.min(i, 3) * 80}>
              <div className="border-line grid gap-x-12 gap-y-5 border-t py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                <div>
                  <p className="label text-accent">
                    0{i + 1} / 0{serviceCategories.length}
                  </p>
                  {/* Same mark language as the process phases, so the two
                      indexes read as one system rather than two lists. */}
                  <Glyph
                    name={PRACTICE_GLYPHS[i] ?? "cloud"}
                    className="text-accent mt-4 h-11 w-11"
                  />
                  <h3 className="h-card mt-4">{cat.name}</h3>
                  <p className="text-muted mt-2.5 max-w-md text-[0.82rem] leading-relaxed font-medium">
                    {cat.summary}
                  </p>
                </div>

                <ul className="grid content-start gap-x-8 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="border-line flex items-start gap-2.5 border-b py-2.5 text-[0.76rem] font-semibold"
                    >
                      <span className="bg-accent mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* The sectors were their own section with their own headline ("19
            sectors, one bar."), a supporting paragraph and a surface change, to
            deliver one wrapped line of names. What we build and where we build
            it is one beat, so it runs as a strip at the foot of this one. */}
        <Reveal>
          <div className="border-line mt-14 border-t pt-8">
            <p className="label text-muted/70">Sectors · {industries.length}</p>
            {/* Plain text, so no hover colour: these are names, not links, and a
                colour change on hover promises a click that never happens. */}
            <ul className="text-ink/80 mt-4 flex flex-wrap items-center gap-x-1 gap-y-2">
              {industries.map((industry, i) => (
                <li key={industry.name} className="flex items-center gap-1">
                  <span className="display text-base md:text-lg">{industry.name}</span>
                  {i < industries.length - 1 && (
                    <span className="bg-accent/50 mx-2 h-1 w-1 shrink-0 rounded-full" aria-hidden />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
