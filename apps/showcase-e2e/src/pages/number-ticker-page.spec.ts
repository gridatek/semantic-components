import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Number Ticker Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/number-ticker');
    await expectNoA11yViolations(page);
  });
});
