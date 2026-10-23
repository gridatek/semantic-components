import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Toggle Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/toggle');
    await expectNoA11yViolations(page);
  });
});
