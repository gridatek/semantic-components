import { workspaceRoot } from '@nx/devkit';
import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Every page, rendered on the server, hydrates: Angular's hydration ran, with
 * no mismatch (NG05xx) and no error in the browser. The CI job `ssr` only
 * (`SSR=1`); the server's own errors are in `dist/ssr-blocks.log`, which the
 * job checks after the tests.
 */

// The app's routes: top level (4 spaces in) and their children (8).
const routes: string[] = [];
let parent = '';
for (const line of readFileSync(
  join(workspaceRoot, 'apps/blocks/src/app/app.routes.ts'),
  'utf8',
).split('\n')) {
  const match = line.match(/^( +)path: '([^']*)'/);
  if (!match) continue;
  const [, indent, path] = match;
  if (path.includes(':') || path.includes('*')) continue;
  if (indent.length === 4) parent = path;
  routes.push(
    '/' +
      (indent.length === 4 ? [path] : [parent, path]).filter(Boolean).join('/'),
  );
}

test.describe('SSR', () => {
  test.skip(!process.env['SSR'], 'The CI job `ssr` only');

  for (const route of new Set(routes)) {
    test(`${route} hydrates`, async ({ page }) => {
      const problems: string[] = [];
      page.on('pageerror', (e) => problems.push(e.message.split('\n')[0]));
      page.on('console', (m) => {
        if (m.type() === 'error' || /NG05\d\d/.test(m.text())) {
          problems.push(m.text().split('\n')[0]);
        }
      });
      const response = await page.goto(route);
      // Drawn by the server (Angular marks its HTML), then hydrated: the app
      // marks <html> once hydrated and stable (main.ssr.ts). A page that
      // breaks never gets there: say so soon, not at the test's end.
      expect(await response?.text()).toContain('ng-server-context');
      await expect(page.locator('html')).toHaveAttribute('data-hydrated', '', {
        timeout: 10_000,
      });
      expect(problems).toEqual([]);
    });
  }
});
