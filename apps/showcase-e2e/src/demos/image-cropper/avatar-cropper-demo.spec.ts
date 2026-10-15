import { expect, test } from '@playwright/test';

test.describe('Avatar Cropper Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/image-cropper/avatar-cropper-demo');
  });

  test('the zoom slider and the zoom buttons follow each other', async ({
    page,
  }) => {
    const zoom = page.getByRole('slider', { name: 'Zoom' });
    // The image is fitted first: start from there.
    const start = Number(await zoom.inputValue());
    await expect(page.getByText(`${Math.round(start * 100)}%`)).toBeVisible();

    await page.getByRole('button', { name: 'Zoom in' }).click();
    await expect
      .poll(async () => Number(await zoom.inputValue()))
      .toBeGreaterThan(start);
    const after = Number(await zoom.inputValue());
    await expect(page.getByText(`${Math.round(after * 100)}%`)).toBeVisible();

    await zoom.fill('2');
    await expect(page.getByText('200%')).toBeVisible();
  });

  test('the previews show the crop, each with its description', async ({
    page,
  }) => {
    await expect(page.getByRole('img', { name: 'Crop preview' })).toHaveCount(
      3,
    );
  });
});
