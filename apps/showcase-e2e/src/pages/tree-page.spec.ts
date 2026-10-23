import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Tree Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/tree');
    await expectNoA11yViolations(page);
  });
});
