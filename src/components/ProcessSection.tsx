import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { process } from "@/content/about";

export default function ProcessSection() {
  return (
    <section className="bg-paper section-y mx-auto max-w-5xl px-6">
      <SectionLabel index="005">How we work</SectionLabel>
      <h2 className="display d-lg mt-2.5 max-w-xl">Four phases, no handover cliff.</h2>

      <ol className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2 md:grid-cols-4">
        {process.map((phase, i) => (
          <Reveal as="li" key={phase.step} delay={i * 100}>
            <div className="flex items-center gap-2.5">
              <span className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="bg-line h-px flex-1" />
            </div>
            <p className="text-muted/70 font-display mt-4 text-[0.65rem]">
              Phase {String(phase.step).padStart(2, "0")}
            </p>
            <h3 className="display mt-1 text-base md:text-lg">{phase.title}</h3>
            <p className="text-muted mt-2 text-[0.78rem] leading-relaxed font-medium">
              {phase.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
