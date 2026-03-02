import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Toast Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/toast');
    await expectNoA11yViolations(page);
  });
});
