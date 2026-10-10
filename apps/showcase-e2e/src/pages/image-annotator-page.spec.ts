import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('Image Annotator Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/image-annotator');
    await expectNoA11yViolations(page);
  });
});
