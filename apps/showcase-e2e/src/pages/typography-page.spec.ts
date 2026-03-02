import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Typography Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/typography');
    await expectNoA11yViolations(page);
  });
});
