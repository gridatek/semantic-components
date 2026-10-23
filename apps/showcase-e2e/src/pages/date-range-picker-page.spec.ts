import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Date Range Picker Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/date-range-picker');
    await expectNoA11yViolations(page);
  });
});
