import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Time Picker Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/time-picker');
    await expectNoA11yViolations(page);
  });
});
