import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Label Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/label');
    await expectNoA11yViolations(page);
  });
});
