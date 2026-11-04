import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/aspect-ratio/${name}-aspect-ratio-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

/** Width over height of the part. */
async function ratioOf(page: import('@playwright/test').Page) {
  const b = await box(page.locator('[scAspectRatio]'));
  return b.width / b.height;
}

test('Usage: 16 / 9, through --ratio; the image fills it', async ({ page }) => {
  await page.goto('/demos/aspect-ratio/aspect-ratio-usage-demo');
  const part = page.locator('[scAspectRatio]');
  await expect(part).toHaveCSS('--ratio', /1\.77/);
  expect(await ratioOf(page)).toBeCloseTo(16 / 9, 1);
  const [p, i] = [
    await box(part),
    await box(page.getByRole('img', { name: 'A forest path' })),
  ];
  expect(i.width).toBeCloseTo(p.width, 0);
  expect(i.height).toBeCloseTo(p.height, 0);
});

test('Square and Portrait: 1 and 9 / 16', async ({ page }) => {
  await page.goto(demo('square'));
  expect(await ratioOf(page)).toBeCloseTo(1, 1);
  await page.goto(demo('portrait'));
  expect(await ratioOf(page)).toBeCloseTo(9 / 16, 1);
});

test('Video: the video fills its 16 / 9 frame', async ({ page }) => {
  await page.goto(demo('video'));
  expect(await ratioOf(page)).toBeCloseTo(16 / 9, 1);
  const [p, v] = [
    await box(page.locator('[scAspectRatio]')),
    await box(page.locator('video')),
  ];
  expect(v.width).toBeCloseTo(p.width, 0);
});

test('Responsive: 16 / 9 on a wide screen', async ({ page }) => {
  await page.goto(demo('responsive'));
  expect(await ratioOf(page)).toBeCloseTo(16 / 9, 1);
});

test('RTL: the same ratio, the caption from the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  expect(await ratioOf(page)).toBeCloseTo(16 / 9, 1);
  await expectRtl(page.locator('figcaption'));
});

test('On a phone: Responsive turns square (a class over the ratio); the demos fit @mobile', async ({
  page,
}) => {
  await page.goto(demo('responsive'));
  expect(await ratioOf(page)).toBeCloseTo(1, 1);
  for (const name of ['square', 'portrait', 'video', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
