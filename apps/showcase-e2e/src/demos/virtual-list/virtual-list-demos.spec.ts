import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/virtual-list/${name}-virtual-list-demo`;
const list = (page: Page) => page.locator('[data-slot="virtual-list"]');
const rows = (page: Page) => page.locator('[data-slot="virtual-list-row"]');
const row = (page: Page, index: number) =>
  page.locator(`[data-slot="virtual-list-row"][data-index="${index}"]`);
/** Each rendered row's box, in order. */
const boxes = (page: Page) =>
  rows(page).evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      return {
        index: Number((el as HTMLElement).dataset['index']),
        top: r.top,
        bottom: r.bottom,
        left: r.left,
        right: r.right,
        width: r.width,
      };
    }),
  );

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: a few rendered of 10,000; the right ones, deep down', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await expect(row(page, 0)).toBeVisible();
  expect(await rows(page).count()).toBeLessThan(30);
  await expect(row(page, 0)).toHaveAttribute('aria-setsize', '10000');
  await expect(row(page, 0)).toHaveAttribute('aria-posinset', '1');
  const height = await list(page).evaluate((el) => el.scrollHeight);
  expect(height).toBeGreaterThan(500_000);

  await list(page).evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await expect(row(page, 9999)).toBeVisible();
  await expect(row(page, 9999)).toContainText('Radia 10000');
  await expect(row(page, 9999)).toHaveAttribute('aria-posinset', '10000');
  expect(await rows(page).count()).toBeLessThan(30);
});

test('Basic: the focused row stays rendered while scrolled away', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await row(page, 0).focus();
  await list(page).evaluate((el) => {
    el.scrollTop = 200_000;
  });
  await expect
    .poll(async () => Math.max(...(await boxes(page)).map((b) => b.index)))
    .toBeGreaterThan(3000);
  await expect(row(page, 0)).toBeFocused();
});

test('Variable heights: measured, never overlapping; the place kept', async ({
  page,
}) => {
  await page.goto(demo('variable'));
  await expect(row(page, 0)).toBeVisible();
  const heights = new Set(
    (await boxes(page)).map((b) => Math.round(b.bottom - b.top)),
  );
  expect(heights.size).toBeGreaterThan(1);

  await list(page).evaluate((el) => {
    el.scrollTop = 60_000;
  });
  await expect.poll(async () => (await boxes(page)).length).toBeGreaterThan(3);
  // In order, each below the last (8 px apart).
  await expect
    .poll(async () => {
      const b = (await boxes(page)).sort((x, y) => x.index - y.index);
      return b.every((box, i) => i === 0 || box.top >= b[i - 1].bottom + 7);
    })
    .toBe(true);

  // Scrolling up measures rows above: the one being read does not move.
  await settled(page);
  const reading = (await boxes(page)).sort((x, y) => x.index - y.index)[6];
  await list(page).evaluate((el) => el.scrollBy(0, -400));
  await settled(page);
  await list(page).evaluate((el) => el.scrollBy(0, 400));
  await settled(page);
  const now = (await boxes(page)).find((b) => b.index === reading.index);
  expect(Math.abs((now?.top ?? Infinity) - reading.top)).toBeLessThan(3);
});

/** Waits until the rendered rows hold still: measured, and placed. */
async function settled(page: Page): Promise<void> {
  let last = '';
  await expect
    .poll(
      async () => {
        const now = JSON.stringify(await boxes(page));
        const same = now === last;
        last = now;
        return same;
      },
      { intervals: [150] },
    )
    .toBe(true);
}

test('Horizontal: along, to the last day; right to left from the right', async ({
  page,
}) => {
  await page.goto(demo('horizontal'));
  await expect(row(page, 0)).toBeVisible();
  const width = await list(page).evaluate((el) => el.scrollWidth);
  expect(width).toBeGreaterThan(365 * 96);
  await list(page).evaluate((el) => {
    el.scrollLeft = el.scrollWidth;
  });
  await expect(row(page, 364)).toBeVisible();

  await page.goto(demo('horizontal'));
  await page.evaluate(() =>
    document.documentElement.setAttribute('dir', 'rtl'),
  );
  await list(page).evaluate((el) => el.dispatchEvent(new Event('scroll')));
  const box = await list(page).boundingBox();
  await expect
    .poll(async () => (await row(page, 0).boundingBox())?.x ?? 0)
    .toBeGreaterThan((box?.x ?? 0) + (box?.width ?? 0) - 120);
});

test('Grid: three lanes of equal width', async ({ page }) => {
  await page.goto(demo('grid'));
  await expect(row(page, 0)).toBeVisible();
  const b = await boxes(page);
  const lefts = new Set(b.map((box) => Math.round(box.left)));
  expect(lefts.size).toBe(3);
  const widths = new Set(b.map((box) => Math.round(box.width)));
  expect(widths.size).toBe(1);
});

test('Page scroll: the page scrolls, the list follows', async ({ page }) => {
  await page.goto(demo('page'));
  await expect(row(page, 0)).toBeVisible();
  const overflow = await list(page).evaluate(
    (el) => getComputedStyle(el).overflowY,
  );
  expect(overflow).toBe('visible');
  await page.evaluate(() => window.scrollTo(0, 80_000));
  await expect
    .poll(async () => (await boxes(page))[0]?.index ?? 0)
    .toBeGreaterThan(1500);
  await expect(row(page, 0)).toHaveCount(0);
});

test('Scroll to: start, centre, end, auto', async ({ page }) => {
  await page.goto(demo('scroll'));
  await expect(row(page, 0)).toBeVisible();
  const view = (await list(page).boundingBox()) ?? {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  const target = row(page, 4999);
  const at = async () => (await target.boundingBox()) ?? { y: -1, height: 0 };

  await page.getByRole('button', { name: 'Row 5,000: start' }).click();
  await expect
    .poll(async () => Math.abs((await at()).y - view.y - 1))
    .toBeLessThan(3);
  await page.getByRole('button', { name: 'Row 5,000: end' }).click();
  await expect
    .poll(async () => {
      const r = await at();
      return Math.abs(r.y + r.height - (view.y + view.height - 1));
    })
    .toBeLessThan(3);
  await page.getByRole('button', { name: 'Row 5,000: center' }).click();
  await expect
    .poll(async () => {
      const r = await at();
      return Math.abs(r.y + r.height / 2 - (view.y + view.height / 2));
    })
    .toBeLessThan(3);
  // Auto: already in view, it stays.
  const before = (await at()).y;
  await page.getByRole('button', { name: 'Row 5,000: auto' }).click();
  await expect
    .poll(async () => Math.abs((await at()).y - before))
    .toBeLessThan(2);

  await page.getByRole('button', { name: 'Back to the top' }).click();
  await expect(row(page, 0)).toBeVisible();
});

test('With the infinite scroll: 100 more near the end', async ({ page }) => {
  await page.goto(demo('infinite'));
  await expect(row(page, 0)).toBeVisible();
  await expect(row(page, 0)).toHaveAttribute('aria-setsize', '100');
  await page.getByRole('region', { name: 'Feed' }).evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await expect(rows(page).first()).toHaveAttribute('aria-setsize', /^[2-9]00$/);
  expect(await rows(page).count()).toBeLessThan(40);
});
