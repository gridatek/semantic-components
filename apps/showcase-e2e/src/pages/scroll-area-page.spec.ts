import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Scroll Area Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/scroll-area');
    await expectNoA11yViolations(page);
  });
});
