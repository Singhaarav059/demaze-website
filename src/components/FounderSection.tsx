import Image from "next/image";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import SectionLabel from "./SectionLabel";
import { site } from "@/content/site";

export default function FounderSection() {
  const { founder } = site;

  return (
    <section className="bg-paper mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionLabel index="009">Leadership</SectionLabel>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:items-center md:gap-16">
        <Parallax distance={26}>
          <Reveal scale>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[30px]">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Parallax>

        <Reveal delay={120}>
          <blockquote className="display d-md max-w-2xl">“{founder.quote}”</blockquote>
          <figcaption className="border-line mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-6">
            <span className="font-semibold">{founder.name}</span>
            <span className="text-muted text-sm font-semibold">{founder.title}</span>
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent ml-auto text-sm font-semibold hover:underline"
            >
              LinkedIn ↗
            </a>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
