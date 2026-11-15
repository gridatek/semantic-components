import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/chart');
    await expectNoA11yViolations(page);
  });

  test('Usage, anatomy, accessibility; the API reference: the parts', async ({
    page,
  }) => {
    await page.goto('/docs/components/chart');
    for (const name of ['Usage', 'Anatomy', 'Accessibility', 'API reference'])
      await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
    const parts = page
      .getByRole('region', { name: 'Chart parts' })
      .locator('tbody tr td:first-child');
    await expect(parts.first()).toHaveText('div[scChart]');
    await expect(
      parts.filter({ hasText: 'g[scChartCategoryAxis]' }),
    ).toHaveCount(1);
  });
});
