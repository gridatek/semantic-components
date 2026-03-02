import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Progress Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/progress');
    await expectNoA11yViolations(page);
  });
});
