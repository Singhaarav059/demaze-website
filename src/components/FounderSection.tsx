import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export function FounderSection() {
  return (
    <section className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="010" label="From the Founder" />

        <Reveal className="mt-12 grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
          <Image
            src={site.founder.photo}
            alt={site.founder.name}
            width={112}
            height={112}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col gap-4">
            <p className="max-w-2xl font-display text-2xl leading-snug font-light text-paper md:text-3xl">
              &ldquo;{site.founder.quote}&rdquo;
            </p>
            <p className="text-sm text-paper-dim">
              <a
                href={site.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper transition-opacity hover:opacity-70"
              >
                {site.founder.name}
              </a>{" "}
              &middot; {site.founder.title}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
