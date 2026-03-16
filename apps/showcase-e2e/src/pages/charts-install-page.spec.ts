import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Charts Install Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/charts');
    await expectNoA11yViolations(page);
  });
});
