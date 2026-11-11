import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Native Select Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/native-select');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Accessibility',
      'Native Select or Select',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });
});
