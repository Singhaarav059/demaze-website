import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { whyChooseUsHome } from "@/content/about";

export default function WhyUs() {
  return (
    // One heading over three equal columns, not a heading beside a list. The
    // old two-column split gave the left side a label and one line to hold and
    // the right side everything else, so the left ran out of content roughly a
    // third of the way down and the rest of that column was dead.
    <section className="bg-paper section-y mx-auto max-w-5xl px-6">
      <SectionLabel index="001">Why teams choose us</SectionLabel>
      <h2 className="display d-lg mt-2.5 max-w-2xl">
        The difference shows up after the handover.
      </h2>

      <ol className="border-line mt-10 grid gap-x-10 gap-y-9 border-t pt-8 md:grid-cols-3">
        {whyChooseUsHome.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 90}>
            <span className="text-muted/50 font-display text-[0.65rem]">0{i + 1}</span>
            <h3 className="display d-md mt-2">{item.title}</h3>
            <p className="text-muted mt-2.5 text-[0.82rem] leading-relaxed font-medium">
              {item.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
