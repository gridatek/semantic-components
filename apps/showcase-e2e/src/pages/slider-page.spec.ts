import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Slider Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/slider');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });
});
