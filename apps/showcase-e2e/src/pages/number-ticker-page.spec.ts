import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Number Ticker Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/number-ticker');
    await expectNoA11yViolations(page);
  });

  test('Usage, anatomy, accessibility, examples; the API reference: its inputs', async ({
    page,
  }) => {
    await page.goto('/docs/components/number-ticker');
    for (const name of [
      'Usage',
      'Anatomy',
      'Accessibility',
      'Examples',
      'API reference',
    ])
      await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible();
    const inputs = page
      .getByRole('region', { name: 'ScNumberTicker inputs' })
      .locator('tbody tr td:first-child');
    await expect(inputs.first()).toHaveText('value');
    await expect(inputs.last()).toHaveText('class');
  });
});
