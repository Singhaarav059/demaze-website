// Regenerates every app/brand icon in public/ from public/demaze-logo.png, the
// single source-of-truth logo file. Keeps the favicon, PWA icons, Apple touch
// icon, and the small footer mark all built from the same artwork so the brand
// mark can't drift out of sync across places it's used.
//
// Run after replacing public/demaze-logo.png: npm run icons
import { writeFile, stat } from "node:fs/promises";
import sharp from "sharp";

const SOURCE = "public/demaze-logo.png";
const BACKGROUND = { r: 253, g: 252, b: 251, alpha: 1 };

// The full lockup is a chevron mark followed by the "Demaze" wordmark. Icons
// need the mark alone, so crop the region before the wordmark starts. Found by
// scanning for the first fully-transparent column after the mark (see git log
// for the one-off scan); stable as long as the source logo isn't redrawn.
const MARK_CROP = { left: 0, top: 0, width: 373, height: 420 };

async function buildIco(sizes, markBuffer, outPath) {
  const frames = [];
  for (const size of sizes) {
    const buf = await sharp({
      create: { width: size, height: size, channels: 4, background: BACKGROUND },
    })
      .composite([
        {
          input: await sharp(markBuffer)
            .resize({ width: Math.round(size * 0.8) })
            .toBuffer(),
          gravity: "center",
        },
      ])
      .png()
      .toBuffer();
    frames.push({ size, buf });
  }

  // Modern ICO directory entries can point straight at PNG-encoded image data,
  // so no BMP conversion is needed.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  const dir = [];
  const data = [];
  let offset = 6 + frames.length * 16;
  for (const { size, buf } of frames) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    dir.push(entry);
    data.push(buf);
    offset += buf.length;
  }
  await writeFile(outPath, Buffer.concat([header, ...dir, ...data]));
}

async function squareIcon(markBuffer, size, fill, outPath) {
  const inner = await sharp(markBuffer)
    .resize({ width: Math.round(size * fill) })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BACKGROUND } })
    .composite([{ input: inner, gravity: "center" }])
    .flatten({ background: BACKGROUND })
    .png()
    .toFile(outPath);
}

const markBuffer = await sharp(SOURCE).extract(MARK_CROP).png().toBuffer();
await writeFile("public/demaze-logo-mark.png", markBuffer);

await squareIcon(markBuffer, 192, 0.62, "public/icon-192.png");
await squareIcon(markBuffer, 512, 0.62, "public/icon-512.png");
await squareIcon(markBuffer, 180, 0.6, "public/apple-touch-icon.png");
await buildIco([16, 32, 48], markBuffer, "public/favicon.ico");

for (const file of [
  "public/demaze-logo-mark.png",
  "public/icon-192.png",
  "public/icon-512.png",
  "public/apple-touch-icon.png",
  "public/favicon.ico",
]) {
  const { size } = await stat(file);
  console.log(`${file} ${Math.round(size / 1024)}KB`);
}
