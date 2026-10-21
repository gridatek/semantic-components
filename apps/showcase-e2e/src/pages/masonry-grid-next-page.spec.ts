import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Masonry Grid Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/masonry-grid-next');
    await expectNoA11yViolations(page);
  });
});
