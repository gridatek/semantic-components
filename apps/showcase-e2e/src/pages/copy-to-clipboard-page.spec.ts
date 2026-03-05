import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Copy to Clipboard Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/copy-to-clipboard');
    await expectNoA11yViolations(page);
  });
});
