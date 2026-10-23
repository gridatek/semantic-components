import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Toggle Group Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/toggle-group');
    await expectNoA11yViolations(page);
  });
});
