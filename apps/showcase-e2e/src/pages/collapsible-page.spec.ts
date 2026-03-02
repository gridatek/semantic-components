import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Collapsible Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/collapsible');
    await expectNoA11yViolations(page);
  });
});
