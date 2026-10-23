import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Time Clock Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/time-clock');
    await expectNoA11yViolations(page);
  });
});
