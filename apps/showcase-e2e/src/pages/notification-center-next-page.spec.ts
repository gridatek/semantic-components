import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Notification Center Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/notification-center-next');
    await expectNoA11yViolations(page);
  });
});
