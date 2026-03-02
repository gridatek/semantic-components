import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Kbd Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/kbd');
    await expectNoA11yViolations(page);
  });
});
