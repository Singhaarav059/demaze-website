#!/usr/bin/env node
// Verifies .kiro/skills/ satisfies the Kiro Agent Skills contract.
// Run: node scripts/verify-kiro-skills.mjs
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".kiro/skills";
const NAME_RE = /^[a-z0-9-]+$/;
const errors = [];

if (!existsSync(ROOT)) {
  console.error(`missing ${ROOT}`);
  process.exit(1);
}

const folders = readdirSync(ROOT).filter((f) =>
  statSync(join(ROOT, f)).isDirectory(),
);

let descChars = 0;
for (const folder of folders.sort()) {
  const skillPath = join(ROOT, folder, "SKILL.md");
  if (!existsSync(skillPath)) {
    errors.push(`${folder}: no SKILL.md`);
    continue;
  }
  const text = readFileSync(skillPath, "utf8");
  if (!text.startsWith("---")) {
    errors.push(`${folder}: no frontmatter`);
    continue;
  }
  const end = text.indexOf("\n---", 3);
  if (end === -1) {
    errors.push(`${folder}: unterminated frontmatter`);
    continue;
  }

  const fm = {};
  let key = null;
  for (const line of text.slice(3, end).split("\n")) {
    if (!line.trim()) continue;
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (m) {
      key = m[1];
      fm[key] = m[2].trim();
    } else if (key) {
      fm[key] += " " + line.trim();
    }
  }

  const name = fm.name ?? "";
  const description = fm.description ?? "";
  descChars += description.length;

  if (name !== folder) errors.push(`${folder}: name "${name}" must equal folder name`);
  if (!NAME_RE.test(name)) errors.push(`${folder}: name must be lowercase/digits/hyphens`);
  if (name.length > 64) errors.push(`${folder}: name is ${name.length} chars (max 64)`);
  if (!description) errors.push(`${folder}: missing description`);
  if (description.length > 1024)
    errors.push(`${folder}: description is ${description.length} chars (max 1024)`);
}

console.log(`${folders.length} skills, ${descChars} description chars`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}
console.log("all skills satisfy the Kiro contract");
