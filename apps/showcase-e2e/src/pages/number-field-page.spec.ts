import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Number Field Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/number-field');
    await expectNoA11yViolations(page);
  });
});
