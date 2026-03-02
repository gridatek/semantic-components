import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Badge Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/badge');
    await expectNoA11yViolations(page);
  });
});
