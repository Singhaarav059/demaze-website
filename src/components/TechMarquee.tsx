import { techStackFlat } from "@/content/services";

export function TechMarquee() {
  const loop = [...techStackFlat, ...techStackFlat];

  return (
    <section className="overflow-hidden border-y border-paper/10 py-8">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-16">
        {loop.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-display text-2xl whitespace-nowrap text-paper-dim md:text-3xl"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
