import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Label Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/label');
    await expectNoA11yViolations(page);
  });
});
