import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Emoji Picker Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/emoji-picker');
    await expectNoA11yViolations(page);
  });
});
