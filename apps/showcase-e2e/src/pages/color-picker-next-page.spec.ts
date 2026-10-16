import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Color Picker Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/color-picker-next');
    await expectNoA11yViolations(page);
  });
});
