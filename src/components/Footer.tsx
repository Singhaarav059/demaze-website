import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/**
 * Shared redesign footer for every page: a gradient CTA band leading into a
 * slim copyright/location strip. The decorative mark is the Demaze logo mark
 * (aria-hidden / alt=""), and the copyright uses the real copyright symbol so
 * the copy check passes.
 */
export default function Footer() {
  return (
    <footer className="site-cta-footer">
      <div className="shell">
        <div className="cta-band">
          <span className="cta-band-mark" aria-hidden>
            <Image
              src="/demaze-logo-mark.png"
              alt=""
              width={34}
              height={34}
              className="cta-band-mark-img"
            />
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
