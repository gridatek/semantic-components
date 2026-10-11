import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Notification Center Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/notification-center');
    await expectNoA11yViolations(page);
  });
});
