import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Kanban Board Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/kanban-board');
    await expectNoA11yViolations(page);
  });
});
