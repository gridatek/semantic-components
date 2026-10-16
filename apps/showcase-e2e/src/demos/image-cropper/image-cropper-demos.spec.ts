import { type Page, expect, test } from '@playwright/test';

const selection = (page: Page) =>
  page.locator('[data-slot="image-cropper-selection"]');
const size = (page: Page) => page.getByText(/\d+\s+×\s+\d+ px/);

test.describe('Crop box', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/image-cropper/box-image-cropper-demo');
    await expect(size(page)).toHaveText('960 × 640 px');
  });

  test('a ratio shapes the crop, pressed while it is the one', async ({
    page,
  }) => {
    const square = page.getByRole('button', { name: '1:1' });
    await square.click();
    await expect(square).toHaveAttribute('aria-pressed', 'true');
    await expect(size(page)).toHaveText('640 × 640 px');
  });

  test('the keyboard moves and resizes the crop', async ({ page }) => {
    await expect(selection(page)).toHaveAccessibleName('Crop area');
    const before = await selection(page).boundingBox();
    await selection(page).focus();
    await page.keyboard.press('ArrowLeft');
    await expect
      .poll(async () => (await selection(page).boundingBox())?.x)
      .toBeLessThan(before?.x ?? 0);

    await page.keyboard.press('Alt+ArrowUp');
    await expect(size(page)).toHaveText('960 × 628 px');
  });

  test('the zoom buttons and the slider share the zoom', async ({ page }) => {
    const zoom = page.getByRole('slider', { name: 'Zoom' });
    await expect(page.getByRole('button', { name: 'Zoom out' })).toBeDisabled();
    await page.getByRole('button', { name: 'Zoom in' }).click();
    await expect(zoom).toHaveValue('1.25');
    await expect(page.getByText('125%')).toBeVisible();
  });

  test('a quarter turn turns the crop with the image', async ({ page }) => {
    await page.getByRole('button', { name: 'Rotate right' }).click();
    // The image is upright now: its crop is too.
    await expect(size(page)).toHaveText('640 × 960 px');
  });

  test('the crop is a file, shown and downloadable', async ({ page }) => {
    await page.getByRole('button', { name: 'Crop', exact: true }).click();
    const result = page.getByRole('img', { name: 'The cropped image' });
    await expect(result).toBeVisible();
    await expect
      .poll(() => result.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBe(960);
    await expect(page.getByRole('link', { name: 'Download' })).toHaveAttribute(
      'download',
      'crop.png',
    );
  });
});

test.describe('Avatar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/image-cropper/avatar-image-cropper-demo');
    await expect(selection(page)).toBeVisible();
  });

  test('a corner handle resizes the circle, which stays round', async ({
    page,
  }) => {
    const before = await selection(page).boundingBox();
    const handle = await page
      .locator('[data-handle="bottom-right"]')
      .boundingBox();
    await page.mouse.move(
      (handle?.x ?? 0) + (handle?.width ?? 0) / 2,
      (handle?.y ?? 0) + (handle?.height ?? 0) / 2,
    );
    await page.mouse.down();
    await page.mouse.move((handle?.x ?? 0) - 40, (handle?.y ?? 0) - 40, {
      steps: 5,
    });
    await page.mouse.up();

    const after = await selection(page).boundingBox();
    expect(after?.width).toBeLessThan((before?.width ?? 0) - 20);
    expect(after?.width).toBeCloseTo(after?.height ?? 0, 0);
  });

  test('the crop is the size asked', async ({ page }) => {
    await page.getByRole('button', { name: 'Use this picture' }).click();
    await expect(page.getByText('Cropped to 256 × 256 px.')).toBeVisible();
  });
});

test.describe('Cover', () => {
  test('the image zooms under the frame: wheel and keys', async ({ page }) => {
    await page.goto('/demos/image-cropper/cover-image-cropper-demo');
    await expect(selection(page)).toBeVisible();
    const zoom = page.getByRole('slider', { name: 'Zoom' });
    const start = Number(await zoom.inputValue());
    const frame = await selection(page).boundingBox();
    await page.mouse.move(
      (frame?.x ?? 0) + (frame?.width ?? 0) / 2,
      (frame?.y ?? 0) + (frame?.height ?? 0) / 2,
    );
    await page.mouse.wheel(0, -200);
    await expect
      .poll(async () => Number(await zoom.inputValue()))
      .toBeGreaterThan(start);

    const zoomed = Number(await zoom.inputValue());
    await selection(page).focus();
    await page.keyboard.press('-');
    await expect
      .poll(async () => Number(await zoom.inputValue()))
      .toBeLessThan(zoomed);
  });
});
