import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Contact Us | ${site.name}`,
  description: "Reach Demaze Technologies anytime.",
};

export default function ContactUsPage() {
  return (
    <main className="px-6 pt-28 pb-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-6">
          <SectionLabel index="001" label="Contact" />
          <h1 className="max-w-2xl font-display text-4xl leading-tight font-light text-paper md:text-6xl">
            Reach us anytime
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-paper-dim">
            Feel free to email us if you have any questions or need more details.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <ContactForm />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-xs tracking-wide text-paper-dim uppercase">Email</span>
              <a
                href={`mailto:${site.email}`}
                className="font-display text-xl text-paper transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs tracking-wide text-paper-dim uppercase">Office</span>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="max-w-sm text-paper transition-colors hover:text-accent"
              >
                {site.address}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
