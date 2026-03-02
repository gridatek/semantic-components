import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Toggle Group Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/toggle-group');
    await expectNoA11yViolations(page);
  });
});
