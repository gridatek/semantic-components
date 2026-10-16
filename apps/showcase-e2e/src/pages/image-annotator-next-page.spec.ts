import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Image Annotator Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/image-annotator-next');
    await expectNoA11yViolations(page);
  });
});
