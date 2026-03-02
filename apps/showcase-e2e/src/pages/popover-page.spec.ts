import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Popover Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/popover');
    await expectNoA11yViolations(page);
  });
});
