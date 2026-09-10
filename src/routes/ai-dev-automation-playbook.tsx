import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/ai-dev-automation-playbook")({
  head: () => ({
    meta: [
      { title: "AI Development Pipeline Playbook | DEMAze" },
      {
        name: "description",
        content:
          "Explore the DEMAze guide to building a production-ready AI development system from zero.",
      },
      { property: "og:title", content: "Complete AI-Powered Development Pipeline Playbook" },
      {
        property: "og:description",
        content: "From zero to a production-ready AI development system.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/ai-dev-automation-playbook" }],
  }),
  component: PlaybookPage,
});
function PlaybookPage() {
  return (
    <PageLayout>
      <main>
        <section className="resource-hero section-wrap">
          <div>
            <p className="section-kicker">Learning resources</p>
            <h1>
              Complete AI-Powered Development Pipeline <em>Playbook.</em>
            </h1>
            <p>From 0 to a production-ready AI development system.</p>
            <div className="resource-meta">
              <span>Krupal</span>
              <span>Nov 13, 2025</span>
            </div>
            <Button variant="editorial" size="hero" asChild>
              <Link to="/ai-dev-automation-playbook-form">
                Download guide <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <div className="playbook-cover" aria-hidden="true">
            <small>DEMAze / Resources</small>
            <strong>AI</strong>
            <span>
              Development
              <br />
              Pipeline
              <br />
              Playbook
            </span>
            <i>01</i>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
