import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Masonry Grid Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/masonry-grid');
    await expectNoA11yViolations(page);
  });
});
