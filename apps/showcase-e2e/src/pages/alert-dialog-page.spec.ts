import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Alert Dialog Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/alert-dialog');
    await expectNoA11yViolations(page);
  });
});
