import { SectionLabel } from "@/components/SectionLabel";
import { industries } from "@/content/industries";

export function IndustriesSection() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <SectionLabel index="009" label="Industries We Serve" />
        <div className="grid gap-x-8 md:grid-cols-2">
          {industries.map((industry) => (
            <details
              key={industry.name}
              className="group border-b border-paper/10 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-paper">
                {industry.name}
                <span className="text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="flex flex-wrap gap-2 pt-4">
                {industry.items.map((item) => (
                  <span
                    key={item}
                    className="min-w-0 max-w-full rounded-full border border-paper/15 px-3 py-1 text-xs break-words text-paper-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
