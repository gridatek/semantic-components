import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

/**
 * Every visible docs page in the project's preset (presets-lyra…): no axe
 * violation, light and dark. One load per page — the components' preset
 * specs beside this one check their classes.
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
  ...components
    .filter((c) => !c.hidden)
    .map((c) => `/docs/components/${c.path}`),
];

test.describe('Docs pages in their preset', () => {
  for (const path of pages)
    test(`${path}: no axe violation, light and dark`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
