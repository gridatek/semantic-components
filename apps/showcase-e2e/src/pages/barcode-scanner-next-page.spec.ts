import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Barcode Scanner Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/barcode-scanner-next');
    await expectNoA11yViolations(page);
  });
});
