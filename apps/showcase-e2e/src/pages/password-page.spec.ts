import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Password Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/password');
    await expectNoA11yViolations(page);
  });
});
