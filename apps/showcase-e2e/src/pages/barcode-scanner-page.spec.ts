import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('Barcode Scanner Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/components/barcode-scanner');
    await expectNoA11yViolations(page);
  });
});
