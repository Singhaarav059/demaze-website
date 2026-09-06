import { techStackFlat } from "@/content/services";
import TechLogo from "./TechLogo";

/**
 * A 93px dark strip between two cream sections generated two surface changes
 * to say nothing. Rules do the separating instead.
 *
 * The names now carry their own marks. Set as text alone this was a word list
 * that any studio could type; the marks are the part that has to be true, and
 * they are also the cheapest addition to a vector layer that stood at eight
 * drawings against the reference sites' twenty-eight to a hundred and
 * thirty-three. Monochrome on currentColor, not the vendors' brand colours —
 * eight foreign palettes crossing a cream strip is the exact "stock template"
 * read the rest of the page spends effort avoiding.
 */
export default function TechMarquee() {
  return (
    <section className="bg-paper border-line overflow-hidden border-y py-8">
      <div className="ticker-track" style={{ ["--ticker-duration" as string]: "38s" }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {techStackFlat.map((tech) => (
              <span key={tech} className="flex items-center gap-8 px-8">
                {/* Mono, not display. This is the one place on the page that
                    names real engineering tools, and it was setting Python and
                    Kafka in the same serif as the pull quotes — decorative
                    where the system reserves mono as its credibility signal. */}
                <span className="flex items-center gap-3 font-mono text-lg whitespace-nowrap tracking-tight md:text-xl">
                  {/* Sized in em so the mark tracks the type across the md step
                      instead of needing its own breakpoint. OpenAI and Pinecone
                      have no mark in simple-icons and render as name only. */}
                  <TechLogo name={tech} className="h-[1.05em] w-[1.05em] shrink-0" />
                  {tech}
                </span>
                <span className="bg-accent-deep h-1.5 w-1.5 shrink-0 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
