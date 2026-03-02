import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Pagination Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/pagination');
    await expectNoA11yViolations(page);
  });
});
