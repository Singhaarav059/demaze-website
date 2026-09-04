import Image from "next/image";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import SectionLabel from "./SectionLabel";
import { site } from "@/content/site";

export default function FounderSection() {
  const { founder } = site;

  return (
    <section className="bg-paper section-y mx-auto max-w-5xl px-6">
      <SectionLabel index="006">Leadership</SectionLabel>

      <div className="mt-5 grid gap-7 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1.7fr)] md:items-center md:gap-12">
        <Parallax distance={20}>
          <Reveal scale>
            <div className="relative aspect-[4/5] max-w-[15rem] overflow-hidden rounded-[20px]">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="(max-width: 768px) 60vw, 240px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Parallax>

        <Reveal delay={120}>
          <blockquote className="display d-md max-w-xl">“{founder.quote}”</blockquote>
          <figcaption className="border-line mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t pt-4">
            <span className="text-sm font-semibold">{founder.name}</span>
            <span className="text-muted text-xs font-semibold">{founder.title}</span>
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent ml-auto text-xs font-semibold hover:underline"
            >
              LinkedIn ↗
            </a>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
