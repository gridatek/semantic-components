import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Item Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/item');
    await expectNoA11yViolations(page);
  });
});
