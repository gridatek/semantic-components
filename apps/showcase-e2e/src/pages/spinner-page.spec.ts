import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Spinner Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/spinner');
    await expectNoA11yViolations(page);
  });
});
