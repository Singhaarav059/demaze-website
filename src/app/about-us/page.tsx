import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import StatsSection from "@/components/StatsSection";
import { pageMeta, site } from "@/content/site";
import { whoWeAre, whatDrivesUs, whyChooseUsAbout, whatWeAreTags } from "@/content/about";

export const metadata: Metadata = pageMeta("About us", whoWeAre.paragraphs[0], "/about-us");

export default function AboutPage() {
  return (
    <main className="bg-paper">
      <header className="bg-void text-void-fg grain relative overflow-hidden px-6 pt-32 pb-12">
        <div className="bg-accent/18 pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-page">
          <p className="label text-accent">About us</p>
          <h1 className="display d-xl mt-6 max-w-4xl">{whoWeAre.heading}</h1>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {whoWeAre.paragraphs.map((p, i) => (
              <p key={i} className="lede text-void-fg/60">
                {p}
              </p>
            ))}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-page px-6 section-y">
        <p className="label text-muted">What drives us</p>
        <div className="border-line mt-10 grid gap-x-14 border-t md:grid-cols-2">
          {whatDrivesUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="border-line border-b py-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-muted/50 font-mono text-xs">0{i + 1}</span>
                  <h2 className="h-card">{item.title}</h2>
                </div>
                <p className="text-muted mt-3 text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand px-6 section-y">
        <div className="mx-auto grid max-w-page gap-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)] md:items-center md:gap-16">
          <Reveal scale>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[30px]">
              <Image
                src={site.founder.photo}
                alt={site.founder.name}
                fill
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <blockquote className="display d-md max-w-2xl">“{site.founder.quote}”</blockquote>
            <p className="border-line mt-8 border-t pt-6 font-semibold">
              {site.founder.name}
              <span className="text-muted ml-3 text-sm">{site.founder.title}</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 section-y">
        <p className="label text-muted">Why choose us</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {whyChooseUsAbout.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="border-line border-t pt-6">
                <h3 className="display text-2xl">{item.title}</h3>
                <p className="text-muted mt-3 text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="mt-16 flex flex-wrap gap-2">
          {whatWeAreTags.map((tag) => (
            <li
              key={tag}
              className="border-line text-muted rounded-full border px-4 py-2 text-xs font-semibold"
            >
              {tag}
            </li>
          ))}
        </ul>
      </section>

      <StatsSection />
    </main>
  );
}
