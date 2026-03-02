import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Select Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/select');
    await expectNoA11yViolations(page);
  });
});
