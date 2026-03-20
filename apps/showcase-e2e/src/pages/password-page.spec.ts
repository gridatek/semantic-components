import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Password Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/password');
    await expectNoA11yViolations(page);
  });
});
