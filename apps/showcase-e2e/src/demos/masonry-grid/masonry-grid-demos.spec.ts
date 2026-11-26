import { collectErrors } from '../../interaction';
import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/masonry-grid/${name}-masonry-grid-demo`;

// The widths the column counts below are worked out for.
test.use({ viewport: { width: 760, height: 900 } });

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Each item's box, rounded: where the grid put it. */
const boxes = (items: Locator): Promise<Box[]> =>
  items.evaluateAll((elements) =>
    elements.map((element) => {
      const r = element.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    }),
  );
const grid = (page: Page, nth = 0) =>
  page.locator('[data-slot="masonry-grid"]').nth(nth);
const items = (page: Page, nth = 0) =>
  grid(page, nth).locator('[data-slot="masonry-grid-item"]');

/** How many pairs of items overlap: none, laid out. */
const overlaps = async (page: Page, nth = 0) => {
  const all = await boxes(items(page, nth));
  let count = 0;
  all.forEach((a, i) =>
    all.slice(i + 1).forEach((b) => {
      const across = a.x < b.x + b.w && b.x < a.x + a.w;
      const down = a.y < b.y + b.h && b.y < a.y + a.h;
      count += Number(across && down);
    }),
  );
  return count;
};

/** Laid out by us: the grid takes its items out of the flow. */
const laidOut = (page: Page, nth = 0) =>
  expect
    .poll(() => grid(page, nth).evaluate((g: HTMLElement) => g.style.display))
    .toBe('block');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: three columns; the first row in source order; packed', async ({
  page,
}) => {
  await page.goto('/demos/masonry-grid/masonry-grid-usage-demo');
  await expect(page.getByRole('list').getByRole('listitem')).toHaveCount(8);
  await laidOut(page);
  const [a, b, c, d] = await boxes(items(page));
  // 760px wide, columns of at least 200: three.
  expect(a.y).toBe(b.y);
  expect(b.y).toBe(c.y);
  expect(a.x).toBeLessThan(b.x);
  expect(b.x).toBeLessThan(c.x);
  // The fourth: under the shortest of the first three.
  const shortest = [a, b, c].reduce((s, x) => (x.h < s.h ? x : s));
  expect(d.x).toBe(shortest.x);
  expect(await overlaps(page)).toBe(0);
});

test('Cards: the first spans two columns; laid out again when one grows', async ({
  page,
}) => {
  await page.goto(demo('cards'));
  await expect(items(page)).toHaveCount(8);
  await laidOut(page);
  const [first, second] = await boxes(items(page));
  // Two columns and a gap.
  expect(first.w).toBeGreaterThan(second.w * 2);
  await items(page)
    .first()
    .evaluate((element: HTMLElement) => {
      element.style.height = '300px';
    });
  await expect.poll(() => overlaps(page)).toBe(0);
  expect((await boxes(items(page)))[0].h).toBe(300);
});

test('Load more: items added and removed, the others placed again', async ({
  page,
}) => {
  await page.goto(demo('more'));
  await expect(items(page)).toHaveCount(6);
  await laidOut(page);
  await page.getByRole('button', { name: 'Load more' }).click();
  await expect(items(page)).toHaveCount(10);
  await expect
    .poll(
      async () =>
        new Set((await boxes(items(page))).map((b) => `${b.x},${b.y}`)).size,
    )
    .toBe(10);
  const secondX = (await boxes(items(page)))[1].x;
  await page.getByRole('button', { name: 'Remove the first' }).click();
  await expect(items(page)).toHaveCount(9);
  // What was second is now first: at the start.
  await expect
    .poll(async () => (await boxes(items(page)))[0].x)
    .toBeLessThan(secondX);
  await expect.poll(() => overlaps(page)).toBe(0);
});

test('Order: the shortest column — level ones, the first; or in turn', async ({
  page,
}) => {
  await page.goto(demo('order'));
  await expect(items(page, 1)).toHaveCount(9);
  await laidOut(page, 0);
  await laidOut(page, 1);
  // Four columns each. Sequential: 5 under 1, 9 under 5.
  const turn = await boxes(items(page, 1));
  expect(turn[4].x).toBe(turn[0].x);
  expect(turn[8].x).toBe(turn[0].x);
  // Shortest: 5 under 2 (the short one).
  const shortest = await boxes(items(page, 0));
  expect(shortest[4].x).toBe(shortest[1].x);
  expect(shortest[4].y).toBeGreaterThan(shortest[1].y);
  // 8: column 1 ends 12px below column 3 — within 1em: the first, column 1.
  expect(shortest[7].x).toBe(shortest[0].x);
});

test('Columns and gaps: at most three; the gaps from the classes', async ({
  page,
}) => {
  await page.goto(demo('columns'));
  await expect(items(page)).toHaveCount(9);
  await laidOut(page);
  // Polled: a later layout (Firefox lays out again as sizes settle) moves the
  // items with a transition — read once they're there.
  await expect
    .poll(async () => {
      const all = await boxes(items(page));
      const [a, b] = all;
      const under = all.find((x, i) => i > 0 && x.x === a.x);
      return {
        columns: new Set(all.map((box) => box.x)).size,
        // gap-x-6: 24px across.
        across: b.x - (a.x + a.w),
        // gap-y-2: 8px down, under the first.
        down: (under?.y ?? 0) - (a.y + a.h),
      };
    })
    .toEqual({ columns: 3, across: 24, down: 8 });
});

test('RTL: the first column on the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  await expect(items(page)).toHaveCount(9);
  await laidOut(page);
  const [a, b] = await boxes(items(page));
  expect(a.x).toBeGreaterThan(b.x);
  const g = await grid(page).boundingBox();
  // Flush with the right edge.
  expect(Math.abs(a.x + a.w - ((g?.x ?? 0) + (g?.width ?? 0)))).toBeLessThan(2);
  expect(await overlaps(page)).toBe(0);
});
