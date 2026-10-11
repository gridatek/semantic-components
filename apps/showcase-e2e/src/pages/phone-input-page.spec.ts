import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Phone Input Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/phone-input');
    await expectNoA11yViolations(page);
  });
});
