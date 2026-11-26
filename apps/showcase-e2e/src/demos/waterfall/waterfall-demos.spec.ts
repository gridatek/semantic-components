import { collectErrors, focus, press, type } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/waterfall/${name}-demo`;
const rows = (page: Page) => page.locator('[data-slot=waterfall-row]');
const row = (page: Page, label: string) =>
  rows(page).filter({
    has: page.getByRole('rowheader', { name: label, exact: true }),
  });
const picked = (page: Page) => page.getByTestId('picked');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('waterfall-usage'));
    await expect(rows(page)).toHaveCount(6);
  });

  test('a named tree grid; each bar read as its times', async ({ page }) => {
    await expect(
      page.getByRole('treegrid', { name: 'Network requests' }),
    ).toBeVisible();
    await expect(
      row(page, 'index.html').locator('[data-slot=waterfall-bar]'),
    ).toHaveAttribute('aria-label', '0–180 ms, 14 kB');
    await expect(row(page, 'index.html')).toHaveAttribute('aria-level', '1');
  });

  test('bars a share of the range; the axis and the mark', async ({ page }) => {
    // The range: 0 to 1120 (the last end).
    await expect(
      row(page, 'main.js').locator('[data-slot=waterfall-bar]'),
    ).toHaveAttribute('style', /--sc-waterfall-start: 17\.857/);
    await expect(page.locator('[data-slot=waterfall-tick]')).toHaveText([
      '0 ms',
      '500 ms',
      '1,000 ms',
    ]);
    await expect(page.locator('[data-slot=waterfall-mark]')).toHaveAttribute(
      'style',
      /--sc-waterfall-mark: 55\.357/,
    );
  });
});

test.describe('Nested spans', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('nested-waterfall'));
    await expect(rows(page)).toHaveCount(1);
  });

  test('→ opens and goes in; ← closes, then goes to the parent', async ({
    page,
  }) => {
    const top = row(page, 'POST /checkout');
    await focus(top);
    await expect(top).toHaveAttribute('aria-expanded', 'false');
    await press(page, 'ArrowRight');
    await expect(top).toHaveAttribute('aria-expanded', 'true');
    await expect(rows(page)).toHaveCount(5);
    await press(page, 'ArrowRight');
    await expect(row(page, 'auth.verify')).toBeFocused();
    await press(page, 'ArrowDown');
    await press(page, 'ArrowRight');
    await expect(rows(page)).toHaveCount(7);
    await expect(row(page, 'db.query carts')).toHaveAttribute(
      'aria-level',
      '3',
    );
    await press(page, 'ArrowLeft');
    await expect(rows(page)).toHaveCount(5);
    await press(page, 'ArrowLeft');
    await expect(top).toBeFocused();
  });

  test('typing finds a span; Enter selects it', async ({ page }) => {
    await focus(row(page, 'POST /checkout'));
    await press(page, 'ArrowRight');
    await type(page, 'p');
    await expect(row(page, 'payment.charge')).toBeFocused();
    await press(page, 'Enter');
    await expect(row(page, 'payment.charge')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(picked(page)).toHaveText('payment · 1 open');
  });

  test('the chevron opens without selecting; expand and collapse all', async ({
    page,
  }) => {
    await row(page, 'POST /checkout')
      .locator('[data-slot=waterfall-indicator]')
      .click();
    await expect(rows(page)).toHaveCount(5);
    await expect(picked(page)).toHaveText('None · 1 open');
    await page.getByRole('button', { name: 'Expand all' }).click();
    await expect(rows(page)).toHaveCount(8);
    await page.getByRole('button', { name: 'Collapse all' }).click();
    await expect(rows(page)).toHaveCount(1);
  });
});

test('Zoom: the range changes, the ticks follow', async ({ page }) => {
  await page.goto(demo('zoom-waterfall'));
  await expect(page.locator('[data-slot=waterfall-tick]').first()).toHaveText(
    '0 ms',
  );
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(page.locator('[data-slot=waterfall-tick]')).toHaveText([
    '400 ms',
    '600 ms',
    '800 ms',
  ]);
  // Before the range: held to its start, no width.
  await expect(
    row(page, 'Resolve route').locator('[data-slot=waterfall-bar]'),
  ).toHaveAttribute('style', /--sc-waterfall-size: 0%/);
});

test('Large trace: closed, a row per job; Page Down moves ten', async ({
  page,
}) => {
  await page.goto(demo('large-waterfall'));
  await expect(rows(page)).toHaveCount(400);
  await focus(row(page, 'Job 1'));
  await press(page, 'PageDown');
  await expect(row(page, 'Job 11')).toBeFocused();
  await press(page, 'End');
  await expect(row(page, 'Job 400')).toBeFocused();
});

test('RTL: ← opens, the bars from the right', async ({ page }) => {
  await page.goto(demo('rtl-waterfall'));
  const top = row(page, 'الصفحة');
  await focus(top);
  await press(page, 'ArrowLeft');
  await expect(top).toHaveAttribute('aria-expanded', 'true');
  const bar = await row(page, 'الصورة')
    .locator('[data-slot=waterfall-bar-fill]')
    .boundingBox();
  const cell = await row(page, 'الصورة')
    .locator('[data-slot=waterfall-bar]')
    .boundingBox();
  // Ends at the range's end: the cell's left edge.
  expect(Math.abs((bar?.x ?? 0) - (cell?.x ?? 0))).toBeLessThan(1);
});

test('In the docs on a phone (280px): the waterfall in the width it has, scrolling sideways — the timeline reached, its rows whole', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(demo('waterfall-usage'));
  // The docs' frame on a phone: 40px a side (their margin and its padding).
  await page.addStyleTag({
    content: 'app-root { padding-inline: 40px !important; }',
  });
  const waterfall = page.getByRole('treegrid');
  await expect(waterfall).toBeVisible();
  // Its box: the waterfall's scroll container, in the 280px it has.
  const box = waterfall.locator('xpath=..');
  const b = await box.boundingBox();
  expect((b?.x ?? 0) + (b?.width ?? 0)).toBeLessThanOrEqual(360 - 40 + 0.5);
  // Scrolled to its end: the timeline's header in sight, and every row as
  // long as the waterfall (its lines and hover not cut where it scrolls).
  await box.evaluate((el) => (el.scrollLeft = el.scrollWidth));
  const timeline = waterfall.getByRole('columnheader', { name: 'Timeline' });
  await expect
    .poll(async () => {
      const [t, s] = [await timeline.boundingBox(), await box.boundingBox()];
      return (
        (t?.x ?? 0) + (t?.width ?? 0) <= (s?.x ?? 0) + (s?.width ?? 0) + 0.5
      );
    })
    .toBe(true);
  const short = await waterfall.evaluate(
    (grid) =>
      [...grid.querySelectorAll('[role=row]')].filter(
        (row) => row.getBoundingClientRect().width < grid.scrollWidth - 0.5,
      ).length,
  );
  expect(short).toBe(0);
});

test('On a phone, a narrow axis: a mark’s text cut to the room on its side of its line, inside the axis — not over the Size column', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(demo('waterfall-usage'));
  await page.addStyleTag({
    content: 'app-root { padding-inline: 40px !important; }',
  });
  const axis = page.locator('[data-slot=waterfall-axis]');
  const mark = page.locator('[data-slot=waterfall-mark]');
  await expect(mark).toBeVisible();
  const [a, m] = [await axis.boundingBox(), await mark.boundingBox()];
  expect(m?.x).toBeGreaterThanOrEqual((a?.x ?? 0) - 0.5);
  expect((m?.x ?? 0) + (m?.width ?? 0)).toBeLessThanOrEqual(
    (a?.x ?? 0) + (a?.width ?? 0) + 0.5,
  );
});
