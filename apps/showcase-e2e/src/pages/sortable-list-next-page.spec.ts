import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Sortable List Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/sortable-list-next');
    await expectNoA11yViolations(page);
  });
});
