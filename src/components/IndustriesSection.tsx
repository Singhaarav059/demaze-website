import { SectionLabel } from "@/components/SectionLabel";
import { industries } from "@/content/industries";

export function IndustriesSection() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <SectionLabel index="009" label="Industries We Serve" />
        <div className="flex flex-col border-t border-paper/10">
          {industries.map((industry, i) => (
            <details
              key={industry.name}
              className="group border-b border-paper/10 py-6 [&_summary::-webkit-details-marker]:hidden md:py-8"
            >
              <summary className="flex cursor-pointer list-none items-baseline gap-4 md:gap-8">
                <span className="font-display text-sm text-accent md:w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display flex-1 text-2xl font-medium text-paper transition-opacity group-hover:opacity-60 md:text-4xl">
                  {industry.name}
                </h3>
                <span className="font-display text-2xl text-paper-dim transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="flex flex-wrap gap-2 pt-6 pl-0 md:pl-20">
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
