import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Skeleton Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/skeleton');
    await expectNoA11yViolations(page);
  });
});
