import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/frame/${name}-frame-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a ring round a plain box, the preset’s corners', async ({
  page,
}) => {
  await page.goto('/demos/frame/frame-usage-demo');
  const frame = page.locator('[scFrame]');
  // nova: the card's rounded-xl and its ring (a box-shadow).
  await expect(frame).toHaveCSS('border-top-left-radius', '14px');
  await expect(frame).not.toHaveCSS('box-shadow', 'none');
});

test('Aspect Ratio: the photo clipped to the frame’s corners', async ({
  page,
}) => {
  await page.goto(demo('aspect-ratio'));
  const frame = page.locator('[scFrame]');
  await expect(frame).toHaveCSS('overflow', 'hidden');
  const [f, i] = [
    await box(frame),
    await box(page.getByRole('img', { name: 'A rocky coast' })),
  ];
  expect(i.width).toBeCloseTo(f.width, 0);
  expect(f.width / f.height).toBeCloseTo(16 / 9, 1);
});

test('Table: framed, and the container still scrolls sideways', async ({
  page,
}) => {
  await page.goto(demo('table'));
  const frame = page.locator('[scFrame]');
  await expect(frame).toHaveCSS('overflow-x', 'auto');
  await expect(frame).not.toHaveCSS('box-shadow', 'none');
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const url of [
    '/demos/frame/frame-usage-demo',
    demo('aspect-ratio'),
    demo('table'),
  ]) {
    await page.goto(url);
    await expectNoHorizontalScroll(page);
  }
});
