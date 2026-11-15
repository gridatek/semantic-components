import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Line Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/line-chart');
    await expectNoA11yViolations(page);
  });

  test('Usage, anatomy, accessibility; the API reference: its inputs', async ({
    page,
  }) => {
    await page.goto('/docs/components/line-chart');
    for (const name of ['Usage', 'Anatomy', 'Accessibility', 'API reference'])
      await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
    const inputs = page
      .getByRole('region', { name: 'ScChartLine inputs' })
      .locator('tbody tr td:first-child');
    await expect(inputs.first()).toHaveText('key');
    await expect(inputs.last()).toHaveText('class');
  });
});
