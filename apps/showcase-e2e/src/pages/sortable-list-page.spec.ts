import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Sortable List Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/sortable-list');
    await expectNoA11yViolations(page);
  });
});
