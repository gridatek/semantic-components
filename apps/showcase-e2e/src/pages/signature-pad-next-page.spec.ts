import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Signature Pad Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/signature-pad-next');
    await expectNoA11yViolations(page);
  });
});
