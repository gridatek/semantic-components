import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Transfer List Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/transfer-list');
    await expectNoA11yViolations(page);
  });
});
