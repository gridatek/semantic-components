import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Radio Group Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/radio-group');
    await expectNoA11yViolations(page);
  });
});
