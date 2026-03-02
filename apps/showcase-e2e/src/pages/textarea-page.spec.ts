import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Textarea Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/textarea');
    await expectNoA11yViolations(page);
  });
});
