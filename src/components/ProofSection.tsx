import Image from "next/image";
import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { site } from "@/content/site";

/**
 * Founder quote and the numbers in one beat. Separately they were two quiet
 * sections saying the same thing: trust us. Together the claim and the
 * evidence sit in the same frame.
 */
export default function ProofSection() {
  const { founder } = site;

  return (
    <section className="bg-void text-void-fg grain section-y relative overflow-hidden">
      <div className="bg-accent/12 pointer-events-none absolute bottom-0 left-1/2 h-[40vh] w-[70vw] -translate-x-1/2 rounded-full blur-[150px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionLabel index="006" tone="void">
          Proof
        </SectionLabel>

        <Reveal>
          <blockquote className="display d-lg mt-4 max-w-3xl">“{founder.quote}”</blockquote>

          <figcaption className="mt-6 flex flex-wrap items-center gap-3">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
            <span className="text-sm font-semibold">{founder.name}</span>
            <span className="text-void-dim text-xs font-semibold">{founder.title}</span>
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent text-xs font-semibold hover:underline"
            >
              LinkedIn ↗
            </a>
          </figcaption>
        </Reveal>

        <dl className="mt-12 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="border-void-fg/12 border-t pt-4">
              <dd className="display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-none">
                {stat.prefix}
                <Counter to={stat.value} />
                <span className="text-accent">{stat.suffix}</span>
              </dd>
              <dt className="text-void-dim mt-2.5 text-xs font-semibold">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
