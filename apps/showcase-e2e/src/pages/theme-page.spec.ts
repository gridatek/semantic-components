import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Theme Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/theme');
    await expectNoA11yViolations(page);
  });
});
