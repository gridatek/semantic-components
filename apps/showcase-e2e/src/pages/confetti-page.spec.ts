import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Confetti Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/confetti');
    await expectNoA11yViolations(page);
  });
});
