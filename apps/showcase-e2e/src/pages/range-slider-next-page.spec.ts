import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Range Slider Next Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/range-slider-next');
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
    await page.goto('/docs/components/range-slider-next');
    const table = page.getByRole('region', {
      name: 'Range Slider Next parts',
    });
    await expect(table.getByRole('row')).toHaveCount(3);
    await expect(table).toContainText('div[scRangeSliderNext]');
    await expect(table).toContainText('input[scRangeSliderNextThumb]');
  });
});
