import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('OTP Field Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/otp-field');
    await expectNoA11yViolations(page);
  });
});
