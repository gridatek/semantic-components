import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Home Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await expectNoA11yViolations(page);
  });
});
