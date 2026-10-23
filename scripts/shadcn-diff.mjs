#!/usr/bin/env node
// Compares a component's classes with shadcn's, part by part (data-slot).
//
//   node scripts/shadcn-diff.mjs button            # ours: libs/*/…/components/button
//   node scripts/shadcn-diff.mjs dropdown-menu menu # shadcn's name, then ours
//
// shadcn's come from the generated reference app (nova, RTL): the folder
// SHADCN_REFERENCE, or ../shadcn-reference next to this repo. An aid for the
// roadmap's Styles column — reading both still decides (logical properties,
// decomposition and deliberate divergences: docs/shadcn-style-reference.md).
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [shadcnName, ourName = shadcnName] = process.argv.slice(2);
if (!shadcnName) {
  console.error('Usage: node scripts/shadcn-diff.mjs <shadcn name> [our name]');
  process.exit(1);
}

const reference =
  process.env.SHADCN_REFERENCE ?? resolve(root, '..', 'shadcn-reference');
const shadcnFile = join(
  reference,
  'src',
  'components',
  'ui',
  `${shadcnName}.tsx`,
);
if (!existsSync(shadcnFile)) {
  console.error(`Not found: ${shadcnFile}`);
  process.exit(1);
}

const ourDir = [
  `libs/ui/src/lib/components/${ourName}`,
  `libs/ui-lab/src/lib/components/${ourName}`,
  `libs/ui-lab/${ourName}/src`,
  `libs/code/src/lib/components/${ourName}`,
  `libs/${ourName}/src`,
]
  .map((dir) => join(root, dir))
  .find(existsSync);
if (!ourDir) {
  console.error(`Not found: our ${ourName}`);
  process.exit(1);
}

/** A string literal that reads as a list of classes. */
const looksLikeClasses = (text) =>
  /\s/.test(text.trim()) || /^[a-z][\w:/[\]().=&>*~%#-]*$/.test(text.trim());
const tokens = (text) => text.split(/\s+/).filter(Boolean);
const literals = (code) =>
  [...code.matchAll(/(["'`])((?:\\.|(?!\1)[^\\])*)\1/g)]
    .map((match) => match[2])
    .filter(
      (text) =>
        !text.includes('${') && looksLikeClasses(text) && /[a-z]-|:/.test(text),
    );

/** Classes per part: `{ slot: Set }` — and per variant: `{ 'variant=outline': Set }`. */
function shadcnParts(source) {
  const parts = new Map();
  // Variants: cva({ variants: { variant: { outline: "…" } } }).
  for (const block of source.matchAll(
    /(\w+)Variants\s*=\s*cva\(([\s\S]*?)\n\)/g,
  )) {
    const [, owner, body] = block;
    const base = body.match(/^\s*(["'`])([\s\S]*?)\1/);
    if (base) add(parts, `${owner} (cva base)`, tokens(base[2]));
    for (const group of body.matchAll(/(\w+):\s*\{([^{}]*)\}/g)) {
      for (const entry of group[2].matchAll(
        /["']?([\w-]+)["']?\s*:\s*\n?\s*(["'`])([\s\S]*?)\2/g,
      ))
        add(parts, `${owner} ${group[1]}=${entry[1]}`, tokens(entry[3]));
    }
  }
  // Parts: each function with a data-slot, its className strings.
  for (const fn of source.split(/\nfunction /).slice(1)) {
    const slot = fn.match(/data-slot="([\w-]+)"/)?.[1];
    if (!slot) continue;
    const classNames = [...fn.matchAll(/className=\{cn\(([\s\S]*?)\)\}/g)].map(
      (m) => m[1],
    );
    for (const code of classNames)
      for (const text of literals(code)) add(parts, slot, tokens(text));
  }
  return parts;
}

function ourParts(dir) {
  const parts = new Map();
  const files = [];
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const path = join(d, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name.endsWith('.ts') && !name.endsWith('.spec.ts'))
        files.push(path);
    }
  };
  walk(dir);
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    for (const block of source.matchAll(
      /(\w+)Variants\s*=\s*cva\(([\s\S]*?)\n\);/g,
    )) {
      const [, owner, body] = block;
      const base = body.match(/^\s*(["'`])([\s\S]*?)\1/);
      if (base) add(parts, `${owner} (cva base)`, tokens(base[2]));
      for (const group of body.matchAll(/(\w+):\s*\{([^{}]*)\}/g)) {
        for (const entry of group[2].matchAll(
          /["']?([\w-]+)["']?\s*:\s*\n?\s*(["'`])([\s\S]*?)\2/g,
        ))
          add(parts, `${owner} ${group[1]}=${entry[1]}`, tokens(entry[3]));
      }
    }
    const slot = source.match(/'data-slot':\s*'([\w-]+)'/)?.[1];
    if (!slot) continue;
    for (const call of source.matchAll(/cn\(([\s\S]*?)\)\s*[,;)]/g))
      for (const text of literals(call[1])) add(parts, slot, tokens(text));
  }
  return parts;
}

function add(parts, key, list) {
  if (!parts.has(key)) parts.set(key, new Set());
  for (const token of list) parts.get(key).add(token);
}

const theirs = shadcnParts(readFileSync(shadcnFile, 'utf8'));
const ours = ourParts(ourDir);
const keys = [...new Set([...theirs.keys(), ...ours.keys()])].sort();
let same = 0;
for (const key of keys) {
  const a = theirs.get(key) ?? new Set();
  const b = ours.get(key) ?? new Set();
  const onlyTheirs = [...a].filter((t) => !b.has(t));
  const onlyOurs = [...b].filter((t) => !a.has(t));
  if (!theirs.has(key)) {
    console.log(`\n${key} — ours only`);
    continue;
  }
  if (!ours.has(key)) {
    console.log(`\n${key} — shadcn only: ${[...a].join(' ')}`);
    continue;
  }
  if (!onlyTheirs.length && !onlyOurs.length) {
    same++;
    continue;
  }
  console.log(`\n${key}`);
  if (onlyTheirs.length) console.log(`  shadcn only: ${onlyTheirs.join(' ')}`);
  if (onlyOurs.length) console.log(`  ours only:   ${onlyOurs.join(' ')}`);
}
console.log(
  `\n${same} part(s) identical · shadcn: ${shadcnFile} · ours: ${ourDir}`,
);
