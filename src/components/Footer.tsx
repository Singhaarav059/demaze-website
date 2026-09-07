import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="eyebrow">The next useful thing starts here.</p>
            <Link className="footer-invitation" href="/contact-us">
              What’s on
              <br />
              your mind? <span aria-hidden>↗</span>
            </Link>
          </div>
          <div className="footer-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>
              Based in Ahmedabad.
              <br />
              Building for the world.
            </p>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden>
          demaze<span>↗</span>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Demaze Technologies</p>
          <nav aria-label="Footer navigation">
            {site.footerNav.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={site.founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
