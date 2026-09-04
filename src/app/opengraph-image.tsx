import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Generated rather than shipped as a file, so the card cannot drift out of
 * sync with the tagline. Rendered once at build time for the static routes.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} · ${site.tagline}`;

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
          background: "#07080f",
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
            fontSize: 28,
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
    size,
  );
}
