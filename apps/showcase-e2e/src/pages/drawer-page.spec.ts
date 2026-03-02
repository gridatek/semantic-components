import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Drawer Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/drawer');
    await expectNoA11yViolations(page);
  });
});
