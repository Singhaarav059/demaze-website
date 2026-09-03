import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";

const project = projects.find((p) => p.slug === "luxury-ecommerce-platform")!;

const details = [
  { position: "18% 25%", caption: project.tags[0] },
  { position: "62% 55%", caption: project.tags[1] },
  { position: "82% 15%", caption: project.tags[2] },
];

export function FlagshipEcommerce() {
  return (
    <section className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="004" label="Product Three / Luxury eCommerce" />

        <Reveal className="mt-10 flex flex-col gap-4">
          <h3 className="max-w-3xl font-display text-3xl font-light text-paper md:text-5xl">
            {project.title}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-paper-dim md:text-base">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={100} className="relative mt-10 aspect-[16/8] overflow-hidden rounded-2xl bg-ink-soft shadow-soft">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {details.map((detail, i) => (
            <Reveal key={detail.caption} delay={150 + i * 80} className="flex flex-col gap-3">
              <div
                className="aspect-square rounded-xl bg-ink-soft shadow-soft"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "260%",
                  backgroundPosition: detail.position,
                }}
              />
              <p className="text-xs leading-snug text-paper-dim">{detail.caption}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <Link
            href={`/projects#${project.slug}`}
            className="mt-8 inline-block text-sm text-accent transition-opacity hover:opacity-70"
          >
            View case study &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
