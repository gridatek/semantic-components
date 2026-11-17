import { type Locator } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { expectScrollbarWidth, expectStyledScrollbar } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/scrollbar/${name}-scrollbar-demo`;

/** The thumb that scrollbar.css draws, in Chromium (its pseudo-element). */
const thumb = (box: Locator) =>
  box.evaluate((el) => {
    const s = getComputedStyle(el, '::-webkit-scrollbar-thumb');
    return {
      color: s.backgroundColor,
      radius: s.borderTopLeftRadius,
      width: getComputedStyle(el, '::-webkit-scrollbar').width,
    };
  });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a plain box that scrolls has the styled scrollbar; a tab stop that scrolls by the keyboard', async ({
  page,
}) => {
  await page.goto('/demos/scrollbar/scrollbar-usage-demo');
  const box = page.getByRole('region', { name: 'Tags' });
  await expectStyledScrollbar(box);
  await box.focus();
  await page.keyboard.press('End');
  await expect
    .poll(() => box.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
});

test('Tuning: the variables on a box change its scrollbar only', async ({
  page,
  browserName,
}) => {
  await page.goto(demo('tuning'));
  const [primary, square, wide] = ['Primary', 'Square', 'Wide, tracked'].map(
    (name) => page.getByRole('region', { name }),
  );
  for (const box of [primary, square, wide]) await expectStyledScrollbar(box);
  test.skip(browserName !== 'chromium', 'the thumb is read in Chromium only');
  const primaryColor = await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.style.color = 'var(--color-primary)';
    document.body.append(probe);
    const c = getComputedStyle(probe).color;
    probe.remove();
    return c;
  });
  await expect
    .poll(async () => (await thumb(primary)).color)
    .toBe(primaryColor);
  await expect.poll(async () => (await thumb(square)).radius).toBe('0px');
  await expect.poll(async () => (await thumb(wide)).width).toBe('14px');
});

test('Opting out: hidden, its room kept, or the browser’s own bar', async ({
  page,
}) => {
  await page.goto(demo('opting-out'));
  const box = (name: string) => page.getByRole('region', { name });
  await expectScrollbarWidth(box('Hidden'), 'none');
  await expect(box('Room kept')).toHaveCSS('scrollbar-gutter', 'stable');
  await expectScrollbarWidth(box("The browser's, thin"), 'thin');
});

test('On a phone, 360px wide: the demos fit @mobile', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const url of [
    '/demos/scrollbar/scrollbar-usage-demo',
    demo('tuning'),
    demo('opting-out'),
  ]) {
    await page.goto(url);
    await expectNoHorizontalScroll(page);
  }
});
