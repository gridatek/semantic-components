import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Kanban Board Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/kanban-board-next');
    await expectNoA11yViolations(page);
  });
});
