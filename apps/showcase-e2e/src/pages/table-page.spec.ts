import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Table Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/table');
    await expectNoA11yViolations(page);
  });
});
