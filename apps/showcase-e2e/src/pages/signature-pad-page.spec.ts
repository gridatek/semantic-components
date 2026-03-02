import { test } from '@playwright/test';

import { expectNoA11yViolations } from '../axe';

test.describe('Signature Pad Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/signature-pad');
    await expectNoA11yViolations(page);
  });
});
