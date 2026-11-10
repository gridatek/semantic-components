import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Checkbox Group Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/checkbox-group');
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
