import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Menu Bar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/menu-bar');
    await expectNoA11yViolations(page);
  });
});
