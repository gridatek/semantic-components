import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Hotkey Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/hotkey');
    await expectNoA11yViolations(page);
  });
});
