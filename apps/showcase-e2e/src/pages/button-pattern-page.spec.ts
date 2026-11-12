import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Button Pattern Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/button-pattern');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'What It Does',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
