import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Countdown Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/countdown');
    await expectNoA11yViolations(page);
  });
});
