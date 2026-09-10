import { createFileRoute } from "@tanstack/react-router";
import {
  FaqSection,
  FounderStory,
  SectionHeading,
  ValuesGrid,
} from "@/components/content-sections";
import { PageIntro, PageLayout } from "@/components/site-shell";
const about = "/about.png";
export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About DEMAze Technologies" },
      {
        name: "description",
        content:
          "Meet the 35+ technologists, innovators, and strategic thinkers behind DEMAze Technologies.",
      },
      { property: "og:title", content: "About DEMAze Technologies" },
      {
        property: "og:description",
        content: "AI-first innovation, accountable partnership, and scalable product engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about-us" }],
  }),
  component: AboutPage,
});
function AboutPage() {
  return (
    <PageLayout>
      <main>
        <PageIntro
          eyebrow="What we are"
          title={
            <>
              Technology partners, <em>not just developers.</em>
            </>
          }
          copy="We bridge complex technical possibilities and real business outcomes through AI-first thinking and accountable delivery."
        />
        <section className="content-section section-wrap about-split">
          <img src={about} alt="DEMAze team collaboration illustration" />
          <div>
            <SectionHeading eyebrow="Who we are" title="Digital transformation architects." />
            <p>
              At DEMAze Technologies, we’re a passionate team of 35+ technologists, innovators, and
              strategic thinkers who believe in the power of AI and cutting-edge technology to
              reshape businesses. Founded with a vision to democratize advanced technology, we
              bridge the gap between complex technical possibilities and real business outcomes.
            </p>
            <div className="keyword-cloud">
              {[
                "AI-First Innovation",
                "Scalable Solutions",
                "Digital Transformation",
                "Future-Ready Architecture",
                "Automation Excellence",
                "Strategic Partnership",
                "Business Intelligence",
                "Agile Development",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="content-section dark-band">
          <div className="section-wrap">
            <SectionHeading eyebrow="What drives us" title="Principles behind the work." />
            <ValuesGrid />
          </div>
        </section>
        <section className="content-section section-wrap">
          <SectionHeading eyebrow="Why choose us" title="Clarity at every level." />
          <div className="benefit-row">
            <article>
              <strong>Real-Time Analytics</strong>
              <p>Stay ahead with accurate, real-time performance tracking.</p>
            </article>
            <article>
              <strong>AI-Driven Growth</strong>
              <p>Make smarter moves with accurate, real-time business insights.</p>
            </article>
            <article>
              <strong>Live Collaboration</strong>
              <p>Connect with your team instantly to track progress and updates.</p>
            </article>
          </div>
        </section>
        <section className="content-section section-wrap faq-section">
          <SectionHeading eyebrow="FAQ" title="Working with DEMAze." />
          <FaqSection compact />
        </section>
        <section className="content-section section-wrap">
          <FounderStory />
        </section>
      </main>
    </PageLayout>
  );
}
