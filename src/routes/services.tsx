import { createFileRoute } from "@tanstack/react-router";
import {
  IndustryGrid,
  SectionHeading,
  ServicesGrid,
  TechnologyBand,
} from "@/components/content-sections";
import { PageIntro, PageLayout } from "@/components/site-shell";
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
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});
function ServicesPage() {
  return (
    <PageLayout>
      <main>
        <PageIntro
          eyebrow="Services"
          title={
            <>
              Apps, websites, <em>AI and more.</em>
            </>
          }
          copy="End-to-end product engineering that turns complex ideas into secure, useful, scalable systems."
        />
        <section className="content-section section-wrap">
          <ServicesGrid detailed />
        </section>
        <section className="content-section wash-lavender">
          <div className="section-wrap">
            <SectionHeading eyebrow="Platforms & partners" title="A modern technology toolkit." />
            <TechnologyBand />
          </div>
        </section>
        <section className="content-section section-wrap">
          <SectionHeading eyebrow="Industries" title="Solutions grounded in context." />
          <IndustryGrid />
        </section>
      </main>
    </PageLayout>
  );
}
