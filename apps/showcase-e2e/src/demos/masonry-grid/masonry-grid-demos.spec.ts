import { type Locator, type Page, expect, test } from '@playwright/test';

const demo = (name: string) => `/demos/masonry-grid/${name}-masonry-grid-demo`;

// The widths the column counts below are worked out for.
test.use({ viewport: { width: 760, height: 900 } });

/** Each item's box, rounded: where the grid put it. */
const boxes = (items: Locator) =>
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
const items = (page: Page, grid = 0) =>
  page
    .locator('[data-slot="masonry-grid"]')
    .nth(grid)
    .locator('[data-slot="masonry-grid-item"]');

test('Photos: a list; the first row in source order, left to right', async ({
  page,
}) => {
  await page.goto(demo('photos'));
  await expect(page.getByRole('list').getByRole('listitem')).toHaveCount(8);
  // 760 px wide, columns of at least 200: three.
  await expect
    .poll(async () => (await boxes(items(page))).slice(0, 3).map((b) => b.y))
    .toEqual(expect.arrayContaining([expect.any(Number)]));
  const [a, b, c] = await boxes(items(page));
  expect(a.y).toBe(b.y);
  expect(b.y).toBe(c.y);
  expect(a.x).toBeLessThan(b.x);
  expect(b.x).toBeLessThan(c.x);
});

test('Cards: the first spans two columns; laid out again when one grows', async ({
  page,
}) => {
  await page.goto(demo('cards'));
  await expect(items(page)).toHaveCount(8);
  await expect
    .poll(async () => (await boxes(items(page)))[1].w)
    .toBeGreaterThan(100);
  const [first, second] = await boxes(items(page));
  // Two columns and a gap.
  expect(first.w).toBeGreaterThan(second.w * 2);
  // Groceries grows: laid out again, nothing overlaps it.
  await items(page)
    .first()
    .evaluate((element) => ((element as HTMLElement).style.height = '300px'));
  await expect.poll(() => overlaps(page)).toBe(0);
  expect((await boxes(items(page)))[0].h).toBe(300);
});

/** How many pairs of items overlap: none, laid out. */
const overlaps = async (page: Page) => {
  const all = await boxes(items(page));
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

test('Load more: items added and removed, the others placed again', async ({
  page,
}) => {
  await page.goto(demo('more'));
  await expect(items(page)).toHaveCount(6);
  await page.getByRole('button', { name: 'Load more' }).click();
  await expect(items(page)).toHaveCount(10);
  // Every item placed: none left at the grid's corner but the first ones.
  await expect
    .poll(
      async () =>
        new Set((await boxes(items(page))).map((b) => `${b.x},${b.y}`)).size,
    )
    .toBe(10);
  const firstX = (await boxes(items(page)))[1].x;
  await page.getByRole('button', { name: 'Remove the first' }).click();
  await expect(items(page)).toHaveCount(9);
  // What was second is now first: at the start.
  await expect
    .poll(async () => (await boxes(items(page)))[0].x)
    .toBeLessThan(firstX);
});

test('Order: shortest column, or in turn', async ({ page }) => {
  await page.goto(demo('order'));
  await expect(items(page, 1)).toHaveCount(9);
  // Four columns each. In turn, 5 goes under 1; shortest, under 2 (the short one).
  await expect
    .poll(async () => (await boxes(items(page, 1)))[4].x)
    .toBe((await boxes(items(page, 1)))[0].x);
  const shortest = await boxes(items(page, 0));
  expect(shortest[4].x).toBe(shortest[1].x);
  expect(shortest[4].y).toBeGreaterThan(shortest[1].y);
});

test('Right to left: from the right', async ({ page }) => {
  await page.goto(demo('order'));
  await expect(items(page, 1)).toHaveCount(9);
  await page.evaluate(() =>
    document.documentElement.setAttribute('dir', 'rtl'),
  );
  await expect
    .poll(async () => {
      const [a, b] = await boxes(items(page, 1));
      return a.x > b.x;
    })
    .toBe(true);
});
