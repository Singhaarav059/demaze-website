import { createFileRoute } from "@tanstack/react-router";
import { PlaybookForm } from "@/components/playbook-form";
import { PageLayout } from "@/components/site-shell";
export const Route = createFileRoute("/ai-dev-automation-playbook-form")({
  head: () => ({
    meta: [
      { title: "Request the AI Development Playbook | DEMAze" },
      {
        name: "description",
        content: "Request the DEMAze AI-powered development pipeline playbook.",
      },
      { property: "og:title", content: "Request the AI Development Playbook | DEMAze" },
      {
        property: "og:description",
        content: "Request the guide to a production-ready AI development system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://www.demazetech.com/ai-dev-automation-playbook-form" },
    ],
  }),
  component: PlaybookFormPage,
});
function PlaybookFormPage() {
  return (
    <PageLayout>
      <main id="main-content">
        <section className="download-layout section-wrap">
          <div>
            <p className="section-kicker">Request the guide</p>
            <h1>
              Build a production-ready <em>AI pipeline.</em>
            </h1>
            <p>
              Share your details to request the Complete AI-Powered Development Pipeline Playbook.
              We will email it to you, usually within one working day.
            </p>
          </div>
          <PlaybookForm />
        </section>
      </main>
    </PageLayout>
  );
}
