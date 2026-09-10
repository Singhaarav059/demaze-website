import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { pageMeta, site } from "@/content/site";

export const metadata: Metadata = pageMeta(
  "Contact",
  `Talk to ${site.name} about your project.`,
  "/contact-us",
);

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* HERO ------------------------------------------------------------ */}
      <section className="contact-hero">
        <div className="contact-hero-inner" data-reveal>
          <p className="eyebrow-dot">Contact</p>
          <h1 className="contact-hero-title">
            Reach us <em>at any time.</em>
          </h1>
          <p className="contact-hero-sub">
            Tell us what you are building, improving, or trying to understand.
            We will start with the useful questions.
          </p>
        </div>
      </section>

      {/* SPLIT: METHODS + FORM ------------------------------------------- */}
      <section className="contact-split-section">
        <div className="contact-split" data-reveal>
          <div className="contact-methods">
            <a className="contact-method" href={`mailto:${site.email}`}>
              <span className="contact-method-icon" aria-hidden>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">Email us</span>
                <strong className="contact-method-value">{site.email}</strong>
              </span>
            </a>

            <a className="contact-method" href="#enquiry">
              <span className="contact-method-icon" aria-hidden>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">
                  Prefer a conversation?
                </span>
                <strong className="contact-method-value">
                  Send a meeting request
                </strong>
              </span>
            </a>

            <a
              className="contact-method"
              href={site.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-method-icon" aria-hidden>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">Office location</span>
                <strong className="contact-method-value">
                  {site.address}
                </strong>
              </span>
            </a>
          </div>

          <div className="contact-form-panel" id="enquiry">
            <p className="eyebrow-dot">Send an enquiry</p>
            <h2 className="contact-form-heading">Start a conversation.</h2>
            <p className="contact-form-intro">
              Your details stay in your browser until you choose to open your
              email app. There is no submission endpoint behind this form.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
