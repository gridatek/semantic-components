import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Lightbox Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/lightbox-next');
    await expectNoA11yViolations(page);
  });
});
