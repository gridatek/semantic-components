import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Separator Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/separator');
    await expectNoA11yViolations(page);
  });
});
