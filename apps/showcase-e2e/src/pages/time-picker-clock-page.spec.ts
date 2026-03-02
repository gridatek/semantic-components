import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Time Picker Clock Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/time-picker-clock');
    await expectNoA11yViolations(page);
  });
});
