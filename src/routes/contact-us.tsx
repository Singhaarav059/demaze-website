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
    links: [{ rel: "canonical", href: "/contact-us" }],
  }),
  component: ContactPage,
});
function ContactPage() {
  return (
    <PageLayout>
      <main>
        <PageIntro
          eyebrow="Contact"
          title={
            <>
              Reach us <em>at any time.</em>
            </>
          }
          copy="Tell us what you’re building, improving, or trying to understand. We’ll start with the useful questions."
        />
        <section className="contact-layout section-wrap">
          <div className="contact-options">
            <a href="mailto:contact@demazetech.com">
              <Mail />
              <span>
                <small>Email us</small>
                <strong>contact@demazetech.com</strong>
              </span>
            </a>
            <a href="https://calendly.com/" target="_blank" rel="noreferrer">
              <Calendar />
              <span>
                <small>Prefer a conversation?</small>
                <strong>Book with Calendly</strong>
              </span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=A+804+Ganesh+Glory+11+Jagatpur+Road+Gota+Ahmedabad"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin />
              <span>
                <small>Office location</small>
                <strong>
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
