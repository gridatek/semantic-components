import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Diff Viewer Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/diff-viewer');
    await expectNoA11yViolations(page);
  });
});
