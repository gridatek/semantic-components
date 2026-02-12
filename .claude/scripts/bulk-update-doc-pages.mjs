/**
 * Bulk-update all doc pages under apps/showcase/src/app/pages/docs/
 *
 * What it does:
 *  - Adds TS imports for a given component + data import
 *  - Adds the component to the Angular `imports` array
 *  - Inserts a template element after the header `</p>` tag
 *  - Adds a class property to the page component
 *
 * Usage:
 *   node .claude/scripts/bulk-update-doc-pages.mjs
 *
 * Handles Windows \r\n line endings.
 * Skips files that already contain the target import.
 */
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// ── CONFIG ──────────────────────────────────────────────────────────────
// Edit these values before running the script

/** TS import statement to add (one line) */
const TS_IMPORT = `import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';`;

/** Additional TS import (e.g. data file), leave empty string to skip */
const TS_IMPORT_EXTRA = `import { COMPONENTS } from '../../../data/components';`;

/** Name used in Angular `imports: [...]` array */
const ANGULAR_IMPORT_NAME = 'ComponentStatusBadge';

/** Template snippet to insert after the first `</p>\\n      </div>` in the header */
const TEMPLATE_SNIPPET = `<app-component-status-badge [status]="componentStatus" />`;

/**
 * Class property to add.
 * Use `__DIR__` as placeholder for the page's directory name (e.g. 'accordion').
 */
const CLASS_PROPERTY = `readonly componentStatus = COMPONENTS.find((c) => c.path === '__DIR__')!.status;`;

/** Identifier to check if a file was already processed */
const SKIP_IF_CONTAINS = 'ComponentStatusBadge';

/** Files to exclude (basename match) */
const EXCLUDE_FILES = ['components-page.ts'];

// ── SCRIPT ──────────────────────────────────────────────────────────────

const baseDir = 'apps/showcase/src/app/pages/docs';
const files = globSync(baseDir + '/**/*-page.ts').filter(
  (f) => !EXCLUDE_FILES.some((ex) => f.endsWith(ex)),
);

console.log('Found', files.length, 'files');

let updated = 0;
const skipped = [];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  if (content.includes(SKIP_IF_CONTAINS)) {
    skipped.push(file + ' (already processed)');
    continue;
  }

  const dirName = path.basename(path.dirname(file));
  const eol = content.includes('\r\n') ? '\r\n' : '\n';

  // Normalize to \n
  content = content.replace(/\r\n/g, '\n');

  // 1. Add TS imports after existing import block
  const importMatch = content.match(/^(import[\s\S]*?;\n)+/m);
  if (!importMatch) {
    skipped.push(file + ' (no imports found)');
    continue;
  }

  const lastImportEnd = importMatch.index + importMatch[0].length;
  let newImports = TS_IMPORT + '\n';
  if (TS_IMPORT_EXTRA) newImports += TS_IMPORT_EXTRA + '\n';

  content =
    content.substring(0, lastImportEnd) +
    newImports +
    content.substring(lastImportEnd);

  // 2. Add to Angular imports array
  if (content.match(/imports:\s*\[\s*\n/)) {
    content = content.replace(
      /(imports:\s*\[\s*\n)([\s\S]*?)(,?\s*\n\s*\])/,
      (match, start, items, end) => {
        const trimmedItems = items.trimEnd();
        const needsComma = !trimmedItems.endsWith(',');
        return (
          start +
          trimmedItems +
          (needsComma ? ',' : '') +
          '\n    ' +
          ANGULAR_IMPORT_NAME +
          ',' +
          end
        );
      },
    );
  } else {
    content = content.replace(/imports:\s*\[([^\]]+)\]/, (match, items) => {
      const trimmed = items.trim();
      const needsComma = !trimmed.endsWith(',');
      return `imports: [${items}${needsComma ? ',' : ''} ${ANGULAR_IMPORT_NAME}]`;
    });
  }

  // 3. Insert template snippet after </p> in header
  if (TEMPLATE_SNIPPET) {
    content = content.replace(
      /(<\/p>\n\s*<\/div>)/,
      `</p>\n        ${TEMPLATE_SNIPPET}\n      </div>`,
    );
  }

  // 4. Add class property
  if (CLASS_PROPERTY) {
    const propLine = CLASS_PROPERTY.replace('__DIR__', dirName);

    if (content.match(/export default class \w+ \{\s*\}/)) {
      content = content.replace(
        /export default class (\w+) \{\s*\}/,
        `export default class $1 {\n  ${propLine}\n}`,
      );
    } else if (!content.includes(propLine.split('=')[0].trim())) {
      content = content.replace(
        /export default class (\w+) \{/,
        `export default class $1 {\n  ${propLine}`,
      );
    }
  }

  // Restore original line endings
  if (eol === '\r\n') {
    content = content.replace(/\n/g, '\r\n');
  }

  fs.writeFileSync(file, content);
  updated++;
}

console.log('Updated:', updated);
if (skipped.length) {
  console.log('Skipped:', skipped.length);
  skipped.forEach((s) => console.log(' ', s));
}
