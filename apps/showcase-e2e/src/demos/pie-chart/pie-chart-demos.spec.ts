import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/pie-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Pie: a slice per browser; the pointer names it', async ({ page }) => {
  await page.goto(demo('pie'));
  const slices = page.locator('[data-slot=chart-pie] path');
  await expect(slices).toHaveCount(5);
  await slices.nth(1).hover();
  await expect(tooltip(page)).toBeVisible();
  await expect(tooltip(page)).toContainText('Safari');
  await expect(tooltip(page)).toContainText('200');
  await expect(page.locator('[data-slot=chart-legend]')).toContainText(
    'Firefox',
  );
});

test('Donut: its total in the center; the keyboard moves through the slices', async ({
  page,
}) => {
  await page.goto(demo('donut'));
  await expect(page.locator('[data-slot=chart-center]')).toContainText('925');
  await page.getByRole('group', { name: 'Visitors by browser' }).focus();
  await expect(tooltip(page)).toContainText('Chrome');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Other');
});

test('Rings: each series named, its category in the title', async ({
  page,
}) => {
  await page.goto(demo('stacked-pie'));
  await expect(page.locator('[data-slot=chart-pie]')).toHaveCount(2);
  await page.locator('[data-slot=chart-plot]').focus();
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('February');
  await expect(tooltip(page)).toContainText('Desktop');
  await expect(tooltip(page)).toContainText('Mobile');
});

test('Labels: each value beyond its slice', async ({ page }) => {
  await page.goto(demo('label-pie'));
  const labels = page.locator('[data-slot=chart-labels] text');
  await expect(labels).toHaveCount(5);
  await expect(labels.first()).toHaveText('275');
});

test('Entrance: it sweeps round, then its labels come', async ({ page }) => {
  await page.goto(demo('label-pie'));
  const pie = page.locator('[data-slot=chart-pie]').first();
  // Sweeping: part of the circle drawn (narrower than tall), no labels.
  await expect
    .poll(
      () =>
        pie.evaluate((g) => {
          const box = (g as SVGGElement).getBBox();
          return box.width > 0 && box.width < box.height - 1;
        }),
      { intervals: [50] },
    )
    .toBe(true);
  await expect(page.locator('[data-slot=chart-labels] text')).toHaveCount(0);
  // Whole: round, its labels around it.
  await expect(page.locator('[data-slot=chart-labels] text')).toHaveCount(5);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('Entrance: none — whole, labelled, from the start', async ({ page }) => {
    await page.goto(demo('label-pie'));
    const pie = page.locator('[data-slot=chart-pie]').first();
    await expect(page.locator('[data-slot=chart-labels] text')).toHaveCount(5);
    const box = await pie.evaluate((g) => (g as SVGGElement).getBBox());
    expect(Math.round(box.width)).toBe(Math.round(box.height));
  });
});
