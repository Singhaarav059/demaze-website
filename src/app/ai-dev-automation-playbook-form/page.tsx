import type { Metadata } from "next";
import PlaybookForm from "@/components/PlaybookForm";
import { pageMeta } from "@/content/site";

const title = "Download the AI Development Playbook | DEMAze";
export const metadata: Metadata = {
  ...pageMeta(
    title,
    "Request the DEMAze AI-powered development pipeline playbook.",
    "/ai-dev-automation-playbook-form",
  ),
  // Absolute title so the layout's `%s` template does not append the site name.
  title: { absolute: title },
};

export default function PlaybookFormPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="download-layout">
        <div className="download-copy" data-reveal>
          <p className="eyebrow-dot">Download guide</p>
          <h1 className="download-title">
            Build a production-ready <em>AI pipeline.</em>
          </h1>
          <p className="download-sub">
            Share your details to request the Complete AI-Powered Development
            Pipeline Playbook.
          </p>
        </div>
        <div className="download-form-panel" data-reveal>
          <PlaybookForm />
        </div>
      </section>
    </main>
  );
}
