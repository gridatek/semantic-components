import { type Locator, type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/scroll-area-next/${name}-scroll-area-next-demo`;
const root = (page: Page) => page.locator('[scScrollAreaNext]');
const viewport = (page: Page) => page.locator('[scScrollAreaNextViewport]');
const bar = (page: Page, orientation: 'vertical' | 'horizontal') =>
  page.locator(`[scScrollAreaNextScrollbar][data-orientation=${orientation}]`);
const scrollTop = (v: Locator) => v.evaluate((el) => el.scrollTop);

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: overflows down only; one scrollbar, its thumb as long as the share in view', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area-next/scroll-area-next-usage-demo');
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
    await box(page.locator('[scScrollAreaNextThumb]')),
  ];
  expect(Math.abs(thumb.height - (track.height - 2) * share)).toBeLessThan(2);
});

test('Keyboard: the viewport is a tab stop while it overflows; the arrow keys scroll it', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area-next/scroll-area-next-usage-demo');
  const v = viewport(page);
  await expect(v).toHaveAttribute('tabindex', '0');
  await v.focus();
  await press(page, 'End');
  await expect.poll(() => scrollTop(v)).toBeGreaterThan(0);
  await expect(root(page)).toHaveAttribute('data-overflow-y-start', '');
  await expect(root(page)).not.toHaveAttribute('data-overflow-y-end');
});

test('Scrolling: the thumb follows; data-scrolling for a moment', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area-next/scroll-area-next-usage-demo');
  const thumb = page.locator('[scScrollAreaNextThumb]');
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
  await page.goto('/demos/scroll-area-next/scroll-area-next-usage-demo');
  const v = viewport(page);
  const thumb = await box(page.locator('[scScrollAreaNextThumb]'));
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
  const thumb = await box(page.locator('[scScrollAreaNextThumb]'));
  await page.mouse.move(thumb.x + 5, thumb.y + thumb.height / 2);
  await page.mouse.down();
  await page.mouse.move(thumb.x + 85, thumb.y + thumb.height / 2, { steps: 5 });
  await page.mouse.up();
  await expect
    .poll(() => viewport(page).evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
});

test('Both: two scrollbars and the corner between them', async ({ page }) => {
  await page.goto(demo('both'));
  await expect(bar(page, 'vertical')).toBeVisible();
  await expect(bar(page, 'horizontal')).toBeVisible();
  const corner = page.locator('[scScrollAreaNextCorner]');
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
      parseFloat(el.style.getPropertyValue('--scroll-area-overflow-y-end')),
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
