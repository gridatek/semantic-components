import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Stat Card Page (a recipe)', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/recipes/stat-card');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'How it is made',
      'Accessibility',
      'Examples',
    ]);
    await expectNoA11yViolations(page);
  });

  test('listed in the Recipes index', async ({ page }) => {
    await page.goto('/docs/recipes');
    await page
      .getByRole('main')
      .getByRole('listitem')
      .getByRole('link', { name: /Stat Card/ })
      .click();
    await expect(page).toHaveURL(/\/docs\/components\/stat-card$/);
  });
});
