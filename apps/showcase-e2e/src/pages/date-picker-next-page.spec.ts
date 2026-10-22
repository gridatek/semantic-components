import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Date Picker Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/date-picker-next');
    await expectNoA11yViolations(page);
  });
});
