import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { WordReveal } from "@/components/WordReveal";
import { site } from "@/content/site";
import {
  whoWeAre,
  whatWeAreTags,
  whatDrivesUs,
  whyChooseUsAbout,
  process,
} from "@/content/about";

export const metadata: Metadata = {
  title: `About Us | ${site.name}`,
  description: whoWeAre.paragraphs[0],
};

export default function AboutUsPage() {
  return (
    <main className="px-6 pt-28 pb-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-20">
        <section className="flex flex-col gap-8">
          <SectionLabel index="001" label="Who We Are" />
          <WordReveal
            text={whoWeAre.paragraphs.join(" ")}
            className="max-w-4xl font-display text-3xl leading-[1.15] font-normal text-paper md:text-5xl"
          />
          <div className="flex flex-wrap gap-3 pt-4">
            {whatWeAreTags.map((tag) => (
              <span
                key={tag}
                className="min-w-0 max-w-full rounded-full border border-paper/15 px-4 py-2 text-xs break-words text-paper-dim"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <SectionLabel index="002" label="What Drives Us" />
          <div className="grid gap-10 md:grid-cols-2">
            {whatDrivesUs.map((item) => (
              <div key={item.title} className="flex flex-col gap-3 border-t border-paper/10 pt-6">
                <h3 className="font-display text-xl text-paper">{item.title}</h3>
                <p className="text-sm leading-relaxed text-paper-dim">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-10 rounded-3xl bg-ink-soft px-8 py-10 shadow-soft md:px-14">
          <SectionLabel index="003" label="Meet the Founder" />
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <Image
              src={site.founder.photo}
              alt={site.founder.name}
              width={140}
              height={140}
              className="blob-1 object-cover"
            />
            <div className="flex flex-col gap-3">
              <p className="max-w-2xl font-display text-2xl leading-snug font-normal text-paper md:text-3xl">
                &ldquo;{site.founder.quote}&rdquo;
              </p>
              <p className="text-sm text-paper-dim">
                {site.founder.name}, {site.founder.title}
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <SectionLabel index="004" label="Why Choose Us" />
          <div className="grid gap-10 md:grid-cols-3">
            {whyChooseUsAbout.map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <h3 className="font-display text-lg text-paper">{item.title}</h3>
                <p className="text-sm leading-relaxed text-paper-dim">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-10">
          <SectionLabel index="005" label="How We Work" />
          <div className="grid gap-12 md:grid-cols-4">
            {process.map((step) => (
              <div key={step.step} className="flex flex-col gap-4 border-t border-paper/10 pt-6">
                <span className="font-display text-3xl text-accent">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg text-paper">{step.title}</h3>
                <p className="text-sm leading-relaxed text-paper-dim">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
