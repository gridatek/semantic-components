import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Native Dialog Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/native-dialog');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'Native',
      'Closing',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });
});
