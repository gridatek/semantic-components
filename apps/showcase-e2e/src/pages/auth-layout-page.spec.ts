import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Auth Layout Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/auth-layout');
    await expectNoA11yViolations(page);
  });
});
