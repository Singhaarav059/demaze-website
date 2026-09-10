import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/content/site";

const title = "AI Development Pipeline Playbook | DEMAze";
export const metadata: Metadata = {
  ...pageMeta(
    title,
    "Explore the DEMAze guide to building a production-ready AI development system from zero.",
    "/ai-dev-automation-playbook",
  ),
  // Absolute title so the layout's `%s` template does not append the site name.
  title: { absolute: title },
};

export default function PlaybookPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="resource-hero">
        <div className="resource-hero-copy" data-reveal>
          <p className="eyebrow-dot">Learning resources</p>
          <h1 className="resource-hero-title">
            Complete AI-Powered Development Pipeline <em>Playbook.</em>
          </h1>
          <p className="resource-hero-sub">
            From 0 to a production-ready AI development system.
          </p>
          <div className="resource-meta">
            <span>Krupal</span>
            <span>Nov 13, 2025</span>
          </div>
          <Link className="pill-button" href="/ai-dev-automation-playbook-form">
            Download guide <span aria-hidden>-&gt;</span>
          </Link>
        </div>
        <div className="playbook-cover" data-reveal aria-hidden>
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
  );
}
