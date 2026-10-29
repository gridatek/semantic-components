import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Password Field Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/password-field');
    await expectNoA11yViolations(page);
  });
});
