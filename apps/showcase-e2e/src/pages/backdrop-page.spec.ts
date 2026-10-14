import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Backdrop Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/backdrop');
    await expectNoA11yViolations(page);
  });
});
