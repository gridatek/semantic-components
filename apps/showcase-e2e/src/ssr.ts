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
    // Our pages' errors — not another site's (Firefox logs the cookies an
    // image from github.com is refused as console errors).
    const from = m.location().url;
    if (from && new URL(from).origin !== new URL(page.url()).origin) return;
    if (m.type() === 'error' || /NG05\d\d/.test(m.text())) {
      problems.push(m.text().split('\n')[0]);
    }
  });
  const response = await page.goto(url);
  // Drawn by the server (Angular marks its HTML), then hydrated: the app
  // marks <html> once hydrated and stable (main.ssr.ts). A page that
  // breaks never gets there: say so soon, not at the test's end.
  expect(await response?.text()).toContain('ng-server-context');
  await expect(page.locator('html')).toHaveAttribute('data-hydrated', '', {
    timeout: 10_000,
  });
  expect(problems).toEqual([]);
}
