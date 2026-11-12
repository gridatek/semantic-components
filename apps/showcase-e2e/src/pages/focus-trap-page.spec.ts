import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Focus Trap Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/focus-trap');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'How It Works',
      'Why not cdkTrapFocus',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
