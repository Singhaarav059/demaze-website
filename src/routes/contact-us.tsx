import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro, PageLayout } from "@/components/site-shell";
export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact DEMAze Technologies" },
      {
        name: "description",
        content:
          "Contact DEMAze Technologies about AI, software engineering, automation, and digital product development.",
      },
      { property: "og:title", content: "Contact DEMAze Technologies" },
      {
        property: "og:description",
        content: "Tell DEMAze about your next AI or software project.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/contact-us" }],
  }),
  component: ContactPage,
});
function ContactPage() {
  return (
    <PageLayout>
      <main id="main-content">
        <PageIntro
          eyebrow="Contact"
          title={
            <>
              Reach us <em>at any time.</em>
            </>
          }
          copy="Tell us what you’re building, improving, or trying to understand. We’ll start with the useful questions."
        />
        <section id="project-enquiry" className="contact-layout section-wrap">
          <div className="contact-methods">
            <a href="mailto:contact@demazetech.com" className="contact-method-card">
              <span className="contact-method-icon">
                <Mail />
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">Email us</span>
                <strong className="contact-method-value">contact@demazetech.com</strong>
              </span>
            </a>
            <a href="#project-enquiry" className="contact-method-card">
              <span className="contact-method-icon">
                <Calendar />
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">Prefer a conversation?</span>
                <strong className="contact-method-value">Send a meeting request</strong>
              </span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=A+804+Ganesh+Glory+11+Jagatpur+Road+Gota+Ahmedabad"
              target="_blank"
              rel="noreferrer"
              aria-label="Office location, opens in a new tab"
              className="contact-method-card"
            >
              <span className="contact-method-icon">
                <MapPin />
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">Office location</span>
                <strong className="contact-method-value">
                  A 804, Ganesh Glory 11, Jagatpur Road, near S.G. Highway, Gota, Ahmedabad
                </strong>
              </span>
            </a>
          </div>
          <ContactForm />
        </section>
      </main>
    </PageLayout>
  );
}
