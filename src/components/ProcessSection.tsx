import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { process } from "@/content/about";

export default function ProcessSection() {
  return (
    <section className="bg-paper mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionLabel index="007">How we work</SectionLabel>
      <h2 className="display d-lg mt-7 max-w-3xl">
        Four phases, no handover cliff at the end of any of them.
      </h2>

      <ol className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-4">
        {process.map((phase, i) => (
          <Reveal as="li" key={phase.step} delay={i * 110}>
            <div className="relative">
              {/* Connector rail, drawn between markers rather than around cards. */}
              <div className="flex items-center gap-3">
                <span className="bg-accent relative z-10 h-2.5 w-2.5 shrink-0 rounded-full" />
                <span className="bg-line h-px flex-1" />
              </div>
              <p className="text-muted/70 font-display mt-6 text-xs">
                Phase {String(phase.step).padStart(2, "0")}
              </p>
              <h3 className="display mt-2 text-2xl">{phase.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed font-medium">
                {phase.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
