#!/usr/bin/env node
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';

const DOCS_DIR =
  '/home/user/semantic-components/apps/showcase/src/app/pages/docs';

function findFiles(dir, pattern) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(fullPath, pattern));
    else if (entry.isFile() && pattern.test(entry.name)) results.push(fullPath);
  }
  return results;
}

function escapeForTemplateLiteral(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
}

function findClosingBacktick(content, startIndex) {
  let i = startIndex + 1;
  while (i < content.length) {
    const ch = content[i];
    if (ch === '\\') {
      i += 2;
    } else if (ch === '`') {
      return i;
    } else {
      i++;
    }
  }
  return -1;
}

const containerFiles = findFiles(DOCS_DIR, /-demo-container\.ts$/);
let mismatches = 0;

for (const containerPath of containerFiles) {
  const dir = dirname(containerPath);
  const demoName = basename(containerPath).replace('-container.ts', '.ts');
  const demoPath = join(dir, demoName);
  if (!existsSync(demoPath)) continue;

  const demoContent = readFileSync(demoPath, 'utf8').trimEnd();
  const escaped = escapeForTemplateLiteral(demoContent);
  const containerContent = readFileSync(containerPath, 'utf8');

  const propRegex = /readonly code\s*=\s*`/g;
  const m = propRegex.exec(containerContent);
  if (!m) continue;

  const openBt = m.index + m[0].length - 1;
  const closeBt = findClosingBacktick(containerContent, openBt);
  if (closeBt === -1) continue;

  const currentEmbedded = containerContent.slice(openBt + 1, closeBt);

  if (currentEmbedded !== escaped) {
    mismatches++;
    console.log('MISMATCH:', containerPath.replace(DOCS_DIR + '/', ''));
    const lines1 = currentEmbedded.split('\n');
    const lines2 = escaped.split('\n');
    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
      if (lines1[i] !== lines2[i]) {
        console.log(
          '  Line ' + (i + 1) + ' current : ' + JSON.stringify(lines1[i]),
        );
        console.log(
          '  Line ' + (i + 1) + ' expected: ' + JSON.stringify(lines2[i]),
        );
        break;
      }
    }
  }
}

console.log('Total mismatches: ' + mismatches);
