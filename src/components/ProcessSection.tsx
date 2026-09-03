import { SectionLabel } from "@/components/SectionLabel";
import { process } from "@/content/about";

export function ProcessSection() {
  return (
    <section className="px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 rounded-[2.5rem] bg-ink-soft px-6 py-16 shadow-soft md:px-14 md:py-20">
        <SectionLabel index="006" label="How We Work" />
        <div className="grid gap-12 md:grid-cols-4">
          {process.map((step) => (
            <div key={step.step} className="flex flex-col gap-4 border-t border-paper/10 pt-6">
              <span className="font-display text-3xl text-accent">
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg text-paper">{step.title}</h3>
              <p className="text-sm leading-relaxed text-paper-dim">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
