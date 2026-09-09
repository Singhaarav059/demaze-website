import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} · ${site.tagline}`;

const files = join(process.cwd(), "node_modules/@fontsource");
const [fraunces, jetbrains] = await Promise.all([
  readFile(join(files, "fraunces/files/fraunces-latin-400-normal.woff")),
  readFile(
    join(files, "jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff"),
  ),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#f6f5f0",
        color: "#19241f",
        padding: "60px 70px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "JetBrains Mono",
          fontSize: 18,
          borderBottom: "1px solid #cbd2c6",
          paddingBottom: 25,
        }}
      >
        <span>DEMAZE TECHNOLOGIES</span>
        <span>AI & SOFTWARE STUDIO</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 55,
          fontFamily: "Fraunces",
          fontSize: 105,
          lineHeight: 1.02,
          letterSpacing: -5,
        }}
      >
        <span>Complexity,</span>
        <span style={{ color: "#fd1774" }}>made useful.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          fontFamily: "JetBrains Mono",
          fontSize: 17,
          color: "#657068",
        }}
      >
        Independent thinking. Integrated engineering.
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 400 },
        {
          name: "JetBrains Mono",
          data: jetbrains,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
