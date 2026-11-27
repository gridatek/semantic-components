import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { expect, test } from '../test';

/**
 * The dashboard is the library's test app: every figure it shows goes
 * through the library's formatters (`injectFormatNumber()`,
 * `injectFormatDate()`, `injectFormatDuration()` — the user's digits, in
 * order), composed by `injectFormats()` (shared/formats.ts) — never its own
 * `Intl`. Plain logic on its sources: no page.
 */
const root = join(__dirname, '../../../..');
const app = join(root, 'apps/dashboard/src/app');

/** Formatting that shows no figure, or each choice in its own digits on purpose. */
const ALLOWED = [
  // The week's days by name, and the numbering systems each in its digits.
  'pages/account-settings/account-settings-page.ts',
];

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sources(path);
    return entry.name.endsWith('.ts') ? [path] : [];
  });
}

test('the dashboard formats through the library: no format.ts, no Intl of its own', () => {
  expect(existsSync(join(app, 'shared/format.ts'))).toBe(false);
  const found = sources(app).flatMap((file) => {
    const name = relative(app, file).replace(/\\/g, '/');
    if (ALLOWED.includes(name)) return [];
    return readFileSync(file, 'utf8')
      .split('\n')
      .flatMap((line, i) =>
        /from '[./]*(?:shared\/)?format'|new Intl\.(?:NumberFormat|DateTimeFormat|DurationFormat)\b|\.toLocaleString\(/.test(
          line,
        )
          ? [`${name}:${i + 1}`]
          : [],
      );
  });
  expect(found).toEqual([]);
});
