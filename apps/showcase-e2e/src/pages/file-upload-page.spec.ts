import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('File Upload Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/file-upload');
    await expectNoA11yViolations(page);
  });
});
