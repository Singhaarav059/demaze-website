import Image from "next/image";
import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { site } from "@/content/site";
import { whyChooseUsHome } from "@/content/about";

/**
 * The claim, the person making it and the numbers behind it, in one beat.
 *
 * This absorbed the old WhyUs section, which sat near the top of the page and
 * asserted the same thing this one corroborates. Two problems with that: its
 * headline landed within about 600px of the curtain's, so the page opened with
 * two large serif statements back to back before showing any work; and its
 * third card, "Proven Track Record", recited "45+ projects / $10M+ / 35+
 * professionals" — which is verbatim the stats row at the bottom of this
 * component, rendered as prose instead of as figures.
 *
 * So the claim moved down here, behind the evidence. The page is now hero,
 * manifesto, then straight into the flagship chapters; you see the work before
 * you are told what it proves.
 */
export default function ProofSection() {
  const { founder } = site;
  const differentiators = whyChooseUsHome.slice(0, 2);

  return (
    <section className="bg-paper section-y relative overflow-hidden">
      <div className="relative mx-auto max-w-page px-6">
        <SectionLabel index="004">Why teams choose us</SectionLabel>
        <h2 className="display d-lg mt-2.5 max-w-2xl">
          The difference shows up after the handover.
        </h2>

        <ol className="border-line mt-10 grid gap-x-12 gap-y-9 border-t pt-8 md:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90}>
              <span className="text-muted/50 font-mono text-[0.65rem]">0{i + 1}</span>
              <h3 className="h-card mt-2">{item.title}</h3>
              <p className="text-muted mt-2.5 max-w-md text-[0.82rem] leading-relaxed font-medium">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <blockquote className="display d-lg mt-16 max-w-3xl">“{founder.quote}”</blockquote>

          {/* The person carrying the quote was a 36px thumbnail sitting in a
              row of inline labels, which is smaller than the bullet next to it
              and reads as a favicon rather than a face. Attribution on a
              founder quote is the credibility, so it gets a real portrait and
              its own stacked block. */}
          <figcaption className="mt-7 flex items-center gap-4">
            <span className="border-line relative h-16 w-16 shrink-0 overflow-hidden rounded-full border md:h-[4.5rem] md:w-[4.5rem]">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="72px"
                className="object-cover"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold">{founder.name}</span>
              <span className="text-muted block text-xs font-semibold">{founder.title}</span>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent mt-1 inline-block text-xs font-semibold hover:underline"
              >
                LinkedIn ↗
              </a>
            </span>
          </figcaption>
        </Reveal>

        <dl className="mt-12 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="border-line border-t pt-4">
              <dd className="display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-none">
                {stat.prefix}
                <Counter to={stat.value} />
                <span className="text-accent">{stat.suffix}</span>
              </dd>
              <dt className="text-muted mt-2.5 text-xs font-semibold">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
