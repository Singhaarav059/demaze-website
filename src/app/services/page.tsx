import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { TechMarquee } from "@/components/TechMarquee";
import { site } from "@/content/site";
import { serviceCategories } from "@/content/services";

export const metadata: Metadata = {
  title: `Services | ${site.name}`,
  description: "Apps, websites, AI and more: the services Demaze Technologies offers.",
};

export default function ServicesPage() {
  return (
    <main className="px-6 pt-28 pb-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 pb-12">
        <SectionLabel index="001" label="What We Do" />
        <h1 className="max-w-3xl font-display text-4xl leading-tight font-normal text-paper md:text-6xl">
          Apps, websites, AI and more
        </h1>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {serviceCategories.map((cat, i) => (
          <div
            key={cat.key}
            className="flex flex-col gap-8 rounded-3xl bg-ink-soft px-8 py-10 shadow-soft md:flex-row md:items-center md:px-14"
          >
            <div className="flex flex-1 flex-col gap-4">
              <span className="font-display text-sm text-accent">
                0{i + 1} / 0{serviceCategories.length}
              </span>
              <h2 className="font-display text-4xl font-normal text-paper md:text-5xl">
                {cat.name}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-paper-dim">{cat.summary}</p>
            </div>
            <ul className="flex flex-1 flex-col gap-3 border-t border-paper/10 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-10">
              {cat.items.map((item) => (
                <li key={item} className="text-sm text-paper-dim">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-6xl">
        <TechMarquee />
      </div>
    </main>
  );
}
