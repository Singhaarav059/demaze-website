import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { whyChooseUsHome } from "@/content/about";

export default function WhyUs() {
  return (
    <section className="bg-paper section-y mx-auto max-w-5xl px-6">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:gap-14">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionLabel index="001">Why teams choose us</SectionLabel>
          <h2 className="display d-lg mt-2.5">The difference shows up after the handover.</h2>
        </div>

        <ol>
          {whyChooseUsHome.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 90}>
              <div className="border-line border-t py-5 first:border-t-0 first:pt-0">
                <div className="flex items-baseline gap-4">
                  <span className="text-muted/50 font-display text-[0.65rem]">0{i + 1}</span>
                  <h3 className="display d-md">{item.title}</h3>
                </div>
                <p className="text-muted mt-2 text-[0.82rem] leading-relaxed font-medium md:pl-8">
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
