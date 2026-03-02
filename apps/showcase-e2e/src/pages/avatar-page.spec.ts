import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Avatar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/avatar');
    await expectNoA11yViolations(page);
  });
});
