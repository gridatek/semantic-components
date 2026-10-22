import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Animated Counter Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/animated-counter-next');
    await expectNoA11yViolations(page);
  });
});
