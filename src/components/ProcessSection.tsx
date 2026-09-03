import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { process } from "@/content/about";

export function ProcessSection() {
  return (
    <section className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="007" label="How We Work" />

        <div className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-10">
          <div
            aria-hidden
            className="absolute top-[13px] right-0 left-0 hidden h-px bg-paper/15 md:block"
          />
          {process.map((step, i) => (
            <Reveal key={step.step} delay={i * 100} className="relative flex flex-col gap-4">
              <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-accent/50 bg-ink font-display text-xs text-accent">
                {step.step}
              </div>
              <h3 className="font-display text-lg text-paper">{step.title}</h3>
              <p className="text-sm leading-relaxed text-paper-dim">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
