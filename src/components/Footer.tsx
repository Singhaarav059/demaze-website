import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-void text-void-fg grain relative overflow-hidden">
      <div className="mx-auto max-w-page px-6 py-9">
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

          {/* Measured at 390px: these links were 20px tall, the email 17px, all
              of them well under the 44px a thumb needs. The rows are also the
              full column wide on a phone so the target is not just tall but
              reachable, and they collapse back to an inline row from sm up where
              a cursor makes the padding unnecessary. */}
          <nav className="-mx-2 flex w-full flex-col sm:mx-0 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
            {site.footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-void-fg/70 hover:text-accent flex min-h-11 items-center px-2 text-sm font-semibold transition-colors sm:min-h-0 sm:px-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="-mx-2 flex w-full flex-col text-sm font-semibold sm:mx-0 sm:w-auto">
            <a
              href={`mailto:${site.email}`}
              className="hover:text-accent flex min-h-11 items-center px-2 transition-colors sm:min-h-0 sm:px-0"
            >
              {site.email}
            </a>
            <a
              href={site.founder.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-void-dim hover:text-accent flex min-h-11 items-center px-2 transition-colors sm:mt-2 sm:min-h-0 sm:px-0"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Oversized wordmark as the closing beat. The 2.5rem floor made it
            40px on a phone — not oversized, just a stray grey label, since 10vw
            of 390px never reaches the floor. 16vw with a 4rem floor keeps it
            reading as a wordmark all the way down to 320px, where it sets at
            about 210px wide inside a 272px column. */}
        <p
          className="display text-void-fg/8 mt-10 text-[clamp(4rem,16vw,7.5rem)] leading-[0.8] select-none"
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
