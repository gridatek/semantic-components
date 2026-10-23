import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Date Input Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/date-input');
    await expectNoA11yViolations(page);
  });
});
