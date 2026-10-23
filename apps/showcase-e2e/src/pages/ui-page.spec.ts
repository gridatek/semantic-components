import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('UI Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/ui');
    await expectNoA11yViolations(page);
  });
});
