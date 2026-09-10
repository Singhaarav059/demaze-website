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
  TechnologyBand,
  ValuesGrid,
} from "@/components/content-sections";
import { PageLayout } from "@/components/site-shell";
import { ScrollFocusStack } from "@/components/scroll-focus-stack";
import { PinnedServicesShowcase } from "@/components/pinned-services-showcase";
import robotsVideo from "@/assets/demaze-robot-studio.mp4";
import robotsPoster from "@/assets/demaze-robot-studio-poster.webp";
import { HeroVideo } from "@/components/hero-video";
import { ClientCanvas } from "@/components/three/client-canvas";

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
          <section className="home-hero section-wrap immersive-hero-section">
            {/* Full 3D hero backdrop. ClientCanvas renders the SSR-safe R3F
                scene behind the copy on capable clients and falls back to a
                static gradient on the server, without WebGL, and under reduced
                motion (the perspective card below keeps the hero video). It is a
                decorative, pointer-events:none layer that fills the hero section
                without disturbing the copy or the perspective card. */}
            <ClientCanvas
              className="home-hero-canvas"
              fallback={<div className="home-hero-canvas-fallback" aria-hidden="true" />}
            />
            <div className="aurora-mesh-container" aria-hidden="true">
              <div className="aurora-blob aurora-blob-1" />
              <div className="aurora-blob aurora-blob-2" />
              <div className="aurora-blob aurora-blob-3" />
            </div>
            <div className="hero-copy animate-rise">
              <div className="badge-dual-pill">
                <span className="badge-kicker">Leading AI</span>
                <Link to="/services" className="badge-text">
                  <span>Architecture · Engineering · Scale</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
              <h1>
                Your strategic partner in building{" "}
                <em className="shimmer-text">scalable AI products.</em>
              </h1>
              <p className="intro">
                We combine AI, software engineering, and automation with deep industry expertise to
                build scalable, sustainable solutions, working alongside you as a trusted, long-term
                partner.
              </p>
              <div className="hero-actions">
                <Link to="/contact-us" className="pill-button button-glow">
                  Let’s connect <ArrowUpRight />
                </Link>
                <Link to="/services" className="button-glass">
                  Explore services <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="hero-perspective-stage">
              <div className="ambient-halo" aria-hidden="true" />
              <div className="hero-floating-badge badge-top" aria-hidden="true">
                <span className="floating-badge-dot" />
                <span className="floating-badge-text">
                  <strong>99.9% Uptime</strong> · SLA Guaranteed
                </span>
              </div>
              <HeroVideo poster={robotsPoster} mp4={robotsVideo} />
              <div className="hero-floating-badge badge-bottom" aria-hidden="true">
                <span className="floating-badge-icon">⚡</span>
                <span className="floating-badge-text">
                  <strong>Senior AI &amp; Product Engineers</strong> · Enterprise AI
                </span>
              </div>
            </div>
          </section>
          <MetricsStrip />
          <ScrollFocusStack className="home-stack">
            <section className="content-section motion-chapter-long stack-work">
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
            <section className="content-section motion-chapter-long cinema-services-section stack-services">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Services"
                  title="Apps, websites, AI and more."
                  copy="End-to-end engineering, scalable intelligence, and digital craft tailored for market leaders."
                />
                <PinnedServicesShowcase />
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
                {/* All 19 sit on /services. Eight here keeps the homepage scannable. */}
                <IndustryGrid limit={8} />
                <div className="section-action">
                  <Button variant="editorial" size="hero" asChild>
                    <Link to="/services">
                      See all industries <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
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
                  copy="We’re a team of technologists, innovators, and strategic thinkers who bridge complex technical possibilities with real business outcomes."
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
