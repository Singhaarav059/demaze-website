import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { whyChooseUsHome } from "@/content/about";

export default function WhyUs() {
  return (
    <section className="bg-paper mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionLabel index="001">Why teams choose us</SectionLabel>
          <h2 className="display d-lg mt-7">
            The difference is in what happens after the handover.
          </h2>
        </div>

        <ol>
          {whyChooseUsHome.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90}>
              <div className="border-line border-t py-9 first:border-t-0 first:pt-0">
                <div className="flex items-baseline gap-5">
                  <span className="text-muted/50 font-display text-sm">
                    0{i + 1}
                  </span>
                  <h3 className="display d-md">{item.title}</h3>
                </div>
                <p className="text-muted mt-4 pl-0 text-[0.98rem] leading-relaxed font-medium md:pl-10">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
