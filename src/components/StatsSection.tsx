import { SectionLabel } from "@/components/SectionLabel";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";
import { whyChooseUsHome } from "@/content/about";

export function StatsSection() {
  return (
    <section className="border-y border-paper/10 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="008" label="Results" />

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {site.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="flex flex-col gap-2">
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="font-display text-5xl text-paper md:text-7xl"
              />
              <p className="text-xs tracking-wide text-paper-dim uppercase">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-paper/10 pt-12 md:grid-cols-3">
          {whyChooseUsHome.map((item, i) => (
            <Reveal key={item.title} delay={i * 100} className="flex flex-col gap-3">
              <span className="font-display text-sm text-accent">0{i + 1}</span>
              <h3 className="font-display text-xl text-paper">{item.title}</h3>
              <p className="text-sm leading-relaxed text-paper-dim">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
