import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Native Dialog Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/native-dialog');
    await expectNoA11yViolations(page);
  });
});
