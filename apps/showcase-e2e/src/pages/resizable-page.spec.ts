import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Resizable Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/resizable');
    await expectNoA11yViolations(page);
  });
});
