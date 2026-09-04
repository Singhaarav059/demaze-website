import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-void text-void-fg grain relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-9">
        <div className="flex flex-wrap items-start justify-between gap-7">
          <div>
            {/* Sized to what it renders at. The intrinsic 1344px asked Next
                for a 1920px source to paint a 77px logo. */}
            <Image
              src="/demaze-logo-dark.png"
              alt={site.name}
              width={224}
              height={70}
              sizes="112px"
              className="h-6 w-auto"
            />
            <p className="text-void-dim mt-3.5 max-w-xs text-xs leading-relaxed font-semibold">
              {site.eyebrow.split(" / ").join("  ·  ")}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {site.footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-void-fg/70 hover:text-accent text-sm font-semibold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm font-semibold">
            <a href={`mailto:${site.email}`} className="hover:text-accent transition-colors">
              {site.email}
            </a>
            <a
              href={site.founder.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-void-dim hover:text-accent mt-2 block transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Oversized wordmark as the closing beat. */}
        <p
          className="display text-void-fg/8 mt-10 text-[clamp(2.5rem,10vw,7.5rem)] leading-[0.8] select-none"
          aria-hidden
        >
          Demaze
        </p>

        <div className="border-void-fg/10 text-void-dim mt-5 flex flex-wrap justify-between gap-4 border-t pt-4 text-xs font-semibold">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Ahmedabad, India</span>
        </div>
      </div>
    </footer>
  );
}
