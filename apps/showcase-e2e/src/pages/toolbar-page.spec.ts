import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Toolbar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/toolbar');
    await expectNoA11yViolations(page);
  });
});
