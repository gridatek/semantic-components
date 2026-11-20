import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Range Slider Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/range-slider');
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
    await page.goto('/docs/components/range-slider');
    const table = page.getByRole('region', {
      name: 'Range Slider parts',
    });
    await expect(table.getByRole('row')).toHaveCount(3);
    await expect(table).toContainText('div[scRangeSlider]');
    await expect(table).toContainText('input[scRangeSliderThumb]');
  });
});
