import { type Locator, type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box, thumbContrast } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/scroll-area/${name}-scroll-area-demo`;
const root = (page: Page) => page.locator('[scScrollArea]');
const viewport = (page: Page) => page.locator('[scScrollAreaViewport]');
const bar = (page: Page, orientation: 'vertical' | 'horizontal') =>
  page.locator(`[scScrollAreaScrollbar][data-orientation=${orientation}]`);
const scrollTop = (v: Locator) => v.evaluate((el) => el.scrollTop);

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Default scrollbar, as Base UI: hidden at rest, shown over the box and while it scrolls; a track, the thumb 3:1 on it (WCAG 1.4.11), light and dark', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area/scroll-area-usage-demo');
  const scrollbar = bar(page, 'vertical');
  const thumb = page.locator('[scScrollAreaThumb]');
  const opacity = () =>
    scrollbar.evaluate((el) => getComputedStyle(el).opacity);
  await page.mouse.move(0, 0);
  await expect.poll(opacity).toBe('0');
  // Over the box: it fades in.
  await viewport(page).hover();
  await expect.poll(opacity).toBe('1');
  // Its track: a colour of its own, the thumb readable on it.
  await expect(scrollbar).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  expect(await thumbContrast(root(page), thumb)).toBeGreaterThanOrEqual(3);
  // The theme's dark colours: a demo's route follows the class (as qr-code's spec).
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await expect
    .poll(() => thumbContrast(root(page), thumb))
    .toBeGreaterThanOrEqual(3);
  // The pointer away, it hides; scrolling shows it at once.
  await page.mouse.move(0, 0);
  await expect.poll(opacity).toBe('0');
  await viewport(page).evaluate((el) => el.scrollBy(0, 40));
  await expect(scrollbar).toHaveAttribute('data-scrolling', '');
  await expect.poll(opacity).toBe('1');
});

test('Usage: overflows down only; one scrollbar, its thumb as long as the share in view', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area/scroll-area-usage-demo');
  await expect(root(page)).toHaveAttribute('data-has-overflow-y', '');
  await expect(root(page)).not.toHaveAttribute('data-has-overflow-x');
  await expect(root(page)).toHaveAttribute('data-overflow-y-end', '');
  await expect(root(page)).not.toHaveAttribute('data-overflow-y-start');
  await expect(bar(page, 'vertical')).toBeVisible();
  // The native scrollbar hidden: the viewport's content fills its width.
  const share = await viewport(page).evaluate(
    (el) => el.clientHeight / el.scrollHeight,
  );
  const [track, thumb] = [
    await box(bar(page, 'vertical')),
    await box(page.locator('[scScrollAreaThumb]')),
  ];
  expect(Math.abs(thumb.height - (track.height - 2) * share)).toBeLessThan(2);
});

test('Default scrollbar: one vertical scrollbar and its thumb when you write none', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area/scroll-area-usage-demo');
  await expect(page.locator('[scScrollAreaScrollbar]')).toHaveCount(1);
  await expect(bar(page, 'vertical')).toBeVisible();
  await expect(
    bar(page, 'vertical').locator('[scScrollAreaThumb]'),
  ).toHaveCount(1);
});

test('Yours replace the default: the horizontal demo has its scrollbar only, no vertical one', async ({
  page,
}) => {
  await page.goto(demo('horizontal'));
  await expect(bar(page, 'horizontal')).toBeVisible();
  await expect(page.locator('[scScrollAreaScrollbar]')).toHaveCount(1);
  await expect(bar(page, 'vertical')).toHaveCount(0);
});

test('Your own scrollbar: replaces the default; thinner, shown while the pointer is over the box', async ({
  page,
}) => {
  await page.goto(demo('custom'));
  const bars = page.locator('[scScrollAreaScrollbar]');
  await expect(bars).toHaveCount(1);
  // Its classes win over the part's own (cn): 6px, not the default 10px.
  await expect(bars).toHaveCSS('width', '6px');
  await expect(bars).toHaveCSS('opacity', '0');
  await viewport(page).hover();
  await expect(bars).toHaveAttribute('data-hovering', '');
  await expect
    .poll(() => bars.evaluate((el) => getComputedStyle(el).opacity))
    .toBe('1');
});

test('Keyboard: the viewport is a tab stop while it overflows; the arrow keys scroll it', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area/scroll-area-usage-demo');
  const v = viewport(page);
  await expect(v).toHaveAttribute('tabindex', '0');
  await v.focus();
  // Its focus ring (3px, outside it) shows: the root doesn't clip (shadcn's
  // is `relative` only).
  await expect(v).toHaveCSS('box-shadow', /3px/);
  await expect(root(page)).toHaveCSS('overflow', 'visible');
  await press(page, 'End');
  await expect.poll(() => scrollTop(v)).toBeGreaterThan(0);
  await expect(root(page)).toHaveAttribute('data-overflow-y-start', '');
  await expect(root(page)).not.toHaveAttribute('data-overflow-y-end');
});

test('Scrolling: the thumb follows; data-scrolling for a moment', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area/scroll-area-usage-demo');
  const thumb = page.locator('[scScrollAreaThumb]');
  const before = await box(thumb);
  await viewport(page).hover();
  await page.mouse.wheel(0, 300);
  await expect(root(page)).toHaveAttribute('data-scrolling', '');
  await expect.poll(async () => (await box(thumb)).y).toBeGreaterThan(before.y);
  await expect(root(page)).not.toHaveAttribute('data-scrolling');
});

test('Dragging the thumb scrolls; a press on the track jumps there', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area/scroll-area-usage-demo');
  const v = viewport(page);
  const thumb = await box(page.locator('[scScrollAreaThumb]'));
  await page.mouse.move(thumb.x + thumb.width / 2, thumb.y + 5);
  await page.mouse.down();
  await page.mouse.move(thumb.x + thumb.width / 2, thumb.y + 65, {
    steps: 5,
  });
  await page.mouse.up();
  const dragged = await scrollTop(v);
  expect(dragged).toBeGreaterThan(0);
  // The track's bottom: the end.
  const track = await box(bar(page, 'vertical'));
  await page.mouse.click(
    track.x + track.width / 2,
    track.y + track.height - 12,
  );
  await expect
    .poll(() =>
      v.evaluate((el) => el.scrollHeight - el.clientHeight - el.scrollTop),
    )
    .toBeLessThan(2);
});

test('Horizontal: overflows sideways; dragging its thumb scrolls left to right', async ({
  page,
}) => {
  await page.goto(demo('horizontal'));
  await expect(root(page)).toHaveAttribute('data-has-overflow-x', '');
  await expect(root(page)).not.toHaveAttribute('data-has-overflow-y');
  await expect(bar(page, 'horizontal')).toBeVisible();
  const thumb = await box(page.locator('[scScrollAreaThumb]'));
  await page.mouse.move(thumb.x + 5, thumb.y + thumb.height / 2);
  await page.mouse.down();
  await page.mouse.move(thumb.x + 85, thumb.y + thumb.height / 2, { steps: 5 });
  await page.mouse.up();
  await expect
    .poll(() => viewport(page).evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
});

test('Content put in later is measured: a wide row added to the viewport overflows sideways', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area/scroll-area-usage-demo');
  await expect(root(page)).toHaveAttribute('data-has-overflow-y', '');
  await expect(root(page)).not.toHaveAttribute('data-has-overflow-x');
  // A new child of the viewport: neither the viewport nor its first child resizes.
  await viewport(page).evaluate((el) => {
    const row = document.createElement('div');
    row.style.width = '2000px';
    row.style.height = '1px';
    el.append(row);
  });
  await expect(root(page)).toHaveAttribute('data-has-overflow-x', '');
});

test('Both: two scrollbars and the corner between them', async ({ page }) => {
  await page.goto(demo('both'));
  await expect(bar(page, 'vertical')).toBeVisible();
  await expect(bar(page, 'horizontal')).toBeVisible();
  const corner = page.locator('[scScrollAreaCorner]');
  await expect(corner).toBeVisible();
  // The bars stop at the corner.
  const [v, c] = [await box(bar(page, 'vertical')), await box(corner)];
  expect(Math.round(v.y + v.height)).toBeLessThanOrEqual(Math.round(c.y) + 1);
});

test('Scroll fade: the viewport says how far from each edge it is', async ({
  page,
}) => {
  await page.goto(demo('scroll-fade'));
  const v = viewport(page);
  const end = () =>
    v.evaluate((el) =>
      parseFloat(el.style.getPropertyValue('--sc-scroll-area-overflow-y-end')),
    );
  await expect.poll(end).toBeGreaterThan(0);
  await v.evaluate((el) => el.scrollTo({ top: el.scrollHeight }));
  await expect.poll(end).toBe(0);
});

test('RTL: the scrollbar at the end — the left', async ({ page }) => {
  await page.goto(demo('rtl'));
  const [r, b] = [await box(root(page)), await box(bar(page, 'vertical'))];
  expect(Math.round(b.x)).toBeLessThanOrEqual(Math.round(r.x) + 1);
});

test('On a phone, 360px wide: the demos fit; touch scrolls the viewport (no touch-action of ours) @mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const url of [
    '/demos/scroll-area/scroll-area-usage-demo',
    demo('horizontal'),
    demo('both'),
    demo('scroll-fade'),
    demo('rtl'),
    demo('custom'),
  ]) {
    await page.goto(url);
    await expectNoHorizontalScroll(page);
    await expect(viewport(page)).toHaveCSS('touch-action', 'auto');
  }
});
