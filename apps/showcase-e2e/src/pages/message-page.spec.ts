import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Message Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/message');
    await expectNoA11yViolations(page);
  });
});
