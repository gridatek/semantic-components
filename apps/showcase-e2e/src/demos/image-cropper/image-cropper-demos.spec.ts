import { type Locator, type Page, expect, test } from '../../test';

// The demos' image is 1200 × 800; the usage demo's viewport is 320 px high:
// 0.4 screen pixels an image pixel, so an arrow moves 3 (2.5, rounded).
const selection = (page: Page) => page.getByRole('slider', { name: 'Crop' });
const handle = (page: Page, name: string) =>
  page.getByRole('slider', { name, exact: true });
const zoom = (page: Page) => page.getByRole('slider', { name: 'Zoom' });
const expectCrop = (crop: Locator, value: string) =>
  expect(crop).toHaveAttribute('aria-valuetext', value);

/** Drags from an element's centre by dx, dy (screen pixels), in steps. */
async function drag(
  page: Page,
  target: Locator,
  dx: number,
  dy: number,
  between?: () => Promise<void>,
): Promise<void> {
  const box = await target.boundingBox();
  if (!box) throw new Error('nothing to drag');
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + dx, y + dy, { steps: 5 });
  await between?.();
  await page.mouse.up();
}

test.describe('Usage: a box over the image', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/image-cropper/image-cropper-usage-demo');
    // Loaded: the default crop, centred at four fifths.
    await expectCrop(selection(page), '960 by 640 pixels, at 120, 80');
  });

  test('a named group, no longer busy; the selection and handles are sliders', async ({
    page,
  }) => {
    const root = page.getByRole('group', { name: 'Photo' });
    await expect(root).not.toHaveAttribute('aria-busy', /.*/);
    await expect(selection(page)).toHaveAttribute('aria-valuenow', '120');
    await expect(selection(page)).toHaveAttribute('aria-valuemax', '240');
    await expect(page.locator('[data-position]')).toHaveCount(8);
    const right = handle(page, 'Right edge');
    await expect(right).toHaveAttribute('aria-orientation', 'horizontal');
    await expect(right).toHaveAttribute('aria-valuenow', '960');
    await expectCrop(right, '960 by 640 pixels');
    await expect(zoom(page)).toHaveAttribute('aria-valuetext', '125%');
  });

  test('the arrows move it a screen pixel, Shift ten; an edge takes only its own', async ({
    page,
  }) => {
    await selection(page).focus();
    await expect(selection(page)).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expectCrop(selection(page), '960 by 640 pixels, at 117, 80');
    await page.keyboard.press('Shift+ArrowLeft');
    await expectCrop(selection(page), '960 by 640 pixels, at 87, 80');

    const right = handle(page, 'Right edge');
    await right.focus();
    await expect(right).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expectCrop(right, '960 by 640 pixels');
    await page.keyboard.press('ArrowLeft');
    await expectCrop(right, '957 by 640 pixels');
  });

  test('+ and − zoom about the middle; R turns the image, Shift + R back', async ({
    page,
  }) => {
    await selection(page).focus();
    await expect(selection(page)).toBeFocused();
    await page.keyboard.press('+');
    await expectCrop(selection(page), '768 by 512 pixels, at 216, 144');
    await expect(zoom(page)).toHaveAttribute('aria-valuetext', '156%');
    await page.keyboard.press('-');
    await expectCrop(selection(page), '960 by 640 pixels, at 120, 80');

    await page.keyboard.press('r');
    await expectCrop(selection(page), '640 by 960 pixels, at 80, 120');
    await page.keyboard.press('Shift+R');
    await expectCrop(selection(page), '960 by 640 pixels, at 120, 80');
  });

  test('a corner dragged resizes; Escape during a drag puts it back', async ({
    page,
  }) => {
    const corner = handle(page, 'Bottom right corner');
    await drag(page, corner, -40, -40);
    await expectCrop(selection(page), '860 by 540 pixels, at 120, 80');

    await drag(page, corner, -40, 0, async () => {
      await expectCrop(selection(page), '760 by 540 pixels, at 120, 80');
      await page.keyboard.press('Escape');
      await expectCrop(selection(page), '860 by 540 pixels, at 120, 80');
    });
    await expectCrop(selection(page), '860 by 540 pixels, at 120, 80');
  });

  test('Shift on a handle keeps the ratio while it is free', async ({
    page,
  }) => {
    await page.keyboard.down('Shift');
    await drag(page, handle(page, 'Bottom right corner'), -40, 0);
    await page.keyboard.up('Shift');
    await expectCrop(selection(page), '860 by 573 pixels, at 120, 80');
  });

  test('dragged, the selection moves inside the image', async ({ page }) => {
    await drag(page, selection(page), 400, 0);
    // At the right edge: no further.
    await expectCrop(selection(page), '960 by 640 pixels, at 240, 80');
  });

  test('a ratio refits the crop about its middle', async ({ page }) => {
    await page
      .getByRole('combobox', { name: 'Aspect ratio' })
      .selectOption('Square');
    await expectCrop(selection(page), '640 by 640 pixels, at 280, 80');
  });

  test('rotate and flip turn and mirror the crop with the image', async ({
    page,
  }) => {
    await selection(page).focus();
    await expect(selection(page)).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expectCrop(selection(page), '960 by 640 pixels, at 117, 80');
    await page.getByRole('button', { name: 'Flip' }).click();
    await expectCrop(selection(page), '960 by 640 pixels, at 123, 80');
    await page.getByRole('button', { name: 'Rotate' }).click();
    await expectCrop(selection(page), '640 by 960 pixels, at 80, 123');
  });

  test('Crop makes a file of the crop', async ({ page }) => {
    await page.getByRole('button', { name: 'Crop', exact: true }).click();
    const result = page.getByRole('img', { name: 'The cropped photo' });
    await expect(result).toBeVisible();
    await expect
      .poll(() =>
        result.evaluate((img: HTMLImageElement) => [
          img.naturalWidth,
          img.naturalHeight,
        ]),
      )
      .toEqual([960, 640]);
  });
});

test('Aspect ratio: the toggle group sets it; wide refits about the middle', async ({
  page,
}) => {
  await page.goto('/demos/image-cropper/aspect-ratio-image-cropper-demo');
  await expectCrop(selection(page), '960 by 640 pixels, at 120, 80');
  await page.getByRole('button', { name: 'Wide' }).click();
  await expectCrop(selection(page), '960 by 540 pixels, at 120, 130');
  await page.getByRole('button', { name: 'Square' }).click();
  await expectCrop(selection(page), '640 by 640 pixels, at 280, 80');
  await page.getByRole('button', { name: 'Flip vertically' }).click();
  await expectCrop(selection(page), '640 by 640 pixels, at 280, 80');
});

test.describe('Frame: the image moves under it', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/image-cropper/frame-image-cropper-demo');
    // The demo starts zoomed in, so the image moves every way.
    await expectCrop(selection(page), '640 by 640 pixels, at 280, 80');
  });

  test('no handles; dragging the image pans it', async ({ page }) => {
    await expect(page.locator('[data-position]')).toHaveCount(0);
    const viewport = page.locator('[scImageCropperViewport]');
    await drag(page, viewport, 50, 0);
    // The image went right: the crop left.
    await expect
      .poll(async () =>
        Number(await selection(page).getAttribute('aria-valuenow')),
      )
      .toBeLessThan(280);

    // And down: the crop up, toward the top.
    await drag(page, viewport, 0, 40);
    await expect
      .poll(async () => {
        const text = await selection(page).getAttribute('aria-valuetext');
        return Number((text ?? '').split(', ').pop());
      })
      .toBeLessThan(80);
  });

  test('the wheel zooms at the pointer, the slider too', async ({ page }) => {
    const viewport = page.locator('[scImageCropperViewport]');
    await viewport.hover();
    await page.mouse.wheel(0, -100);
    await expect
      .poll(async () =>
        Number(
          (await zoom(page).getAttribute('aria-valuetext'))?.replace('%', ''),
        ),
      )
      .toBeGreaterThan(125);
  });

  // 125% shows as 1.3 (it moves in tenths): the next is 1.4.
  test('the slider zooms by a tenth', async ({ page }) => {
    await zoom(page).focus();
    await expect(zoom(page)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(zoom(page)).toHaveAttribute('aria-valuetext', '140%');
    await expectCrop(selection(page), '571 by 571 pixels, at 314, 114');
  });

  test('Save makes a 128 px round PNG, its corners clear', async ({ page }) => {
    await page.getByRole('button', { name: 'Save avatar' }).click();
    const saved = page.getByRole('img', { name: 'The saved avatar' });
    await expect(saved).toBeVisible();
    await expect
      .poll(() =>
        saved.evaluate((img: HTMLImageElement) => {
          if (!img.complete || !img.naturalWidth) return null;
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const context = canvas.getContext('2d');
          context?.drawImage(img, 0, 0);
          const corner = context?.getImageData(0, 0, 1, 1).data[3];
          const middle = context?.getImageData(64, 64, 1, 1).data[3];
          return [img.naturalWidth, img.naturalHeight, corner, middle];
        }),
      )
      .toEqual([128, 128, 0, 255]);
  });
});

test('Grid: four columns and two rows of lines', async ({ page }) => {
  await page.goto('/demos/image-cropper/grid-image-cropper-demo');
  await expectCrop(selection(page), '1,200 by 400 pixels, at 0, 200');
  await expect(page.locator('[scImageCropperGrid] > div')).toHaveCount(4);
});

test.describe('Controlled: the crop is yours', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/image-cropper/controlled-image-cropper-demo');
  });

  test('a saved crop is kept as the image loads', async ({ page }) => {
    await expectCrop(selection(page), '560 by 420 pixels, at 520, 140');
    await expect(page.locator('output')).toHaveText('560 × 420 at 520, 140');
  });

  test('a zoom from a button; null starts again; the saved one back', async ({
    page,
  }) => {
    await expectCrop(selection(page), '560 by 420 pixels, at 520, 140');
    await page.getByRole('button', { name: 'Zoom 2×' }).click();
    await expectCrop(selection(page), '533 by 400 pixels, at 533, 150');
    await page.getByRole('button', { name: 'Start again' }).click();
    await expectCrop(selection(page), '960 by 640 pixels, at 120, 80');
    await page.getByRole('button', { name: 'Restore saved' }).click();
    await expectCrop(selection(page), '560 by 420 pixels, at 520, 140');
  });
});

test('Disabled: out of the tab order, the controls off, the keys do nothing', async ({
  page,
}) => {
  await page.goto('/demos/image-cropper/disabled-image-cropper-demo');
  await expectCrop(selection(page), '960 by 640 pixels, at 120, 80');
  await expect(selection(page)).toHaveAttribute('aria-disabled', 'true');
  await expect(selection(page)).not.toHaveAttribute('tabindex', /.*/);
  await expect(handle(page, 'Top left corner')).not.toHaveAttribute(
    'tabindex',
    /.*/,
  );
  await expect(zoom(page)).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Rotate' })).toBeDisabled();
  await page.getByRole('group', { name: 'Photo' }).press('Tab');
  await expect(selection(page)).not.toBeFocused();
});

test('RTL: the numbers in Arabic words, the image not mirrored', async ({
  page,
}) => {
  await page.goto('/demos/image-cropper/rtl-image-cropper-demo');
  const crop = page.getByRole('slider', { name: 'القص' });
  await expectCrop(crop, '960 × 640 بكسل، عند 120، 80');
  await crop.focus();
  await expect(crop).toBeFocused();
  // ← moves it left, as on the image.
  await page.keyboard.press('ArrowLeft');
  await expectCrop(crop, '960 × 640 بكسل، عند 117، 80');
});

test.describe('Circle: a round crop moved over the image', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/image-cropper/circle-image-cropper-demo');
    // Square, centred, at four fifths of the image's height.
    await expectCrop(selection(page), '640 by 640 pixels, at 280, 80');
  });

  test('dragged, it moves; a corner resizes it, still round', async ({
    page,
  }) => {
    await expect(selection(page)).toHaveClass(/rounded-full/);
    await drag(page, selection(page), -1000, 0);
    // At the left edge: no further.
    await expectCrop(selection(page), '640 by 640 pixels, at 0, 80');
    await drag(page, handle(page, 'Bottom right corner'), -36, 0);
    await expect
      .poll(async () => {
        const text = await selection(page).getAttribute('aria-valuetext');
        const [width, , height] = (text ?? '').split(' ');
        return Number(width) < 640 && width === height;
      })
      .toBe(true);
  });

  test('Crop makes a 256 px round PNG', async ({ page }) => {
    await page.getByRole('button', { name: 'Crop', exact: true }).click();
    const result = page.getByRole('img', { name: 'The cropped circle' });
    await expect(result).toBeVisible();
    await expect
      .poll(() =>
        result.evaluate((img: HTMLImageElement) => {
          if (!img.complete || !img.naturalWidth) return null;
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const context = canvas.getContext('2d');
          context?.drawImage(img, 0, 0);
          return [
            img.naturalWidth,
            context?.getImageData(0, 0, 1, 1).data[3],
            context?.getImageData(128, 128, 1, 1).data[3],
          ];
        }),
      )
      .toEqual([256, 0, 255]);
  });
});
