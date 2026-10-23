import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('File Upload Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/file-upload');
    await expectNoA11yViolations(page);
  });
});
