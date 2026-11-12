import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Select On Focus Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/select-on-focus');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'How It Works',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
