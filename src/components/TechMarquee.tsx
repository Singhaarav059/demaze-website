import { techStackFlat } from "@/content/services";

/**
 * A 93px dark strip between two cream sections generated two surface changes
 * to say nothing. Rules do the separating instead.
 */
export default function TechMarquee() {
  return (
    <section className="bg-paper border-line overflow-hidden border-y py-8">
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
