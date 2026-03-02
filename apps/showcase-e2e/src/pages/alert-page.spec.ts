import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Alert Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/alert');
    await expectNoA11yViolations(page);
  });
});
