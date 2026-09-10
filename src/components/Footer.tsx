import Link from "next/link";
import { site } from "@/content/site";

/**
 * Shared redesign footer for every page: a gradient CTA band leading into a
 * slim copyright/location strip. The decorative mark is an inline SVG (no
 * missing asset), and the copyright uses the real copyright symbol so the copy
 * check passes.
 */
export default function Footer() {
  return (
    <footer className="site-cta-footer">
      <div className="shell">
        <div className="cta-band">
          <span className="cta-band-mark" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z"
                fill="currentColor"
                opacity="0.16"
              />
              <path
                d="m8.5 12 2.4 2.4L15.8 9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="cta-band-copy">
            <span className="eyebrow-dot">Have a project in mind?</span>
            <h2>Let&apos;s build smarter, together.</h2>
          </div>
          <Link href="/contact-us" className="pill-button">
            Start a conversation <span aria-hidden>↗</span>
          </Link>
        </div>
        <div className="slim-footer">
          <p>Demaze Technologies &#169; 2026. All rights reserved.</p>
          <nav aria-label="Footer navigation">
            {site.footerNav.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p>Ahmedabad, India</p>
        </div>
      </div>
    </footer>
  );
}
