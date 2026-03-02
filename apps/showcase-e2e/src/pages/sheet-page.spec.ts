import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Sheet Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/sheet');
    await expectNoA11yViolations(page);
  });
});
