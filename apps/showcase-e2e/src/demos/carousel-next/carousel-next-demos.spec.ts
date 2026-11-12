import type { Page } from '@playwright/test';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/carousel-next/${name}`;

/**
 * The slides wholly in the viewport, by their names ("1 of 5"…): their
 * content, since the gap before it (their padding) is outside by design.
 */
async function shown(page: Page): Promise<string[]> {
  return page.locator('[scCarouselNextViewport]').evaluate((viewport) => {
    const box = viewport.getBoundingClientRect();
    return [...viewport.querySelectorAll('[scCarouselNextItem]')]
      .filter((slide) => {
        const r = (slide.firstElementChild ?? slide).getBoundingClientRect();
        return (
          r.left >= box.left - 1 &&
          r.right <= box.right + 1 &&
          r.top >= box.top - 1 &&
          r.bottom <= box.bottom + 1
        );
      })
      .map((slide) => slide.getAttribute('aria-label') ?? '');
  });
}

test.describe('Carousel Next demos', () => {
  test.beforeEach(async ({ page }) => {
    // Embla's motion: the tests read where it settles.
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('usage: a named region of named slides; the buttons move and stop at the ends', async ({
    page,
  }) => {
    await page.goto(demo('carousel-next-usage-demo'));
    const region = page.getByRole('region', { name: 'Numbers' });
    await expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    const slides = region.getByRole('group');
    await expect(slides).toHaveCount(5);
    await expect(slides.nth(1)).toHaveAttribute('aria-label', '2 of 5');
    await expect(slides.nth(1)).toHaveAttribute(
      'aria-roledescription',
      'slide',
    );

    const previous = page.getByRole('button', { name: 'Previous slide' });
    const next = page.getByRole('button', { name: 'Next slide' });
    await expect(previous).toBeDisabled();
    await expect.poll(() => shown(page)).toEqual(['1 of 5']);

    await next.click();
    await expect.poll(() => shown(page)).toEqual(['2 of 5']);
    await expect(previous).toBeEnabled();
    for (let i = 0; i < 3; i++) await next.click();
    await expect.poll(() => shown(page)).toEqual(['5 of 5']);
    await expect(next).toBeDisabled();
  });

  test('keys: → and ← move with focus inside', async ({ page }) => {
    await page.goto(demo('carousel-next-usage-demo'));
    await page.getByRole('button', { name: 'Next slide' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(page)).toEqual(['2 of 5']);
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(page)).toEqual(['3 of 5']);
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => shown(page)).toEqual(['2 of 5']);
  });

  test('vertical: ↓ and ↑ move; → does nothing', async ({ page }) => {
    await page.goto(demo('orientation-carousel-next-demo'));
    await expect(page.getByRole('region')).toHaveAttribute(
      'data-orientation',
      'vertical',
    );
    await expect.poll(() => shown(page)).toEqual(['1 of 5', '2 of 5']);
    await page.getByRole('button', { name: 'Next slide' }).focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await expect.poll(() => shown(page)).toEqual(['2 of 5', '3 of 5']);
    await page.keyboard.press('ArrowUp');
    await expect.poll(() => shown(page)).toEqual(['1 of 5', '2 of 5']);
  });

  test('RTL: from the right; ← goes on, → goes back; the icons mirrored', async ({
    page,
  }) => {
    await page.goto(demo('rtl-carousel-next-demo'));
    const viewport = page.locator('[scCarouselNextViewport]');
    const first = page.locator('[scCarouselNextItem]').first();
    // The first slide fills the viewport, the second waits on its left.
    await expect
      .poll(async () => {
        const v = await viewport.boundingBox();
        const s = await page
          .locator('[scCarouselNextItem]')
          .nth(1)
          .boundingBox();
        return s!.x + s!.width <= v!.x + 1;
      })
      .toBe(true);
    await expect(first).toHaveAttribute('aria-label', '1 من 5');

    const next = page.getByRole('button', { name: 'الشريحة التالية' });
    await next.focus();
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => shown(page)).toEqual(['2 من 5']);
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(page)).toEqual(['1 من 5']);

    // The next button at the left, its icon turned to point there.
    const icon = next.locator('svg');
    await expect
      .poll(() => icon.evaluate((e) => getComputedStyle(e).rotate))
      .toBe('180deg');
    const n = await next.boundingBox();
    const v = await viewport.boundingBox();
    expect(n!.x).toBeLessThan(v!.x);
  });

  test('API: [(activeIndex)] and count()', async ({ page }) => {
    await page.goto(demo('api-carousel-next-demo'));
    const status = page.locator('p', { hasText: 'Slide' });
    await expect(status).toHaveText('Slide 1 of 5');
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expect(status).toHaveText('Slide 2 of 5');
    await page.getByRole('button', { name: 'Previous slide' }).click();
    await expect(status).toHaveText('Slide 1 of 5');
  });

  test('plugin: autoplay moves on; Pause stops it and becomes Play', async ({
    page,
  }) => {
    await page.goto(demo('plugin-carousel-next-demo'));
    const pause = page.getByRole('button', { name: 'Pause' });
    await expect(pause).toBeVisible();
    // Autoplay every 2s.
    await expect
      .poll(() => shown(page), { timeout: 6000 })
      .not.toEqual(['1 of 5']);
    await pause.click();
    const play = page.getByRole('button', { name: 'Play' });
    await expect(play).toBeVisible();
    const stopped = await shown(page);
    await page.waitForTimeout(2600);
    expect(await shown(page)).toEqual(stopped);
    await play.click();
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
  });

  test('images: loops round, each slide an image named by its alt', async ({
    page,
  }) => {
    await page.goto(demo('images-carousel-next-demo'));
    await expect(page.getByRole('img')).toHaveCount(5);
    await expect(
      page.getByRole('img', { name: 'Mountains under a clear sky' }),
    ).toBeVisible();
    const previous = page.getByRole('button', { name: 'Previous slide' });
    await expect(previous).toBeEnabled();
    await previous.click();
    await expect.poll(() => shown(page)).toEqual(['5 of 5']);
  });

  test('sizes: two slides in view, aligned to the start', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 600 });
    await page.goto(demo('sizes-carousel-next-demo'));
    await expect.poll(() => shown(page)).toEqual(['1 of 5', '2 of 5']);
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expect.poll(() => shown(page)).toEqual(['2 of 5', '3 of 5']);
  });

  test('multiple: the buttons hidden on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 700 });
    await page.goto(demo('multiple-carousel-next-demo'));
    await expect(page.getByRole('group')).toHaveCount(5);
    await expect(page.getByRole('button', { name: 'Next slide' })).toBeHidden();
  });
});
