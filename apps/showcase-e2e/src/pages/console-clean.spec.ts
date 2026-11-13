import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '../test';

/**
 * Every visible docs page loads without a warning or an error in the
 * console: the library's development checks (an unnamed control…) warn
 * there, so a warning is a bug to fix — or, later, an error.
 */
const components: { path: string; hidden?: boolean }[] = JSON.parse(
  readFileSync(
    join(__dirname, '../../../showcase/public/components.json'),
    'utf8',
  ),
);

const pages = [
  '/docs/getting-started/introduction',
  '/components',
  '/docs/components',
  '/docs/getting-started/prerequisites',
  '/docs/getting-started/ui',
  '/docs/getting-started/presets',
  '/docs/getting-started/i18n',
  '/docs/getting-started/mcp-server',
  ...components
    .filter((c) => !c.hidden)
    .map((c) => `/docs/components/${c.path}`),
];

test.describe('Console clean', () => {
  for (const path of pages)
    test(`${path}: no console warning or error`, async ({ page }) => {
      const messages: string[] = [];
      page.on('pageerror', (e) =>
        messages.push(`error: ${e.message.split('\n')[0]}`),
      );
      page.on('console', (m) => {
        if (m.type() === 'warning' || m.type() === 'error')
          messages.push(`${m.type()}: ${m.text().split('\n')[0]}`);
      });
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();
      // The development checks look once the app is stable. Waiting for
      // nothing to arrive: there is no state to poll for.
      await page.waitForLoadState('networkidle');
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(500);
      expect(messages).toEqual([]);
    });
});
