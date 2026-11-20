import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Rating Next Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/rating-next');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: every part', async ({ page }) => {
    await page.goto('/docs/components/rating-next');
    const table = page.getByRole('region', { name: 'Rating Next parts' });
    await expect(table.getByRole('row')).toHaveCount(3);
    await expect(table).toContainText('div[scRatingNext]');
    await expect(table).toContainText('ng-template[scRatingNextIcon]');
  });
});
