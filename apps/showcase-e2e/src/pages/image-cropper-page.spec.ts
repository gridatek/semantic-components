import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Image Cropper Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/image-cropper');
    await expectNoA11yViolations(page);
  });
});
