import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: "Selected systems Demaze Technologies has designed, built and shipped.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-paper">
      <header className="bg-void text-void-fg grain relative overflow-hidden px-6 pt-40 pb-20">
        <div className="bg-accent/18 pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-6xl">
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

      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {projects.map((p, i) => (
          <article
            key={p.slug}
            id={p.slug}
            className="border-line grid scroll-mt-28 gap-8 border-b py-14 first:pt-0 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14"
          >
            <Parallax distance={20} className={i % 2 === 1 ? "md:order-2" : undefined}>
              <Reveal scale>
                <div className="bg-sand relative aspect-[4/3] overflow-hidden rounded-[24px]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </Parallax>

            <Reveal delay={100} className="flex flex-col justify-center">
              <p className="text-muted/60 font-display text-xs">
                {String(i + 1).padStart(2, "0")}
                {p.featured ? "  ·  Featured" : ""}
              </p>
              <h2 className="display d-md mt-3">{p.title}</h2>
              <p className="text-muted mt-4 text-sm leading-relaxed font-medium">{p.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
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
          </article>
        ))}
      </div>
    </main>
  );
}
