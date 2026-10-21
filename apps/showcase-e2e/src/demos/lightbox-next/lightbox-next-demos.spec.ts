import { type Page, expect, test } from '@playwright/test';

const demo = (name: string) =>
  `/demos/lightbox-next/${name}-lightbox-next-demo`;
const dialog = (page: Page) => page.getByRole('dialog');
const image = (page: Page) => page.locator('[data-slot="lightbox-image"]');
/** The opening morph, over (the lightbox says so: data-morphing). */
const settled = (page: Page) =>
  expect(page.locator('[data-slot="lightbox"]').first()).not.toHaveAttribute(
    'data-morphing',
  );

/** Opens a photo by its link, and waits for the viewer to have settled. */
const open = async (page: Page, name: string) => {
  await page.getByRole('link', { name }).click();
  await expect(dialog(page)).toBeVisible();
  // Begun at once (set before the transition starts), then over.
  await settled(page);
};

test.describe('Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('gallery'));
  });

  test('links to the photos, opened in a modal dialog', async ({ page }) => {
    const link = page.getByRole('link', {
      name: 'Snowy mountains under clouds',
    });
    await expect(link).toHaveAttribute('href', '/images/gallery/mountains.jpg');
    await link.click();
    await expect(dialog(page)).toBeVisible();
    await expect(dialog(page)).toHaveAccessibleName('Photo viewer');
    await expect(image(page)).toHaveAttribute(
      'alt',
      'Snowy mountains under clouds',
    );
    await expect(dialog(page).getByText('4 of 8')).toBeVisible();
    await expect(
      dialog(page).getByRole('button', { name: /Snowy mountains/ }),
    ).toHaveAttribute('aria-current', 'true');
  });

  test('the keys: arrows, Home, End, zoom', async ({ page }) => {
    await open(page, 'A pine forest above the sea');
    await expect(dialog(page)).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(image(page)).toHaveAttribute(
      'alt',
      'A waterfall in a rocky gorge',
    );
    await page.keyboard.press('End');
    await expect(dialog(page).getByText('8 of 8')).toBeVisible();
    // It loops.
    await page.keyboard.press('ArrowRight');
    await expect(dialog(page).getByText('1 of 8')).toBeVisible();
    await page.keyboard.press('+');
    await expect(image(page)).toHaveAttribute('data-zoomed', 'true');
    await page.keyboard.press('0');
    await expect(image(page)).not.toHaveAttribute('data-zoomed');
  });

  test('swipes: sideways to change, down to close', async ({ page }) => {
    await open(page, 'A pine forest above the sea');
    await expect(dialog(page)).toBeVisible();
    const box = await image(page).boundingBox();
    const cx = (box?.x ?? 0) + (box?.width ?? 0) / 2;
    const cy = (box?.y ?? 0) + (box?.height ?? 0) / 2;
    await page.mouse.move(cx + 100, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 100, cy, { steps: 5 });
    await page.mouse.up();
    await expect(dialog(page).getByText('2 of 8')).toBeVisible();
    await page.mouse.move(cx, cy - 60);
    await page.mouse.down();
    await page.mouse.move(cx, cy + 80, { steps: 5 });
    await page.mouse.up();
    await expect(dialog(page)).toBeHidden();
  });

  test('zoom where you point, then pan', async ({ page }) => {
    await open(page, 'A pine forest above the sea');
    const box = await image(page).boundingBox();
    const x = (box?.x ?? 0) + (box?.width ?? 0) * 0.25;
    const y = (box?.y ?? 0) + (box?.height ?? 0) * 0.25;
    await page.mouse.dblclick(x, y);
    await expect(image(page)).toHaveAttribute('style', /scale\(2\.5\)/);
    // Zoomed toward the top left: shifted right and down.
    await expect(image(page)).toHaveAttribute('style', /translate\(\d/);
    await dialog(page).getByRole('button', { name: 'Fit' }).click();
    await expect(image(page)).toHaveAttribute('style', /scale\(1\)/);
  });

  test('Escape: closed, unzoomed, focus on the photo shown', async ({
    page,
  }) => {
    await open(page, 'A pine forest above the sea');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('+');
    await page.keyboard.press('Escape');
    await expect(dialog(page)).toBeHidden();
    await expect(
      page.getByRole('link', { name: 'A waterfall in a rocky gorge' }),
    ).toBeFocused();
    await expect(image(page)).not.toHaveAttribute('data-zoomed');
  });

  test('the thumbnails show their photo', async ({ page }) => {
    await open(page, 'A pine forest above the sea');
    await dialog(page)
      .getByRole('button', { name: /bicycle/ })
      .click();
    await expect(dialog(page).getByText('8 of 8')).toBeVisible();
    await expect(dialog(page).getByText('— Alexander Shustov')).toBeVisible();
  });
});

test('In an article: one image', async ({ page }) => {
  await page.goto(demo('article'));
  await open(page, 'A wooden table in a quiet café');
  await expect(dialog(page)).toHaveAccessibleName('The café');
  await dialog(page).getByRole('button', { name: 'Close' }).click();
  await expect(dialog(page)).toBeHidden();
});

test('Controlled: from outside; no loop at the ends', async ({ page }) => {
  await page.goto(demo('controlled'));
  await page.getByRole('button', { name: 'Choose the last' }).click();
  await page.getByRole('button', { name: /^Open at/ }).click();
  await expect(dialog(page).getByText('8 of 8')).toBeVisible();
  await expect(
    dialog(page).getByRole('button', { name: 'Next image' }),
  ).toBeDisabled();
  await page.keyboard.press('Home');
  await expect(
    dialog(page).getByRole('button', { name: 'Previous image' }),
  ).toBeDisabled();
});
