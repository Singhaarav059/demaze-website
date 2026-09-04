import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { industries } from "@/content/industries";

/** Native details/summary: keyboard accessible and zero JS by construction. */
export default function IndustriesSection() {
  return (
    <section className="bg-sand py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-end">
          <div>
            <SectionLabel index="008">Industries</SectionLabel>
            <h2 className="display d-lg mt-7">
              {industries.length} sectors,
              <br />
              one engineering bar.
            </h2>
          </div>
          <p className="lede text-muted max-w-lg">
            Domain context shapes the product, not the standard we hold it to. Open a sector to see
            the kinds of systems we have shipped in it.
          </p>
        </div>

        <div className="border-line mt-14 border-t">
          {industries.map((industry, i) => (
            <Reveal key={industry.name} delay={Math.min(i, 6) * 50}>
              <details className="border-line group border-b">
                <summary className="flex items-center justify-between gap-6 py-5">
                  <span className="flex min-w-0 items-baseline gap-5 md:gap-8">
                    <span className="text-muted/60 font-display shrink-0 text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display group-hover:text-accent text-xl transition-colors md:text-2xl">
                      {industry.name}
                    </span>
                  </span>
                  <span className="acc-sign text-muted shrink-0 text-lg transition-transform duration-300">
                    +
                  </span>
                </summary>
                <ul className="flex flex-wrap gap-2 pt-1 pb-6 md:pl-[3.75rem]">
                  {industry.items.map((item) => (
                    <li
                      key={item}
                      className="border-line text-muted rounded-full border bg-white/40 px-3.5 py-1.5 text-xs font-semibold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
