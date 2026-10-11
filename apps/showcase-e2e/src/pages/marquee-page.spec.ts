import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Marquee Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/marquee');
    await expectNoA11yViolations(page);
  });
});
