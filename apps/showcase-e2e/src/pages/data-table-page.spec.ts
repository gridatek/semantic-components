import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Data Table Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/data-table');
    await expectNoA11yViolations(page);
  });
});
