import { type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/scroll-area-next2/${name}-scroll-area-next2-demo`;
const area = (page: Page) => page.locator('[scScrollAreaNext2]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: overflows down only; the browser’s scrollbar in the preset’s look', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area-next2/scroll-area-next2-usage-demo');
  const a = area(page);
  await expect(a).toHaveAttribute('data-has-overflow-y', '');
  await expect(a).not.toHaveAttribute('data-has-overflow-x');
  await expect(a).toHaveAttribute('data-overflow-y-end', '');
  await expect(a).not.toHaveAttribute('data-overflow-y-start');
  await expect(a).toHaveCSS('overflow-y', 'auto');
  // Chromium draws ::-webkit-scrollbar: no scrollbar-width / -color set.
  await expect(a).toHaveCSS('scrollbar-width', 'auto');
  const thumb = await a.evaluate((el) => {
    const s = getComputedStyle(el, '::-webkit-scrollbar-thumb');
    return { radius: s.borderTopLeftRadius, color: s.backgroundColor };
  });
  expect(thumb.radius).not.toBe('0px');
  expect(thumb.color).not.toBe('rgba(0, 0, 0, 0)');
});

test('Keyboard: a tab stop while it overflows; End scrolls to the bottom', async ({
  page,
}) => {
  await page.goto('/demos/scroll-area-next2/scroll-area-next2-usage-demo');
  const a = area(page);
  await expect(a).toHaveAttribute('tabindex', '0');
  await a.focus();
  await press(page, 'End');
  await expect.poll(() => a.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  await expect(a).toHaveAttribute('data-overflow-y-start', '');
  await expect(a).not.toHaveAttribute('data-overflow-y-end');
});

test('Scrolling: data-scrolling for a moment', async ({ page }) => {
  await page.goto('/demos/scroll-area-next2/scroll-area-next2-usage-demo');
  await area(page).hover();
  await page.mouse.wheel(0, 300);
  await expect(area(page)).toHaveAttribute('data-scrolling', '');
  await expect(area(page)).not.toHaveAttribute('data-scrolling');
});

test('Horizontal: overflows sideways only', async ({ page }) => {
  await page.goto(demo('horizontal'));
  await expect(area(page)).toHaveAttribute('data-has-overflow-x', '');
  await expect(area(page)).not.toHaveAttribute('data-has-overflow-y');
});

test('Both ways: overflows both ways', async ({ page }) => {
  await page.goto(demo('both'));
  await expect(area(page)).toHaveAttribute('data-has-overflow-x', '');
  await expect(area(page)).toHaveAttribute('data-has-overflow-y', '');
});

test('Scroll fade: it says how far from each edge it is', async ({ page }) => {
  await page.goto(demo('scroll-fade'));
  const a = area(page);
  const end = () =>
    a.evaluate((el) =>
      parseFloat(el.style.getPropertyValue('--scroll-area-overflow-y-end')),
    );
  await expect.poll(end).toBeGreaterThan(0);
  await a.evaluate((el) => el.scrollTo({ top: el.scrollHeight }));
  await expect.poll(end).toBe(0);
});

test('RTL: its content runs from the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const a = area(page);
  await expect(a).toHaveAttribute('data-has-overflow-y', '');
  // The content's start is at the right: the box's text runs right to left.
  const [box1, text] = [await box(a), await box(a.getByText('العلامات'))];
  expect(box1.x + box1.width - (text.x + text.width)).toBeLessThan(
    box1.width / 2,
  );
});
