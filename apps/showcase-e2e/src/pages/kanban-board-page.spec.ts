import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Kanban Board Page (a recipe)', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/kanban-board');
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
      .getByRole('link', { name: /Kanban Board/ })
      .click();
    await expect(page).toHaveURL(/\/docs\/components\/kanban-board$/);
  });
});
