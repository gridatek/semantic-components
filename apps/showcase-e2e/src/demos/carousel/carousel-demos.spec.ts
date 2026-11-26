import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/carousel/${name}`;

/**
 * The slides wholly in the viewport, by their names ("1 of 5"…): their
 * content, since the gap before it (their padding) is outside by design.
 */
async function shown(page: Page): Promise<string[]> {
  return page
    .locator('[scCarouselViewport]')
    .first()
    .evaluate((viewport) => {
      const box = viewport.getBoundingClientRect();
      return [...viewport.querySelectorAll('[scCarouselItem]')]
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

test.describe('Carousel demos', () => {
  test.beforeEach(async ({ page }) => {
    // Embla's motion: the tests read where it settles.
    await page.emulateMedia({ reducedMotion: 'reduce' });
  });

  test('usage: a named region of named slides; the buttons move and stop at the ends', async ({
    page,
  }) => {
    await page.goto(demo('carousel-usage-demo'));
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
    await page.goto(demo('carousel-usage-demo'));
    await page.getByRole('button', { name: 'Next slide' }).focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(page)).toEqual(['2 of 5']);
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(page)).toEqual(['3 of 5']);
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => shown(page)).toEqual(['2 of 5']);
  });

  test('vertical: ↓ and ↑ move; → does nothing', async ({ page }) => {
    await page.goto(demo('orientation-carousel-demo'));
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

  for (const [numberingSystem, one, label] of [
    ['latn', '1', '1 من 5'],
    ['arab', '١', '١ من ٥'],
  ] as const)
    test(`RTL: the slides' numbers and names in the user's digits (${numberingSystem})`, async ({
      page,
      baseURL,
    }) => {
      await page.context().addCookies([
        {
          name: 'sc-numbering-system',
          value: numberingSystem,
          url: baseURL ?? 'http://localhost:4200',
        },
      ]);
      await page.goto(demo('rtl-carousel-demo'));
      const first = page.locator('[scCarouselItem]').first();
      await expect(first).toHaveText(one);
      await expect(first).toHaveAttribute('aria-label', label);
    });

  test('RTL: from the right; ← goes on, → goes back; the icons mirrored', async ({
    page,
    baseURL,
  }) => {
    // Latin digits, whatever the engine's default for Arabic.
    await page.context().addCookies([
      {
        name: 'sc-numbering-system',
        value: 'latn',
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto(demo('rtl-carousel-demo'));
    const viewport = page.locator('[scCarouselViewport]');
    const first = page.locator('[scCarouselItem]').first();
    // The first slide fills the viewport, the second waits on its left.
    await expect
      .poll(async () => {
        const v = await viewport.boundingBox();
        const s = await page.locator('[scCarouselItem]').nth(1).boundingBox();
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
    await page.goto(demo('api-carousel-demo'));
    const status = page.locator('p', { hasText: 'Slide' });
    await expect(status).toHaveText('Slide 1 of 5');
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expect(status).toHaveText('Slide 2 of 5');
    await page.getByRole('button', { name: 'Previous slide' }).click();
    await expect(status).toHaveText('Slide 1 of 5');
  });

  test('indicators: a tablist, one tab stop; a click and the arrows move the selected one', async ({
    page,
  }) => {
    await page.goto(demo('indicators-carousel-demo'));
    const list = page.getByRole('tablist', { name: 'Choose a slide' });
    const tab = (n: number) =>
      list.getByRole('tab', { name: `Slide ${n}`, exact: true });
    await expect(list.getByRole('tab')).toHaveCount(5);
    await expect(tab(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tab(1)).toHaveAttribute('tabindex', '0');
    await expect(tab(2)).toHaveAttribute('tabindex', '-1');

    await tab(3).click();
    await expect(tab(3)).toHaveAttribute('aria-selected', 'true');
    await expect(tab(1)).toHaveAttribute('aria-selected', 'false');
    await expect.poll(() => shown(page)).toEqual(['3 of 5']);

    // The arrows among the tabs: the selected one and the slide move, once.
    await expect(tab(3)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(tab(4)).toBeFocused();
    await expect(tab(4)).toHaveAttribute('aria-selected', 'true');
    await expect.poll(() => shown(page)).toEqual(['4 of 5']);
    await page.keyboard.press('Home');
    await expect(tab(1)).toBeFocused();
    await expect.poll(() => shown(page)).toEqual(['1 of 5']);

    // Previous and Next move the selected one too.
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expect(tab(2)).toHaveAttribute('aria-selected', 'true');
  });

  test('indicators: 24px targets; the current one wider, not only darker', async ({
    page,
  }) => {
    await page.goto(demo('indicators-carousel-demo'));
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

  test('a click on a slide focuses the viewport: the arrows move from there', async ({
    page,
  }) => {
    await page.goto(demo('carousel-usage-demo'));
    const viewport = page.locator('[scCarouselViewport]');
    await expect.poll(() => shown(page)).toEqual(['1 of 5']);
    await page.locator('[scCarouselItem]').first().click();
    await expect(viewport).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => shown(page)).toEqual(['2 of 5']);
  });

  test('align: centred, the neighbours peek in; starts on the third', async ({
    page,
  }) => {
    await page.goto(demo('align-carousel-demo'));
    // Centred: the third whole, the second and fourth cut at the edges.
    await expect.poll(() => shown(page)).toEqual(['3 of 6']);
    const peek = await page.locator('[scCarouselItem]').evaluateAll((all) => {
      const viewport =
        all[0].parentElement!.parentElement!.getBoundingClientRect();
      return all.map((slide) => {
        const r = slide.getBoundingClientRect();
        return r.right > viewport.left + 1 && r.left < viewport.right - 1;
      });
    });
    expect(peek).toEqual([false, true, true, true, false, false]);
  });

  test('pages: three slides a page, an indicator per page', async ({
    page,
  }) => {
    await page.goto(demo('pages-carousel-demo'));
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
    await page.goto(demo('thumbnails-carousel-demo'));
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

    // The gallery to its last photo: its thumbnail comes into the strip.
    const next = page.getByRole('button', { name: 'Next photo' });
    for (let i = 0; i < 5; i++) await next.click();
    await expect.poll(() => shown(page)).toEqual(['8 of 8']);
    await expect(thumb('A waterfall')).toHaveAttribute('aria-current', 'true');
    const box = await strip.locator('[scCarouselViewport]').boundingBox();
    await expect
      .poll(async () => {
        const t = await thumb('A waterfall').boundingBox();
        return t!.x + t!.width <= box!.x + box!.width + 1;
      })
      .toBe(true);
  });

  test('drag free: a fling coasts past the next slide', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(demo('drag-free-carousel-demo'));
    const viewport = page.locator('[scCarouselViewport]');
    await expect(page.locator('[scCarouselItem]')).toHaveCount(10);
    const box = (await viewport.boundingBox())!;
    const y = box.y + box.height / 2;
    await page.mouse.move(box.x + box.width * 0.9, y);
    await page.mouse.down();
    for (let i = 1; i <= 5; i++) {
      await page.mouse.move(box.x + box.width * (0.9 - i * 0.15), y);
    }
    await page.mouse.up();
    // Not snapped back to a slide's start: it rests wherever it coasts.
    await expect
      .poll(() => shown(page).then((s) => s[0] ?? ''), { timeout: 10_000 })
      .not.toBe('1 of 10');
  });

  test('progress: the bar follows the scroll', async ({ page }) => {
    await page.goto(demo('progress-carousel-demo'));
    const bar = page.getByTestId('progress');
    const scale = () =>
      bar.evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).a);
    await expect.poll(scale).toBe(0);
    const viewport = page.locator('[scCarouselViewport]');
    await viewport.focus();
    await expect(viewport).toBeFocused();
    for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowRight');
    await expect.poll(scale).toBeCloseTo(1, 2);
  });

  test('controlled: buttons outside, [(activeIndex)] both ways', async ({
    page,
  }) => {
    await page.goto(demo('controlled-carousel-demo'));
    const position = page.getByTestId('position');
    await expect(position).toHaveText('Slide 1 of 5');
    const next = page.getByRole('button', { name: 'Next', exact: true });
    await next.click();
    await expect(position).toHaveText('Slide 2 of 5');
    await expect.poll(() => shown(page)).toEqual(['2 of 5']);
    await page.getByRole('button', { name: 'Show the last slide' }).click();
    await expect.poll(() => shown(page)).toEqual(['5 of 5']);
    await expect(position).toHaveText('Slide 5 of 5');
    await expect(next).toBeDisabled();
  });

  test('plugin: autoplay moves on; Pause stops it and becomes Play', async ({
    page,
  }) => {
    await page.goto(demo('plugin-carousel-demo'));
    const pause = page.getByRole('button', { name: 'Pause' });
    await expect(pause).toBeVisible();
    // Autoplay every 2s.
    await expect
      .poll(() => shown(page), { timeout: 6000 })
      .not.toEqual(['1 of 5']);
    await pause.click();
    const play = page.getByRole('button', { name: 'Play' });
    await expect(play).toBeVisible();
    // Paused mid-scroll, it ends that one: on a slide, then nothing more.
    await expect.poll(() => shown(page)).toHaveLength(1);
    const stopped = await shown(page);
    await page.waitForTimeout(2600);
    expect(await shown(page)).toEqual(stopped);
    await play.click();
    await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
  });

  test('images: loops round, each slide an image named by its alt', async ({
    page,
  }) => {
    await page.goto(demo('images-carousel-demo'));
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
    await page.goto(demo('sizes-carousel-demo'));
    await expect.poll(() => shown(page)).toEqual(['1 of 5', '2 of 5']);
    await page.getByRole('button', { name: 'Next slide' }).click();
    await expect.poll(() => shown(page)).toEqual(['2 of 5', '3 of 5']);
  });

  test('multiple: the buttons hidden on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 700 });
    await page.goto(demo('multiple-carousel-demo'));
    await expect(page.getByRole('group')).toHaveCount(5);
    await expect(page.getByRole('button', { name: 'Next slide' })).toBeHidden();
  });
});

test('Several in view, in the docs on a phone (280px): the carousel in the width it has, not cut by the frame', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/demos/carousel/multiple-carousel-demo');
  // The docs' frame on a phone: 40px a side (their margin and its padding).
  await page.addStyleTag({
    content: 'app-root { padding-inline: 40px !important; }',
  });
  const carousel = page.getByRole('region', { name: 'Several in view' });
  await expect(carousel).toBeVisible();
  const box = await carousel.boundingBox();
  expect(box?.x).toBeGreaterThanOrEqual(40 - 0.5);
  expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(360 - 40 + 0.5);
});

test('Pages: Previous and Next centred on the slides, not on the carousel with its dots under them', async ({
  page,
}) => {
  await page.goto('/demos/carousel/pages-carousel-demo');
  const viewport = page.locator('[scCarouselViewport]');
  await expect(viewport).toBeVisible();
  const middle = async (locator: Locator) => {
    const box = await locator.boundingBox();
    return (box?.y ?? 0) + (box?.height ?? 0) / 2;
  };
  const slides = await middle(viewport);
  for (const button of [
    page.getByRole('button', { name: 'Previous slide' }),
    page.getByRole('button', { name: 'Next slide' }),
  ])
    await expect.poll(() => middle(button)).toBeCloseTo(slides, 0);
});

test('Several in view, on a phone too: two slides side by side, not one big one', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/demos/carousel/multiple-carousel-demo');
  // The docs' frame on a phone: 40px a side (their margin and its padding).
  await page.addStyleTag({
    content: 'app-root { padding-inline: 40px !important; }',
  });
  await expect(
    page.getByRole('region', { name: 'Several in view' }),
  ).toBeVisible();
  await expect.poll(() => shown(page)).toEqual(['1 of 5', '2 of 5']);
});
