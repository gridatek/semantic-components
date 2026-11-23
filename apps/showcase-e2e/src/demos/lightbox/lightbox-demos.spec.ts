import type { Locator } from '@playwright/test';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/lightbox/${name}`;

/** The photo slides wholly in view, by their names ("3 of 6"…). */
async function shown(carousel: Locator): Promise<string[]> {
  return carousel.locator('[scCarouselViewport]').evaluate((viewport) => {
    const box = viewport.getBoundingClientRect();
    return [...viewport.querySelectorAll('[scCarouselItem]')]
      .filter((slide) => {
        const r = (slide.firstElementChild ?? slide).getBoundingClientRect();
        return r.left >= box.left - 1 && r.right <= box.right + 1;
      })
      .map((slide) => slide.getAttribute('aria-label') ?? '');
  });
}

test.describe('Lightbox recipe demos', () => {
  test.beforeEach(async ({ page }) => {
    // Embla's motion: the tests read where it settles.
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('a thumbnail opens the dialog at its photo; the arrows move from the start; Escape closes and focus goes back', async ({
    page,
  }) => {
    await page.goto(demo('lightbox-usage-demo'));
    const opener = page.getByRole('button', { name: 'A forest path' });
    await opener.click();

    const dialog = page.getByRole('dialog', { name: 'Places' });
    await expect(dialog).toBeVisible();
    const photos = dialog.getByRole('region', { name: 'Photos' });
    await expect.poll(() => shown(photos)).toEqual(['3 of 6']);
    await expect(dialog.getByText('3 / 6')).toBeVisible();

    // Focus on the photo: the arrows move at once.
    await expect(photos.locator('[scCarouselViewport]')).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(photos)).toEqual(['4 of 6']);
    await expect(dialog.getByText('4 / 6')).toBeVisible();
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => shown(photos)).toEqual(['2 of 6']);

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test('the thumbnails set the photo, and the arrows still move from them; a click on the photo too', async ({
    page,
  }) => {
    await page.goto(demo('lightbox-usage-demo'));
    await page.getByRole('button', { name: 'A rocky coast' }).click();
    const dialog = page.getByRole('dialog', { name: 'Places' });
    const photos = dialog.getByRole('region', { name: 'Photos' });
    const strip = dialog.getByRole('group', { name: 'Thumbnails' });
    await expect.poll(() => shown(photos)).toEqual(['2 of 6']);

    const thumb = strip.getByRole('button', { name: 'A street cafe' });
    await thumb.click();
    await expect.poll(() => shown(photos)).toEqual(['5 of 6']);
    await expect(thumb).toHaveAttribute('aria-current', 'true');
    await expect(thumb).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(photos)).toEqual(['6 of 6']);
    await expect(
      strip.getByRole('button', { name: 'A snowy summit' }),
    ).toHaveAttribute('aria-current', 'true');
    await expect(
      dialog.getByRole('button', { name: 'Next photo' }),
    ).toBeDisabled();

    // A click on the photo: focus in the viewport, the arrows move.
    await photos.getByRole('img', { name: 'A snowy summit' }).click();
    await expect(photos.locator('[scCarouselViewport]')).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => shown(photos)).toEqual(['5 of 6']);
  });

  test('article: each photo opens at its own, and the carousel goes through the three', async ({
    page,
  }) => {
    await page.goto(demo('article-lightbox-demo'));
    await page.getByRole('button', { name: 'A rocky coast' }).click();
    const dialog = page.getByRole('dialog', { name: 'A day out' });
    const photos = dialog.getByRole('region', { name: 'Photos' });
    await expect.poll(() => shown(photos)).toEqual(['2 of 3']);
    await dialog.getByRole('button', { name: 'Next photo' }).click();
    await expect.poll(() => shown(photos)).toEqual(['3 of 3']);
    await expect(dialog.getByText('3 / 3')).toBeVisible();
  });

  test('RTL: ← goes on to the next photo', async ({ page }) => {
    await page.goto(demo('rtl-lightbox-demo'));
    await page.getByRole('button', { name: 'ساحل صخري' }).click();
    const dialog = page.getByRole('dialog', { name: 'أماكن' });
    await expect(dialog).toHaveAttribute('dir', 'rtl');
    const photos = dialog.getByRole('region', { name: 'الصور' });
    await expect.poll(() => shown(photos)).toEqual(['2 من 6']);
    await expect(photos.locator('[scCarouselViewport]')).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => shown(photos)).toEqual(['3 من 6']);
  });
});
