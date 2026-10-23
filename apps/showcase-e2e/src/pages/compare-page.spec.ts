import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Compare Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/compare');
    await expectNoA11yViolations(page);
  });
});
