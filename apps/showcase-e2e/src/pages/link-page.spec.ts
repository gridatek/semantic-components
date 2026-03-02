import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Link Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/link');
    await expectNoA11yViolations(page);
  });
});
