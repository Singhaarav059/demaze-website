import sharp from "sharp";
import { readdir, stat, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

/**
 * The project mockups arrive as full-resolution PNG exports — 20MB across 16
 * files, for slots that are at most ~620 CSS px wide. Next re-encodes them per
 * request anyway, so the source resolution only costs repo weight and first-hit
 * optimisation time.
 *
 *   node scripts/optimize-images.mjs          dry run, prints the savings
 *   node scripts/optimize-images.mjs --apply  writes .webp and drops the .png
 */
const dir = "public/projects";
const apply = process.argv.includes("--apply");

// The widest slot any of these fills is ~620 CSS px, so 1600 still covers a 2x
// render with room to spare.
const MAX_WIDTH = 1600;
const QUALITY = 86;

const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));
let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(dir, file);
  const dst = src.replace(/\.png$/, ".webp");
  const meta = await sharp(src).metadata();
  const buf = await sharp(src)
    .resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

  const size = (await stat(src)).size;
  before += size;
  after += buf.length;
  console.log(
    `${file.padEnd(44)} ${meta.width}x${meta.height}  ` +
      `${(size / 1048576).toFixed(2)}MB -> ${(buf.length / 1048576).toFixed(2)}MB  ` +
      `(${Math.round(100 - (buf.length / size) * 100)}% smaller)`,
  );

  if (apply) {
    await writeFile(dst, buf);
    await unlink(src);
  }
}

console.log(
  `\nTOTAL ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB ` +
    `(${Math.round(100 - (after / before) * 100)}% smaller)${apply ? "" : "\n\nDry run. Pass --apply to write."}`,
);
