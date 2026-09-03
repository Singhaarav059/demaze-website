import { SectionLabel } from "@/components/SectionLabel";
import { CountUp } from "@/components/CountUp";
import { site } from "@/content/site";
import { whyChooseUsHome } from "@/content/about";

export function StatsSection() {
  return (
    <section className="px-6 py-10 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 rounded-[2.5rem] bg-ink-soft px-6 py-16 shadow-soft md:px-14 md:py-20">
        <SectionLabel index="005" label="Why Choose Us" />

        <div className="grid gap-10 md:grid-cols-3">
          {whyChooseUsHome.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <h3 className="font-display text-xl text-paper">{item.title}</h3>
              <p className="text-sm leading-relaxed text-paper-dim">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-paper/10 pt-12 md:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="font-display text-4xl text-paper md:text-5xl"
              />
              <p className="text-xs text-paper-dim uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
