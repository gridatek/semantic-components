import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Speed Dial Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/speed-dial');
    await expectNoA11yViolations(page);
  });
});
