import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Auth Layout Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/auth-layout');
    await expectNoA11yViolations(page);
  });
});
