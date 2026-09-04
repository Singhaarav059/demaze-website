import { techStackFlat } from "@/content/services";

export default function TechMarquee() {
  return (
    <section className="bg-ink text-void-fg overflow-hidden py-8">
      <div className="ticker-track" style={{ ["--ticker-duration" as string]: "38s" }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {techStackFlat.map((tech) => (
              <span key={tech} className="flex items-center gap-8 px-8">
                <span className="display text-2xl whitespace-nowrap md:text-3xl">{tech}</span>
                <span className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
