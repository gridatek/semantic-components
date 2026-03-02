import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Tabs Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/tabs');
    await expectNoA11yViolations(page);
  });
});
