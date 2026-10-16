import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Countdown Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/countdown-next');
    await expectNoA11yViolations(page);
  });
});
