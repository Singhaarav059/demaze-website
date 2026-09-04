import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { serviceCategories, platformTabs, techStackFlat } from "@/content/services";
import { process } from "@/content/about";
import { pageMeta } from "@/content/site";

export const metadata: Metadata = pageMeta(
  "Services",
  "AI and ML, web, mobile and SaaS, e-commerce, and cloud engineering.",
  "/services",
);

export default function ServicesPage() {
  return (
    <main className="bg-paper">
      <header className="bg-void text-void-fg grain relative overflow-hidden px-6 pt-32 pb-12">
        <div className="bg-accent/18 pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="label text-accent">Services</p>
          <h1 className="display d-xl mt-6 max-w-4xl">
            Four practices, delivered by one team.
          </h1>
          <ul className="mt-10 flex flex-wrap gap-2">
            {platformTabs.map((tab) => (
              <li
                key={tab}
                className="border-void-fg/20 rounded-full border px-4 py-2 text-xs font-semibold"
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 section-y">
        {serviceCategories.map((cat, i) => (
          <Reveal key={cat.key}>
            <section className="border-line grid gap-8 border-b py-14 first:pt-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-14">
              <div>
                <p className="text-accent font-display text-xs">
                  0{i + 1} / 0{serviceCategories.length}
                </p>
                <h2 className="display d-lg mt-3">{cat.name}</h2>
                <p className="text-muted mt-5 max-w-md text-sm leading-relaxed font-medium">
                  {cat.summary}
                </p>
              </div>
              <ul className="grid content-start gap-x-8 sm:grid-cols-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="border-line flex items-start gap-3 border-b py-3.5 text-sm font-semibold"
                  >
                    <span className="bg-accent mt-2 h-1 w-1 shrink-0 rounded-full" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      <section className="bg-ink text-void-fg px-6 section-y">
        <div className="mx-auto max-w-5xl">
          <p className="label text-void-dim">Core stack</p>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {techStackFlat.map((tech) => (
              <li key={tech} className="display text-2xl md:text-3xl">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 section-y">
        <h2 className="display d-lg max-w-2xl">How an engagement runs.</h2>
        <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-4">
          {process.map((phase, i) => (
            <Reveal as="li" key={phase.step} delay={i * 100}>
              <p className="text-muted/70 font-display text-xs">
                Phase {String(phase.step).padStart(2, "0")}
              </p>
              <h3 className="display mt-2 text-2xl">{phase.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed font-medium">
                {phase.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Link
          href="/contact-us"
          className="bg-accent hover:bg-accent-deep mt-14 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors"
        >
          Scope a project with us
        </Link>
      </section>
    </main>
  );
}
