import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Barcode Scanner Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/barcode-scanner');
    await expect(page.locator('h2')).toHaveText([
      'Installation',
      'Usage',
      'Anatomy',
      'Reading',
      'Browsers',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: every part and the inputs', async ({ page }) => {
    await page.goto('/docs/components/barcode-scanner');
    await expect(
      page
        .getByRole('region', { name: 'Barcode Scanner parts' })
        .getByRole('row'),
    ).toHaveCount(6);
    await expect(
      page.getByRole('region', { name: 'ScBarcodeScanner inputs' }),
    ).toContainText('formats');
  });
});
