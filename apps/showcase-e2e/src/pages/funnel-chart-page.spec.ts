import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Funnel Chart Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/charts/funnel-chart');
    await expectNoA11yViolations(page);
  });

  test('Usage, anatomy, accessibility; the API reference: its inputs', async ({
    page,
  }) => {
    await page.goto('/docs/charts/funnel-chart');
    for (const name of ['Usage', 'Anatomy', 'Accessibility', 'API reference'])
      await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
    const inputs = page
      .getByRole('region', { name: 'ScChartFunnel inputs' })
      .locator('tbody tr td:first-child');
    await expect(inputs.first()).toHaveText('key');
    await expect(inputs.last()).toHaveText('class');
  });
});
