import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { projects, flagshipProjects } from "@/content/projects";
import { pageMeta } from "@/content/site";

/** The three builds that have an art-directed chapter on the homepage. */
const flagshipSlugs = new Set(flagshipProjects.map((p) => p.slug));

export const metadata: Metadata = pageMeta(
  "Projects",
  "Selected systems Demaze Technologies has designed, built and shipped.",
  "/projects",
);

/**
 * A register, not a gallery.
 *
 * Every entry here used to lead with a 520px stock marketing mockup — the same
 * sixteen renders the homepage archive was showing, at four times the size, so
 * removing them from the homepage alone would only have moved the problem one
 * click away. The client work is under NDA and is described in the client's own
 * words; the three systems we can show in full have their own chapters on the
 * homepage. So the page commits to text, and reads as an index of work rather
 * than a portfolio of pictures we do not have.
 */
export default function ProjectsPage() {
  return (
    <main className="bg-paper">
      <header className="bg-void text-void-fg grain relative overflow-hidden px-6 pt-32 pb-12">
        <div className="bg-accent/12 pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-page">
          <p className="label text-accent">Work</p>
          <h1 className="display d-xl mt-6 max-w-4xl">
            {projects.length} systems, built to stay in production.
          </h1>
          <p className="lede text-void-fg/60 mt-6 max-w-xl">
            Every project below is live work for a real client, described in their terms rather than
            ours.
          </p>
        </div>
      </header>

      <div className="border-line mx-auto max-w-page border-t px-6 section-y">
        {projects.map((p, i) => (
          <article
            key={p.slug}
            id={p.slug}
            className="border-line grid scroll-mt-28 gap-x-8 gap-y-4 border-b py-10 first:pt-0 md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-x-14 md:py-14"
          >
            <Reveal>
              <p className="text-muted/60 font-mono text-xs">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="label text-muted/70 mt-2">{p.sector}</p>
              {flagshipSlugs.has(p.slug) && <p className="label text-accent mt-2">Flagship</p>}
            </Reveal>

            <Reveal delay={80}>
              <h2 className="h-card">{p.title}</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-line text-muted max-w-full rounded-full border px-3.5 py-1.5 text-xs font-semibold break-words"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-muted text-sm leading-relaxed font-medium">{p.description}</p>
            </Reveal>
          </article>
        ))}
      </div>
    </main>
  );
}
