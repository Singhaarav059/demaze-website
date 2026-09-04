import Link from "next/link";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { serviceCategories } from "@/content/services";

/**
 * Four practices as one dense index rather than four pinned panels.
 *
 * The pinned version spent four full screens, the largest scroll allocation on
 * the page, showing four bullet lists, and it used the same slide mechanic as
 * the flagship sequence, so two of the page's three set-pieces moved
 * identically. Both problems go away by letting a list be a list and giving the
 * reclaimed scroll back to the work.
 *
 * Stays on void so the dark beat between the archive and the tech ticker
 * survives the change: the ticker directly below is also dark, and the two now
 * read as one continuous dark passage.
 */
export default function ServicesStack() {
  return (
    <section className="bg-void text-void-fg grain section-y relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <SectionLabel index="004" tone="void">
              What we build
            </SectionLabel>
            <h2 className="display d-lg mt-2.5 max-w-xl">Four practices, one delivery team.</h2>
          </div>
          <Link
            href="/services"
            className="border-void-fg/25 hover:border-void-fg/60 rounded-full border px-5 py-2 text-xs font-semibold transition-colors"
          >
            All services
          </Link>
        </div>

        <ol className="mt-10">
          {serviceCategories.map((cat, i) => (
            <Reveal as="li" key={cat.key} delay={Math.min(i, 3) * 80}>
              <div className="border-void-fg/12 grid gap-x-12 gap-y-5 border-t py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                <div>
                  <p className="label text-accent">
                    0{i + 1} / 0{serviceCategories.length}
                  </p>
                  <h3 className="display d-md mt-2.5">{cat.name}</h3>
                  <p className="text-void-fg/55 mt-2.5 max-w-md text-[0.82rem] leading-relaxed font-medium">
                    {cat.summary}
                  </p>
                </div>

                <ul className="grid content-start gap-x-8 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="border-void-fg/10 flex items-start gap-2.5 border-b py-2.5 text-[0.76rem] font-semibold"
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
      </div>
    </section>
  );
}
