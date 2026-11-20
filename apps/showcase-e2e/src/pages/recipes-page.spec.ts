import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Recipes', () => {
  test('the index lists each recipe and leads to it; no axe violations', async ({
    page,
  }) => {
    await page.goto('/docs/recipes');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Recipes');
    await expectNoA11yViolations(page);
    await page
      .getByRole('main')
      .getByRole('listitem')
      .getByRole('link', { name: /Tags Input/ })
      .click();
    await expect(page).toHaveURL(/\/docs\/components\/tags-input$/);
  });

  test('the sidebar: a Recipes group, its index first', async ({ page }) => {
    await page.goto('/docs/components/tags-input');
    const nav = page.getByRole('navigation', { name: 'Documentation' });
    await expect(nav.getByRole('button', { name: 'Recipes' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await expect(
      nav.getByRole('link', { name: 'All recipes', exact: true }),
    ).toHaveAttribute('href', '/docs/recipes');
    await expect(
      page.getByRole('navigation', { name: 'Where you are' }),
    ).toContainText('Tags Input');
  });
});
