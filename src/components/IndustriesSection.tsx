import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { industries } from "@/content/industries";

/**
 * Deliberately not an accordion. On the homepage this only has to say which
 * sectors we work in, so it reads as one wrapped line of names rather than
 * twenty rows each hiding nine more list items.
 */
export default function IndustriesSection() {
  return (
    <section className="bg-sand section-y">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] md:items-end">
          <div>
            <SectionLabel index="007">Industries</SectionLabel>
            <h2 className="display d-lg mt-2.5">{industries.length} sectors, one bar.</h2>
          </div>
          <p className="text-muted max-w-md text-sm leading-relaxed font-medium">
            Domain context shapes the product, not the standard we hold it to.
          </p>
        </div>

        <Reveal>
          <ul className="border-line mt-8 flex flex-wrap items-center gap-x-1 gap-y-2 border-t pt-8">
            {industries.map((industry, i) => (
              <li key={industry.name} className="flex items-center gap-1">
                <span className="display hover:text-accent cursor-default text-base transition-colors md:text-lg">
                  {industry.name}
                </span>
                {i < industries.length - 1 && (
                  <span className="bg-accent/50 mx-2 h-1 w-1 shrink-0 rounded-full" aria-hidden />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
