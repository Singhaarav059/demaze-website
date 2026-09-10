import type { Metadata } from "next";
import { pageMeta } from "@/content/site";

const title = "Terms of Service | DEMAze";
export const metadata: Metadata = {
  ...pageMeta(
    title,
    "Terms governing use of the DEMAze Technologies website.",
    "/terms-of-service",
  ),
  // Absolute title so the layout's `%s` template does not append the site name.
  title: { absolute: title },
};

export default function TermsOfServicePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* HERO ------------------------------------------------------------ */}
      <section className="legal-hero">
        <div className="legal-hero-inner" data-reveal>
          <p className="eyebrow-dot">Legal</p>
          <h1 className="legal-hero-title">
            Terms of <em>Service.</em>
          </h1>
          <p className="legal-hero-sub">
            Effective September 10, 2026. This draft covers website use and
            should be reviewed by legal counsel before publication.
          </p>
        </div>
      </section>

      {/* BODY ------------------------------------------------------------ */}
      <article className="legal-copy" data-reveal>
        <h2>Website use</h2>
        <p>
          You may use this website to learn about DEMAze Technologies, review
          our work, contact us, and request available resources. You must not
          misuse the website, attempt unauthorized access, or interfere with its
          operation.
        </p>
        <h2>Information and availability</h2>
        <p>
          Website content is provided for general information. We aim to keep it
          accurate and available, but do not guarantee that every detail is
          complete, current, or uninterrupted.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The website design, writing, graphics, and brand materials belong to
          DEMAze Technologies or their respective owners. You may not reproduce
          or commercially reuse them without permission.
        </p>
        <h2>Project engagements</h2>
        <p>
          Website enquiries do not create a client relationship. Any project,
          estimate, confidentiality obligation, scope, or delivery commitment is
          governed by a separate written agreement.
        </p>
        <h2>Third-party services</h2>
        <p>
          Links to external platforms are provided for convenience. Those
          platforms operate under their own terms and privacy practices.
        </p>
        <h2>Liability and changes</h2>
        <p>
          To the extent permitted by law, DEMAze Technologies is not liable for
          indirect loss arising solely from use of this website. We may update
          these terms as the website evolves.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to contact@demazetech.com.
          These terms are governed by applicable laws of India.
        </p>
      </article>
    </main>
  );
}
