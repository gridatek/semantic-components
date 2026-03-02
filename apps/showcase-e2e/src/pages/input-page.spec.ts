import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Input Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/input');
    await expectNoA11yViolations(page);
  });
});
