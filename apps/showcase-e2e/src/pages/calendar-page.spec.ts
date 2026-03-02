import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Calendar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/calendar');
    await expectNoA11yViolations(page);
  });
});
