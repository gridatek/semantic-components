import { expectNoA11yViolations } from '../axe';
import { expect, test } from '../test';

test.describe('Image Cropper Page', () => {
  test('sections in order, and no axe violations', async ({ page }) => {
    await page.goto('/docs/components/image-cropper');
    await expect(page.locator('h2')).toHaveText([
      'Usage',
      'Anatomy',
      'The crop',
      'Accessibility',
      'Examples',
      'API reference',
    ]);
    await expectNoA11yViolations(page);
  });

  test('API reference: every part, the inputs and cropImage', async ({
    page,
  }) => {
    await page.goto('/docs/components/image-cropper');
    const parts = page.getByRole('region', {
      name: 'Image Cropper parts',
    });
    await expect(parts.getByRole('row')).toHaveCount(12);
    await expect(parts).toContainText('input[scImageCropperZoom]');
    await expect(
      page.getByRole('region', { name: 'ScImageCropper inputs' }),
    ).toContainText('maxZoom');
    await expect(
      page.getByRole('region', { name: 'cropImage options' }),
    ).toContainText('quality');
  });
});
