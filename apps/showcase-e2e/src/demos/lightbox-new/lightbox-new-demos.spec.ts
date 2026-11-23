import type { Locator } from '@playwright/test';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/lightbox-new/${name}`;

/** The photo slides wholly in view, by their names ("3 of 6"…). */
async function shown(carousel: Locator): Promise<string[]> {
  return carousel.locator('[scCarouselNewViewport]').evaluate((viewport) => {
    const box = viewport.getBoundingClientRect();
    return [...viewport.querySelectorAll('[scCarouselNewItem]')]
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

  test('a thumbnail opens the dialog at its photo; keys, counter, strip; Escape closes and focus goes back', async ({
    page,
  }) => {
    await page.goto(demo('lightbox-new-usage-demo'));
    const opener = page.getByRole('button', { name: 'A forest path' });
    await opener.click();

    const dialog = page.getByRole('dialog', { name: 'Places' });
    await expect(dialog).toBeVisible();
    const photos = dialog.getByRole('region', { name: 'Photos' });
    await expect.poll(() => shown(photos)).toEqual(['3 of 6']);
    await expect(dialog.getByText('3 / 6')).toBeVisible();

    // Focus on Next: the arrows move at once.
    const next = dialog.getByRole('button', { name: 'Next photo' });
    await expect(next).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(photos)).toEqual(['4 of 6']);
    await expect(dialog.getByText('4 / 6')).toBeVisible();

    // The strip follows, and sets the photo.
    const strip = dialog.getByRole('region', { name: 'Thumbnails' });
    await expect(
      strip.getByRole('button', { name: 'A river in a gorge' }),
    ).toHaveAttribute('aria-current', 'true');
    await strip
      .getByRole('button', { name: 'Mountains under a clear sky' })
      .click();
    await expect.poll(() => shown(photos)).toEqual(['1 of 6']);
    await expect(
      dialog.getByRole('button', { name: 'Previous photo' }),
    ).toHaveAttribute('aria-disabled', 'true');

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(opener).toBeFocused();
  });

  test('article: each photo opens at its own, and the carousel goes through the three', async ({
    page,
  }) => {
    await page.goto(demo('article-lightbox-new-demo'));
    await page.getByRole('button', { name: 'A rocky coast' }).click();
    const dialog = page.getByRole('dialog', { name: 'A day out' });
    const photos = dialog.getByRole('region', { name: 'Photos' });
    await expect.poll(() => shown(photos)).toEqual(['2 of 3']);
    await dialog.getByRole('button', { name: 'Next photo' }).click();
    await expect.poll(() => shown(photos)).toEqual(['3 of 3']);
    await expect(dialog.getByText('3 / 3')).toBeVisible();
  });

  test('RTL: ← goes on to the next photo', async ({ page }) => {
    await page.goto(demo('rtl-lightbox-new-demo'));
    await page.getByRole('button', { name: 'ساحل صخري' }).click();
    const dialog = page.getByRole('dialog', { name: 'أماكن' });
    await expect(dialog).toHaveAttribute('dir', 'rtl');
    const photos = dialog.getByRole('region', { name: 'الصور' });
    await expect.poll(() => shown(photos)).toEqual(['2 من 6']);
    await expect(
      dialog.getByRole('button', { name: 'الصورة التالية' }),
    ).toBeFocused();
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => shown(photos)).toEqual(['3 من 6']);
  });
});
