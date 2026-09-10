import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FounderStory,
  FaqSection,
  IndustryGrid,
  MetricsStrip,
  ProcessGrid,
  ProjectsGrid,
  SectionHeading,
  ServicesGrid,
  TechnologyBand,
  ValuesGrid,
} from "@/components/content-sections";
import { PageLayout } from "@/components/site-shell";
import { ScrollFocusStack } from "@/components/scroll-focus-stack";
import robotsVideo from "@/assets/demaze-robot-studio.mp4";
import robotsPoster from "@/assets/demaze-robot-studio-poster.jpg";
import robotsVideoWebm from "@/assets/demaze-robot-studio.webm";
import { HeroVideo } from "@/components/hero-video";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Product Development Company | DEMAze" },
      {
        name: "description",
        content:
          "DEMAze combines AI, software engineering, and automation to build scalable digital products and sustainable business solutions.",
      },
      { property: "og:title", content: "AI Product Development Company | DEMAze" },
      {
        property: "og:description",
        content:
          "A strategic partner for scalable AI products, software engineering, and automation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <PageLayout overlayHeader>
        <main id="main-content">
          <section className="home-hero section-wrap">
            <div className="hero-copy animate-rise">
              <p className="eyebrow">
                <span /> Expertise · Innovation · Partnership
              </p>
              <h1>
                Your strategic partner in building <em>scalable AI products.</em>
              </h1>
              <p className="intro">
                We combine AI, software engineering, and automation with deep industry expertise to
                build scalable, sustainable solutions, working alongside you as a trusted, long-term
                partner.
              </p>
              <div className="hero-actions">
                <Button variant="editorial" size="hero" asChild>
                  <Link to="/contact-us">
                    Let’s connect <ArrowUpRight />
                  </Link>
                </Button>
                <Link className="text-link" to="/services">
                  Explore services <ArrowRight />
                </Link>
              </div>
            </div>
            <HeroVideo poster={robotsPoster} webm={robotsVideoWebm} mp4={robotsVideo} />
          </section>
          <MetricsStrip />
          <ScrollFocusStack className="home-stack">
            <section className="content-section stack-chapter stack-work">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Our work"
                  title="Complex problems, useful products."
                  copy="Selected platforms designed around real operations, customers, and growth."
                />
                <ProjectsGrid limit={4} />
                <div className="section-action">
                  <Button variant="editorial" size="hero" asChild>
                    <Link to="/projects">
                      View all work <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
            <section className="content-section stack-chapter stack-services">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading eyebrow="Services" title="Apps, websites, AI and more." />
                <ServicesGrid />
                <div className="section-action">
                  <Button variant="editorial" size="hero" asChild>
                    <Link to="/services">
                      Explore services <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
            <section className="content-section stack-chapter stack-tools">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading eyebrow="Platforms & partners" title="Tools and technologies." />
                <TechnologyBand />
              </div>
            </section>
            <section className="content-section stack-chapter stack-industries">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Industries"
                  title="Deep context across sectors."
                  copy="We combine technology depth with an understanding of the systems, customers, and constraints that shape each industry."
                />
                <IndustryGrid />
              </div>
            </section>
            <section className="content-section stack-chapter dark-band">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading eyebrow="Why choose us" title="Built for lasting impact." />
                <ValuesGrid />
              </div>
            </section>
            <section className="content-section stack-chapter stack-story">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Who we are"
                  title="Digital transformation architects."
                  copy="We’re a team of 35+ technologists, innovators, and strategic thinkers who bridge complex technical possibilities with real business outcomes."
                />
                <FounderStory />
              </div>
            </section>
            <section className="content-section stack-chapter stack-process">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading eyebrow="How we work" title="Clear from idea to scale." />
                <ProcessGrid />
              </div>
            </section>
            <section className="content-section stack-chapter stack-faq">
              <div className="section-wrap faq-section">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading eyebrow="FAQ" title="Good questions, clear answers." />
                <FaqSection />
              </div>
            </section>
          </ScrollFocusStack>
        </main>
      </PageLayout>
    </div>
  );
}
