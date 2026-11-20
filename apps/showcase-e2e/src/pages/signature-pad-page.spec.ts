import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Signature Pad Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/signature-pad');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'The value',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: one part, its inputs and the export options', async ({
    page,
  }) => {
    await page.goto('/docs/components/signature-pad');
    const parts = page.getByRole('region', {
      name: 'Signature Pad parts',
    });
    await expect(parts.getByRole('row')).toHaveCount(2);
    await expect(
      page.getByRole('region', { name: 'ScSignaturePad inputs' }),
    ).toContainText('penWidth');
    await expect(
      page.getByRole('region', { name: 'Export options' }),
    ).toContainText('scale');
  });
});
