import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

/**
 * Site copy uses plain punctuation. Em dashes tend to arrive through pasted
 * drafts and generated text, so this rejects the character and the encoded
 * forms that would render as one.
 *
 *   node scripts/check-copy.mjs            scans src/ and README.md
 *   node scripts/check-copy.mjs <paths>    scans the given files or folders
 */
const DEFAULT_TARGETS = ["src", "README.md"];
const EXTENSIONS = new Set([".ts", ".tsx", ".css", ".md", ".mdx", ".json"]);

const PATTERNS = [
  { label: "em dash", regex: /\u2014/g },
  { label: "HTML entity &mdash;", regex: /&mdash;/g },
  { label: "numeric entity &#8212;", regex: /&#8212;/g },
  { label: "hex entity &#x2014;", regex: /&#x2014;/gi },
  { label: "escape sequence \\u2014", regex: /\\u2014/g },
];

const targets = process.argv.slice(2);
const roots = targets.length ? targets : DEFAULT_TARGETS;

async function collect(entry) {
  const info = await stat(entry);
  if (info.isFile()) return [entry];
  const names = await readdir(entry, { withFileTypes: true });
  const nested = await Promise.all(
    names
      .filter((d) => d.name !== "node_modules" && !d.name.startsWith("."))
      .map((d) => {
        const full = path.join(entry, d.name);
        return d.isDirectory()
          ? collect(full)
          : EXTENSIONS.has(path.extname(d.name))
            ? [full]
            : [];
      }),
  );
  return nested.flat();
}

const files = (await Promise.all(roots.map(collect))).flat();
const findings = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    for (const { label, regex } of PATTERNS) {
      regex.lastIndex = 0;
      if (regex.test(line)) {
        findings.push(`${file}:${index + 1}: ${label}`);
      }
    }
  });
}

if (findings.length) {
  console.error(
    `Copy check failed (${findings.length} finding${findings.length === 1 ? "" : "s"}):`,
  );
  for (const finding of findings) console.error(`  ${finding}`);
  process.exit(1);
}

console.log(`Copy check passed: ${files.length} files scanned.`);
