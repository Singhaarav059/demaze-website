import { SectionLabel } from "@/components/SectionLabel";
import { WordReveal } from "@/components/WordReveal";
import { whoWeAre, whatWeAreTags } from "@/content/about";

export function WhoWeAre() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <SectionLabel index="001" label="Who We Are" />
        <WordReveal
          text={whoWeAre.paragraphs.join(" ")}
          className="max-w-4xl font-display text-3xl leading-[1.15] font-light text-paper md:text-5xl"
        />
        <div className="flex flex-wrap gap-3 pt-6">
          {whatWeAreTags.map((tag) => (
            <span
              key={tag}
              className="min-w-0 max-w-full rounded-full border border-paper/15 px-4 py-2 text-xs break-words text-paper-dim"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
