import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('PDF Viewer Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/pdf-viewer');
    await expectNoA11yViolations(page);
  });
});
