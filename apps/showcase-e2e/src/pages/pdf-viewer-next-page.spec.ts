import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('PDF Viewer Next Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/pdf-viewer-next');
    await expectNoA11yViolations(page);
  });
});
