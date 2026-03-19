import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Infinite Scroll Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/infinite-scroll');
    await expectNoA11yViolations(page);
  });
});
