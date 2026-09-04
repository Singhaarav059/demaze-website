import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { pageMeta, site } from "@/content/site";

export const metadata: Metadata = pageMeta(
  "Contact",
  `Talk to ${site.name} about your project. Describe the problem and we will tell you honestly whether we are the right team for it.`,
  "/contact-us",
);

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <header className="bg-void text-void-fg grain relative overflow-hidden px-6 pt-32 pb-12">
        <div className="bg-accent/18 pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="label text-accent">Contact</p>
          <h1 className="display d-xl mt-6 max-w-3xl">Tell us what you are trying to build.</h1>
          <p className="lede text-void-fg/60 mt-6 max-w-xl">
            No pitch deck required. Describe the problem and we will tell you honestly whether we
            are the right team for it.
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 section-y md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <ContactForm />

        <aside className="flex flex-col gap-10">
          <div className="border-line rounded-[24px] border p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={site.founder.photo}
                  alt={site.founder.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{site.founder.name}</p>
                <p className="text-muted text-sm font-semibold">{site.founder.title}</p>
              </div>
            </div>
            <p className="text-muted mt-5 text-sm leading-relaxed font-medium">
              {site.founder.quote}
            </p>
          </div>

          <div>
            <p className="label text-muted">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-accent mt-2 block font-semibold transition-colors"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="label text-muted">Studio</p>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-accent mt-2 block max-w-xs text-sm leading-relaxed font-semibold transition-colors"
            >
              {site.address}
            </a>
          </div>

          <div>
            <p className="label text-muted">Team</p>
            <p className="mt-2 text-sm font-semibold">
              {site.stats[2].value}
              {site.stats[2].suffix} specialists · {site.stats[3].value}
              {site.stats[3].suffix} years
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
