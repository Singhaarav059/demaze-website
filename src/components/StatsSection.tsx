import Counter from "./Counter";
import { site } from "@/content/site";

export default function StatsSection() {
  return (
    <section className="bg-void text-void-fg grain section-y relative overflow-hidden">
      <div className="bg-accent/12 pointer-events-none absolute bottom-0 left-1/2 h-[40vh] w-[70vw] -translate-x-1/2 rounded-full blur-[150px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <p className="text-void-fg/50 max-w-xl text-sm font-semibold">
          Six years, one delivery team, and a record we can point at.
        </p>

        <dl className="mt-7 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="border-void-fg/12 border-t pt-4">
              <dd className="display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-none">
                {stat.prefix}
                <Counter to={stat.value} />
                <span className="text-accent">{stat.suffix}</span>
              </dd>
              <dt className="text-void-dim mt-2.5 text-xs font-semibold">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
