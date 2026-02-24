#!/usr/bin/env node
// Syncs the `code` property in *-demo-container.ts files to match
// the actual content of the corresponding *-demo.ts files.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(
  __dirname,
  '..',
  'apps',
  'showcase',
  'src',
  'app',
  'pages',
  'docs',
);

function findFiles(dir, pattern) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, pattern));
    } else if (entry.isFile() && pattern.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Escape a raw file string for embedding inside a JS template literal.
function escapeForTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\') // backslashes first
    .replace(/`/g, '\\`') // backticks
    .replace(/\$\{/g, '\\${'); // template expressions
}

/**
 * Scan forward from `startIndex` (which points to an opening backtick)
 * and return the index of the matching unescaped closing backtick.
 * Respects `\\` escape sequences so that `\`` is NOT treated as closing.
 */
function findClosingBacktick(content, startIndex) {
  let i = startIndex + 1; // skip the opening backtick
  while (i < content.length) {
    const ch = content[i];
    if (ch === '\\') {
      i += 2; // skip escape sequence (backslash + next char)
    } else if (ch === '`') {
      return i; // found the unescaped closing backtick
    } else {
      i++;
    }
  }
  return -1;
}

/**
 * Replace the content of `readonly code = \`...\`` in containerContent
 * with the new escaped value. Returns the updated string or null if not found.
 */
function replaceCodeProperty(containerContent, newEscapedContent) {
  const propRegex = /readonly code\s*=\s*`/g;
  const match = propRegex.exec(containerContent);
  if (!match) return null;

  // The opening backtick is the last char of the matched string
  const openBtPos = match.index + match[0].length - 1;
  const closeBtPos = findClosingBacktick(containerContent, openBtPos);
  if (closeBtPos === -1) return null;

  return (
    containerContent.slice(0, openBtPos + 1) +
    newEscapedContent +
    containerContent.slice(closeBtPos)
  );
}

// ─── main ────────────────────────────────────────────────────────────────────

const containerFiles = findFiles(DOCS_DIR, /-demo-container\.ts$/);

let updated = 0;
let skipped = 0;
let missing = 0;

for (const containerPath of containerFiles) {
  const dir = dirname(containerPath);
  const containerName = basename(containerPath);
  const demoName = containerName.replace('-container.ts', '.ts');
  const demoPath = join(dir, demoName);

  if (!existsSync(demoPath)) {
    console.warn(`  MISSING demo: ${demoPath}`);
    missing++;
    continue;
  }

  const demoContent = readFileSync(demoPath, 'utf8').trimEnd();
  const escaped = escapeForTemplateLiteral(demoContent);

  const containerContent = readFileSync(containerPath, 'utf8');

  // Extract current embedded content using the proper backtick scanner
  const propRegex = /readonly code\s*=\s*`/g;
  const m = propRegex.exec(containerContent);
  if (!m) {
    console.warn(`  NO code field found in: ${containerPath}`);
    skipped++;
    continue;
  }
  const openBt = m.index + m[0].length - 1;
  const closeBt = findClosingBacktick(containerContent, openBt);
  if (closeBt === -1) {
    console.warn(`  UNCLOSED template literal in: ${containerPath}`);
    skipped++;
    continue;
  }

  const currentEmbedded = containerContent.slice(openBt + 1, closeBt);

  if (currentEmbedded === escaped) {
    skipped++;
    continue;
  }

  const newContent = replaceCodeProperty(containerContent, escaped);
  if (!newContent) {
    console.warn(`  REPLACE FAILED for: ${containerPath}`);
    skipped++;
    continue;
  }

  writeFileSync(containerPath, newContent, 'utf8');
  updated++;
  console.log(`  UPDATED: ${containerPath.replace(DOCS_DIR + '/', '')}`);
}

console.log(
  `\nDone. Updated: ${updated}, Already in sync: ${skipped}, Missing demo: ${missing}`,
);
