import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('QR Code Next Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/qr-code-next');
    await expect(page.locator('h2')).toHaveText([
      'Installation',
      'Usage',
      'Anatomy',
      'Colours',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: one part, its inputs and the export options', async ({
    page,
  }) => {
    await page.goto('/docs/components/qr-code-next');
    await expect(
      page.getByRole('region', { name: 'QR Code Next parts' }).getByRole('row'),
    ).toHaveCount(2);
    await expect(
      page.getByRole('region', { name: 'ScQrCodeNext inputs' }),
    ).toContainText('errorCorrection');
    await expect(
      page.getByRole('region', { name: 'Export options' }),
    ).toContainText('background');
  });
});
