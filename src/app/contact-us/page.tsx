import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { pageMeta, site } from "@/content/site";
import "@/components/StudioPages.css";

export const metadata: Metadata = pageMeta(
  "Contact",
  `Talk to ${site.name} about your project.`,
  "/contact-us",
);

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="sp-page">
      <header className="sp-hero sp-contact-hero">
        <div className="shell sp-hero-grid">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h1>
              Bring us the part that is <em>hard to untangle.</em>
            </h1>
            <p className="sp-intro">
              A rough brief is enough. Tell us what needs to change, what is
              getting in the way, and where you need an honest technical
              partner.
            </p>
          </div>
          <aside className="sp-hero-note">
            <span>What happens next</span>
            <strong>
              A considered reply,
              <br />
              not an automated funnel.
            </strong>
            <p>We will tell you whether we are the right team for the work.</p>
          </aside>
        </div>
      </header>
      <section className="shell sp-contact-grid">
        <div>
          <p className="eyebrow">Project brief</p>
          <h2>Prepare an email.</h2>
          <p className="sp-form-intro">
            Your details stay in your browser until you choose to open your
            email app. There is no submission endpoint behind this form.
          </p>
          <ContactForm />
        </div>
        <aside className="sp-contact-aside">
          <div className="sp-contact-person">
            <Image
              src={site.founder.photo}
              alt={site.founder.name}
              width={76}
              height={76}
            />
            <div>
              <b>{site.founder.name}</b>
              <span>{site.founder.title}</span>
            </div>
          </div>
          <blockquote>“{site.founder.quote}”</blockquote>
          <div className="sp-contact-details">
            <p>
              <span>Email</span>
              <a className="text-link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <p>
              <span>Studio</span>
              <a
                className="text-link"
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer noopener"
              >
                {site.address} <i aria-hidden>↗</i>
              </a>
            </p>
            <p>
              <span>Team</span>
              <b>
                {site.stats[2].value}
                {site.stats[2].suffix} specialists · {site.stats[3].value}
                {site.stats[3].suffix} years
              </b>
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
