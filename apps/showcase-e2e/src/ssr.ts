import { workspaceRoot } from '@nx/devkit';
import { type Page, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// For the CI job `ssr` (`SSR=1`): the app rendered on the server, then hydrated.

/** The routes of a routes file: `parent` (4 spaces in) and `parent/child` (8). */
export function routesOf(file: string): string[] {
  const routes: string[] = [];
  let parent = '';
  for (const line of readFileSync(join(workspaceRoot, file), 'utf8').split(
    '\n',
  )) {
    const match = line.match(/^( +)path: '([^']*)'/);
    if (!match) continue;
    const [, indent, path] = match;
    if (path.includes(':') || path.includes('*')) continue;
    if (indent.length === 4) {
      parent = path;
      routes.push(`/${path}`);
    } else if (path) {
      routes.push('/' + [parent, path].filter(Boolean).join('/'));
    }
  }
  return routes;
}

/** Loads `url` and fails on a page that didn't hydrate cleanly. */
export async function expectHydrated(page: Page, url: string): Promise<void> {
  const problems: string[] = [];
  page.on('pageerror', (e) => problems.push(e.message.split('\n')[0]));
  page.on('console', (m) => {
    if (m.type() === 'error' || /NG05\d\d/.test(m.text())) {
      problems.push(m.text().split('\n')[0]);
    }
  });
  // Dev mode logs it once the app has hydrated.
  const hydrated = page.waitForEvent('console', {
    predicate: (m) => m.text().startsWith('Angular hydrated'),
    // A page that breaks never hydrates: say so soon, not at the test's end.
    timeout: 10_000,
  });
  await page.goto(url);
  await hydrated;
  expect(problems).toEqual([]);
}
