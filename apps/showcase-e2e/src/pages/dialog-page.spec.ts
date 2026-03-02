import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Dialog Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/dialog');
    await expectNoA11yViolations(page);
  });
});
