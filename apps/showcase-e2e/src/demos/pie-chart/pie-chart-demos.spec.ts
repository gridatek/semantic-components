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
  await expect(tooltip(page)).toHaveAttribute('data-state', 'open');
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
