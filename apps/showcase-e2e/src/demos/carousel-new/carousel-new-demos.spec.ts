import type { Page } from '@playwright/test';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/carousel-new/${name}`;

/**
 * The slides wholly in the first viewport, by their names ("1 of 5"…): their
 * content, since the gap before it (their padding) is outside by design.
 */
async function shown(page: Page, at = 0): Promise<string[]> {
  return page
    .locator('[scCarouselNewViewport]')
    .nth(at)
    .evaluate((viewport) => {
      const box = viewport.getBoundingClientRect();
      return [...viewport.querySelectorAll('[scCarouselNewItem]')]
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

test.describe('Carousel New demos', () => {
  test.describe('settled at once', () => {
    test.beforeEach(async ({ page }) => {
      // Embla's motion: the tests read where it settles.
      await page.emulateMedia({ reducedMotion: 'reduce' });
    });

    test('usage: named region and slides; the buttons stay focusable at the ends (aria-disabled)', async ({
      page,
    }) => {
      await page.goto(demo('carousel-new-usage-demo'));
      const region = page.getByRole('region', { name: 'Numbers' });
      await expect(region).toHaveAttribute('aria-roledescription', 'carousel');
      const slides = page.locator('[scCarouselNewItem]');
      await expect(slides).toHaveCount(5);
      await expect(slides.nth(1)).toHaveAttribute('aria-label', '2 of 5');

      const previous = page.getByRole('button', { name: 'Previous slide' });
      const next = page.getByRole('button', { name: 'Next slide' });
      await expect(previous).toHaveAttribute('aria-disabled', 'true');
      // Still focusable: aria-disabled, not disabled.
      await expect(previous).not.toHaveAttribute('disabled');
      await previous.focus();
      await expect(previous).toBeFocused();
      await expect.poll(() => shown(page)).toEqual(['1 of 5']);

      await next.click();
      await expect.poll(() => shown(page)).toEqual(['2 of 5']);
      await expect(previous).not.toHaveAttribute('aria-disabled');
      for (let i = 0; i < 3; i++) await next.click();
      await expect.poll(() => shown(page)).toEqual(['5 of 5']);
      await expect(next).toHaveAttribute('aria-disabled', 'true');
    });

    test('slides out of view are inert; the track is a polite live region', async ({
      page,
    }) => {
      await page.goto(demo('carousel-new-usage-demo'));
      const slides = page.locator('[scCarouselNewItem]');
      await expect(slides.nth(1)).toHaveAttribute('inert', '');
      await expect(slides.nth(0)).not.toHaveAttribute('inert');
      await expect(slides.nth(0)).toHaveAttribute('data-active', 'true');
      await expect(page.locator('[scCarouselNewTrack]')).toHaveAttribute(
        'aria-live',
        'polite',
      );
      await page.getByRole('button', { name: 'Next slide' }).click();
      await expect(slides.nth(0)).toHaveAttribute('inert', '');
      await expect(slides.nth(1)).not.toHaveAttribute('inert');
    });

    test('keys: → ← move, Home and End go to the ends', async ({ page }) => {
      await page.goto(demo('carousel-new-usage-demo'));
      const next = page.getByRole('button', { name: 'Next slide' });
      await next.focus();
      await expect(next).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => shown(page)).toEqual(['2 of 5']);
      await page.keyboard.press('ArrowLeft');
      await expect.poll(() => shown(page)).toEqual(['1 of 5']);
      await page.keyboard.press('End');
      await expect.poll(() => shown(page)).toEqual(['5 of 5']);
      await page.keyboard.press('Home');
      await expect.poll(() => shown(page)).toEqual(['1 of 5']);
    });

    test('vertical: ↓ and ↑ move; → does nothing', async ({ page }) => {
      await page.goto(demo('orientation-carousel-new-demo'));
      await expect(page.getByRole('region')).toHaveAttribute(
        'data-orientation',
        'vertical',
      );
      await expect.poll(() => shown(page)).toEqual(['1 of 5', '2 of 5']);
      const next = page.getByRole('button', { name: 'Next slide' });
      await next.focus();
      await expect(next).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowDown');
      await expect.poll(() => shown(page)).toEqual(['2 of 5', '3 of 5']);
      await page.keyboard.press('ArrowUp');
      await expect.poll(() => shown(page)).toEqual(['1 of 5', '2 of 5']);
    });

    test('loop: never disabled; before the first comes the last', async ({
      page,
    }) => {
      await page.goto(demo('loop-carousel-new-demo'));
      const previous = page.getByRole('button', { name: 'Previous slide' });
      await expect.poll(() => shown(page)).toEqual(['1 of 5']);
      await expect(previous).not.toHaveAttribute('aria-disabled');
      await previous.click();
      await expect.poll(() => shown(page)).toEqual(['5 of 5']);
    });

    test('indicators: a tablist, one tab stop; a click and the arrows show their page', async ({
      page,
    }) => {
      await page.goto(demo('indicators-carousel-new-demo'));
      const list = page.getByRole('tablist', { name: 'Choose a slide' });
      const tab = (n: number) =>
        list.getByRole('tab', { name: `Slide ${n}`, exact: true });
      await expect(list.getByRole('tab')).toHaveCount(5);
      await expect(tab(1)).toHaveAttribute('aria-selected', 'true');
      await expect(tab(1)).toHaveAttribute('tabindex', '0');
      await expect(tab(2)).toHaveAttribute('tabindex', '-1');
      await expect(tab(1)).toHaveAttribute(
        'aria-controls',
        /sc-carousel-item-/,
      );

      await tab(3).click();
      await expect(tab(3)).toHaveAttribute('aria-selected', 'true');
      await expect(tab(1)).toHaveAttribute('aria-selected', 'false');
      await expect.poll(() => shown(page)).toEqual(['3 of 5']);

      await expect(tab(3)).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect(tab(4)).toBeFocused();
      await expect(tab(4)).toHaveAttribute('aria-selected', 'true');
      await expect.poll(() => shown(page)).toEqual(['4 of 5']);
      await page.keyboard.press('Home');
      await expect(tab(1)).toBeFocused();
      await expect.poll(() => shown(page)).toEqual(['1 of 5']);
    });

    test('indicators: 24px targets; the current one wider, not only darker', async ({
      page,
    }) => {
      await page.goto(demo('indicators-carousel-new-demo'));
      const tabs = page.getByRole('tab');
      await expect(tabs).toHaveCount(5);
      const mark = (n: number) =>
        tabs
          .nth(n)
          .evaluate((el) => parseFloat(getComputedStyle(el, '::after').width));
      await expect.poll(() => mark(0)).toBeGreaterThan(await mark(1));
      for (const box of await tabs.evaluateAll((all) =>
        all.map((el) => el.getBoundingClientRect()),
      )) {
        expect(box.width).toBeGreaterThanOrEqual(24);
        expect(box.height).toBeGreaterThanOrEqual(24);
      }
    });

    test('sizes: two slides in view, a slide a page', async ({ page }) => {
      await page.setViewportSize({ width: 900, height: 600 });
      await page.goto(demo('sizes-carousel-new-demo'));
      await expect.poll(() => shown(page)).toEqual(['1 of 5', '2 of 5']);
      await page.getByRole('button', { name: 'Next slide' }).click();
      await expect.poll(() => shown(page)).toEqual(['2 of 5', '3 of 5']);
    });

    test('a mouse drag moves to the next slide', async ({ page }) => {
      await page.goto(demo('carousel-new-usage-demo'));
      const viewport = page.locator('[scCarouselNewViewport]');
      await expect.poll(() => shown(page)).toEqual(['1 of 5']);
      const box = (await viewport.boundingBox())!;
      const y = box.y + box.height / 2;
      await page.mouse.move(box.x + box.width * 0.8, y);
      await page.mouse.down();
      for (let i = 1; i <= 10; i++) {
        await page.mouse.move(box.x + box.width * (0.8 - i * 0.06), y);
      }
      await page.mouse.up();
      await expect.poll(() => shown(page)).toEqual(['2 of 5']);
    });

    test('pages: three slides a page, a tab per page', async ({ page }) => {
      await page.goto(demo('pages-carousel-new-demo'));
      const tabs = page.getByRole('tab');
      // 8 slides, 3 a page: the last two join the last page.
      await expect(tabs).toHaveCount(3);
      await expect
        .poll(() => shown(page))
        .toEqual(['1 of 8', '2 of 8', '3 of 8']);
      await page.getByRole('button', { name: 'Next slide' }).click();
      await expect
        .poll(() => shown(page))
        .toEqual(['4 of 8', '5 of 8', '6 of 8']);
      await tabs.nth(2).click();
      await expect
        .poll(() => shown(page))
        .toEqual(['6 of 8', '7 of 8', '8 of 8']);
    });

    test('thumbnails: a thumbnail shows its photo; the strip follows the gallery', async ({
      page,
    }) => {
      await page.goto(demo('thumbnails-carousel-new-demo'));
      const strip = page.getByRole('region', { name: 'Thumbnails' });
      const thumb = (name: string) => strip.getByRole('button', { name });
      await expect(thumb('Mountains under a clear sky')).toHaveAttribute(
        'aria-current',
        'true',
      );
      await thumb('A forest path').click();
      await expect.poll(() => shown(page)).toEqual(['3 of 8']);
      await expect(thumb('A forest path')).toHaveAttribute(
        'aria-current',
        'true',
      );

      // To the last photo by the gallery's End: its thumbnail comes into view.
      const next = page.getByRole('button', { name: 'Next photo' });
      await next.focus();
      await expect(next).toBeFocused();
      await page.keyboard.press('End');
      await expect.poll(() => shown(page)).toEqual(['8 of 8']);
      await expect(thumb('A waterfall')).toHaveAttribute(
        'aria-current',
        'true',
      );
      await expect(thumb('A waterfall')).toBeInViewport();
      await expect(
        strip.locator('[scCarouselNewItem]').last(),
      ).not.toHaveAttribute('inert');
    });

    test('controlled: buttons outside, [(page)] both ways', async ({
      page,
    }) => {
      await page.goto(demo('controlled-carousel-new-demo'));
      const position = page.getByTestId('position');
      await expect(position).toHaveText('Slide 1 of 5');
      await page.getByRole('button', { name: 'Next', exact: true }).click();
      await expect(position).toHaveText('Slide 2 of 5');
      await expect.poll(() => shown(page)).toEqual(['2 of 5']);
      await page.getByRole('button', { name: 'Show the last slide' }).click();
      await expect.poll(() => shown(page)).toEqual(['5 of 5']);
      await expect(position).toHaveText('Slide 5 of 5');
      await expect(
        page.getByRole('button', { name: 'Next', exact: true }),
      ).toHaveAttribute('aria-disabled', 'true');
    });

    test('progress: --sc-carousel-progress follows the scroll', async ({
      page,
    }) => {
      await page.goto(demo('progress-carousel-new-demo'));
      const region = page.getByRole('region');
      const progress = () =>
        region.evaluate((e) =>
          Number(e.style.getPropertyValue('--sc-carousel-progress')),
        );
      await expect.poll(progress).toBe(0);
      const next = page.getByRole('button', { name: 'Next slide' });
      await next.focus();
      await expect(next).toBeFocused();
      await page.keyboard.press('End');
      await expect.poll(progress).toBeCloseTo(1, 2);
    });

    test('autoplay: no start under reduced motion', async ({ page }) => {
      await page.goto(demo('autoplay-carousel-new-demo'));
      await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
      await expect(page.getByRole('region')).not.toHaveAttribute(
        'data-playing',
      );
    });

    test('RTL: from the right; ← goes on, → goes back; the icons mirrored', async ({
      page,
    }) => {
      await page.goto(demo('rtl-carousel-new-demo'));
      const viewport = page.locator('[scCarouselNewViewport]');
      await expect
        .poll(async () => {
          const v = await viewport.boundingBox();
          const s = await page
            .locator('[scCarouselNewItem]')
            .nth(1)
            .boundingBox();
          return s!.x + s!.width <= v!.x + 1;
        })
        .toBe(true);
      const next = page.getByRole('button', { name: 'الشريحة التالية' });
      await next.focus();
      await expect(next).toBeFocused();
      await page.keyboard.press('ArrowLeft');
      await expect.poll(() => shown(page)).toEqual(['2 من 5']);
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => shown(page)).toEqual(['1 من 5']);
      await expect
        .poll(() =>
          next.locator('svg').evaluate((e) => getComputedStyle(e).rotate),
        )
        .toBe('180deg');
    });
  });

  test('autoplay: moves on by itself, the toggle stops it, keyboard focus stops it', async ({
    page,
  }) => {
    await page.goto(demo('autoplay-carousel-new-demo'));
    const region = page.getByRole('region');
    const selected = page.getByRole('tab', { selected: true });
    await expect(region).toHaveAttribute('data-playing', 'true');
    await expect(page.locator('[scCarouselNewTrack]')).toHaveAttribute(
      'aria-live',
      'off',
    );
    await expect(selected).toHaveAccessibleName('Slide 1');
    // 4 s a page.
    await expect(selected).toHaveAccessibleName('Slide 2', { timeout: 10_000 });

    // The toggle: Pause stops it, its name follows.
    await page.getByRole('button', { name: 'Pause' }).click();
    await expect(region).not.toHaveAttribute('data-playing');
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();

    // Play again, then keyboard focus comes in: it stops.
    await page.getByRole('button', { name: 'Play' }).click();
    await expect(region).toHaveAttribute('data-playing', 'true');
    await page.mouse.move(0, 0);
    await page.locator('body').click({ position: { x: 1, y: 1 } });
    await page.keyboard.press('Tab');
    await expect(region).not.toHaveAttribute('data-playing');
  });
});
