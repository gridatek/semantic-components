import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fromOtherSite } from '../interaction';
import { expect, test } from '../test';

/**
 * Every visible docs page loads without a warning or an error in the
 * console: the library's development checks (an unnamed control…) warn
 * there, so a warning is a bug to fix — or, later, an error.
 */
/** A component's page: under its sidebar group's address. */
const SECTIONS: Record<string, string> = {
  Charts: 'charts',
  Utilities: 'utilities',
  Recipes: 'recipes',
};

const components: { path: string; category: string; hidden?: boolean }[] =
  JSON.parse(
    readFileSync(
      join(__dirname, '../../../showcase/public/components.json'),
      'utf8',
    ),
  );

const pages = [
  '/docs/overview/introduction',
  '/components',
  '/docs/overview/components',
  '/docs/recipes',
  '/docs/overview/get-started',
  '/docs/packages/ui',
  '/docs/packages/styles',
  '/docs/guides/i18n',
  '/docs/packages/mcp-server',
  '/docs/guides/theming',
  '/docs/guides/scrollbar',
  '/docs/guides/typeset',
  '/docs/guides/forms',
  '/docs/guides/accessibility',
  '/docs/guides/ssr',
  '/docs/overview/credits',
  ...components
    .filter((c) => !c.hidden)
    .map((c) => `/docs/${SECTIONS[c.category] ?? 'components'}/${c.path}`),
];

test.describe('Console clean', () => {
  for (const path of pages)
    test(`${path}: no console warning or error`, async ({ page }) => {
      const messages: string[] = [];
      page.on('pageerror', (e) =>
        messages.push(`error: ${e.message.split('\n')[0]}`),
      );
      page.on('console', (m) => {
        if (fromOtherSite(m, page)) return;
        // Firefox's guess at a flash of unstyled content in a demo's iframe
        // (dev mode only) still loading its stylesheets: not the library's.
        if (
          m
            .text()
            .includes('Layout was forced before the page was fully loaded') &&
          new URL(m.location().url || page.url()).pathname.startsWith('/demos/')
        )
          return;
        // Under SSR, NgOptimizedImage's height check on a fill image already
        // loaded (the server's page loaded it) runs as hydration starts, before
        // the bindings put back its box's classes: zero, wrongly. Angular's
        // false positive (angular/angular#69636); CSR still checks it.
        if (
          process.env['SSR'] &&
          m.text().includes('NG02952') &&
          m.text().includes('height of the fill-mode image is zero')
        )
          return;
        if (m.type() === 'warning' || m.type() === 'error')
          messages.push(`${m.type()}: ${m.text().split('\n')[0]}`);
      });
      await page.goto(path);
      // The h1 comes with the whole page: the editor's renders its demos in
      // the same pass, past 5 s in WebKit under load — as in axe.ts.
      await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });
      // The development checks look once the app is stable. Waiting for
      // nothing to arrive: there is no state to poll for. Not forever: a page
      // loading images (or Firefox) may never get there — as in axe.ts.
      await page
        .waitForLoadState('networkidle', { timeout: 10_000 })
        .catch(() => undefined);
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(500);
      expect(messages).toEqual([]);
    });
});
