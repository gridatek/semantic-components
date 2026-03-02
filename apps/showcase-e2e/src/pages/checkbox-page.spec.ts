import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Checkbox Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/checkbox');
    await expectNoA11yViolations(page);
  });
});
