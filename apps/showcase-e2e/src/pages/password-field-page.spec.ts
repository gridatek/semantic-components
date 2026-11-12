import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Password Field Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/password-field');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
