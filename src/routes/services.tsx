import { createFileRoute } from "@tanstack/react-router";
import {
  IndustryGrid,
  SectionHeading,
  ServicesGrid,
  TechnologyBand,
} from "@/components/content-sections";
import { PageIntro, PageLayout } from "@/components/site-shell";
import { ScrollFocusStack } from "@/components/scroll-focus-stack";
export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "AI, App & Cloud Services | DEMAze" },
      {
        name: "description",
        content:
          "Explore DEMAze AI, machine learning, web, mobile, SaaS, eCommerce, and cloud engineering services.",
      },
      { property: "og:title", content: "AI, App & Cloud Services | DEMAze" },
      {
        property: "og:description",
        content: "Scalable AI and software engineering services for modern businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/services" }],
  }),
  component: ServicesPage,
});
function ServicesPage() {
  return (
    <PageLayout>
      <main id="main-content">
        <PageIntro
          eyebrow="Services"
          title={
            <>
              Apps, websites, <em>AI and more.</em>
            </>
          }
          copy="End-to-end product engineering that turns complex ideas into secure, useful, scalable systems."
        />
        <ScrollFocusStack className="interior-motion-stack">
          <section
            className="content-section section-wrap motion-chapter motion-chapter-long"
            aria-labelledby="all-services"
          >
            {/* The cards are h3, so without this the outline jumps h1 -> h3. */}
            <h2 id="all-services" className="sr-only">
              What we build
            </h2>
            <ServicesGrid detailed />
          </section>
          <section className="content-section wash-lavender motion-chapter">
            <div className="section-wrap">
              <SectionHeading eyebrow="Platforms & partners" title="A modern technology toolkit." />
              <TechnologyBand />
            </div>
          </section>
          <section className="content-section section-wrap motion-chapter">
            <SectionHeading eyebrow="Industries" title="Solutions grounded in context." />
            <IndustryGrid />
          </section>
        </ScrollFocusStack>
      </main>
    </PageLayout>
  );
}
