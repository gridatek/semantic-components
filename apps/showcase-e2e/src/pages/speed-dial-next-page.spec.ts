import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Speed Dial Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/speed-dial-next');
    await expectNoA11yViolations(page);
  });
});
