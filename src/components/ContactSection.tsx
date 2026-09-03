import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/content/site";

export function ContactSection() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <SectionLabel index="011" label="Contact" />
        <h2 className="max-w-3xl font-display text-4xl leading-tight font-light text-paper md:text-6xl">
          Let&apos;s connect and build smarter, faster, and stronger together.
        </h2>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/contact-us"
            className="rounded-full bg-accent px-7 py-3 font-display text-sm text-ink transition-transform hover:scale-105"
          >
            Reach Us
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-paper/30 px-7 py-3 font-display text-sm text-paper transition-colors hover:border-paper"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
