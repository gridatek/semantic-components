import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

/**
 * Every visible docs page in the project's style (styles-lyra…): no axe
 * violation, light and dark. One load per page — the components' style
 * specs beside this one check their classes.
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
  // Guides the style draws (out of the components' list).
  '/docs/guides/scrollbar',
  '/docs/guides/typeset',
  ...components
    .filter((c) => !c.hidden)
    .map((c) => `/docs/${SECTIONS[c.category] ?? 'components'}/${c.path}`),
];

test.describe('Docs pages in their style', () => {
  for (const path of pages)
    test(`${path}: no axe violation, light and dark`, async ({ page }) => {
      // Two full axe runs on a whole page (the Sidebar's: about 35s).
      test.slow();
      await page.goto(path);
      // A heavy page (the Editor's) under CI load: seconds to its heading.
      await expect(page.locator('h1').first()).toBeVisible({
        timeout: 15_000,
      });
      await expectNoA11yViolations(page);
      await expectNoA11yViolations(page, { dark: true });
    });
});
