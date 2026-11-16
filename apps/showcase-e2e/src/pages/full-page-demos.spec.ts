import { workspaceRoot } from '@nx/devkit';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '../test';

/**
 * A full-page demo — framed at the docs in an iframe at its own width
 * (`<app-demo-container framed>`), or a layout's in `<app-usage-code>` — is
 * marked `data: { fullPage: true }` on its route: without it, `App` gives the
 * route a demo's side gutter (`px-4`), drawn inside the docs' frame. Read from
 * the sources: no page needed.
 */
const read = (file: string) => readFileSync(join(workspaceRoot, file), 'utf8');

/** The demo URLs shown in an iframe at the docs. */
function framedDemoUrls(): string[] {
  const pages = 'apps/showcase/src/app/pages';
  const urls: string[] = [];
  for (const entry of readdirSync(join(workspaceRoot, pages), {
    recursive: true,
  })) {
    const file = String(entry);
    if (!file.endsWith('.ts')) continue;
    const source = read(join(pages, file));
    // A demo container framed: the attribute on its own line.
    if (file.endsWith('-container.ts') && /^\s+framed\s*$/m.test(source))
      urls.push(...[...source.matchAll(/demoUrl="([^"]+)"/g)].map((m) => m[1]));
    // A layout's usage, on its own route.
    for (const usage of source.matchAll(/<app-usage-code\b[^>]*>/g)) {
      const url = usage[0].match(/demoUrl="([^"]+)"/)?.[1];
      if (url) urls.push(url);
    }
  }
  return [...new Set(urls)].sort();
}

/** The demo routes marked full-page: `/demos/<group>/<demo>`. */
function fullPageRoutes(): string[] {
  const lines = read('apps/showcase/src/app/routes/demos-routes.ts').split(
    '\n',
  );
  const routes: string[] = [];
  let group = '';
  lines.forEach((line, i) => {
    const parent = line.match(/^ {4}path: '(demos\/[^']+)'/);
    if (parent) group = parent[1];
    const child = line.match(/^ {8}path: '([^']+)'/);
    if (child && /fullPage: true/.test(lines[i + 1] ?? ''))
      routes.push(`/${group}/${child[1]}`);
  });
  return routes.sort();
}

test('Full-page demos: each framed one marked fullPage on its route, and only those', ({
  browserName,
}) => {
  test.skip(browserName !== 'chromium', 'Reads the sources: once is enough');
  const framed = framedDemoUrls();
  // The check itself: it found what it looks for.
  expect(framed.length).toBeGreaterThan(20);
  expect(fullPageRoutes()).toEqual(framed);
});
