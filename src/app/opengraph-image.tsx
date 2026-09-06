import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

/**
 * Generated rather than shipped as a file, so the card cannot drift out of
 * sync with the tagline. Rendered once at build time for the static routes.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} · ${site.tagline}`;

/**
 * Satori has no access to the page's CSS, so with no `fonts` array this card
 * was rendering the tagline in its built-in Noto Sans while the site's own H1
 * is a serif — the two things a reader sees back to back, in two different
 * voices. next/font's copy lives at a content-hashed path inside .next, so the
 * file has to come from somewhere addressable: @fontsource ships the same
 * Google original at a stable path, and 22KB of latin-400 woff sits well
 * inside the 500KB bundle ceiling.
 *
 * Read once at module scope, not per request — the bytes do not depend on the
 * request, and this route is prerendered anyway.
 *
 * Two families, not three. Passing `fonts` at all drops Satori's built-in
 * fallback, so whatever is listed has to cover every string on the card:
 * loading Fraunces alone put the eyebrow and the email in a serif. Mono covers
 * both of those rather than sans, because the eyebrow is a `.label` and the
 * other line is an address and an email address — the exact places the site
 * already spends mono. That is the site's real pairing on the card, for one
 * extra file instead of two.
 */
const files = join(process.cwd(), "node_modules/@fontsource");
const [fraunces, jetbrains] = await Promise.all([
  readFile(join(files, "fraunces/files/fraunces-latin-400-normal.woff")),
  readFile(join(files, "jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff")),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          /* Was #07080f, the void that globals.css retired when void and ink
             collapsed onto one ink. The share card was shipping a colour the
             site no longer paints anywhere. */
          background: "#131420",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            left: 380,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "#5271f6",
            opacity: 0.28,
            filter: "blur(140px)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#5271f6",
              marginRight: 16,
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#8b8a93",
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {site.name}
          </div>
        </div>
        <div
          style={{
            color: "#f4f2ec",
            fontFamily: "Fraunces",
            fontSize: 78,
            lineHeight: 1.04,
            letterSpacing: -2.5,
            maxWidth: 960,
            display: "flex",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            color: "#8b8a93",
            fontFamily: "JetBrains Mono",
            fontSize: 24,
            marginTop: 32,
            borderTop: "1px solid #23242e",
            paddingTop: 24,
            display: "flex",
          }}
        >
          Ahmedabad, India · {site.email}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 400 },
        { name: "JetBrains Mono", data: jetbrains, style: "normal", weight: 500 },
      ],
    },
  );
}
