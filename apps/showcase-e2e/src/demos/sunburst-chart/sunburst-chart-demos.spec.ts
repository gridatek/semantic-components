import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/sunburst-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Sunburst: groups inside, countries around; the pointer names them', async ({
  page,
}) => {
  await page.goto(demo('sunburst'));
  const slices = page.locator('[data-slot=chart-sunburst] path');
  await expect(slices).toHaveCount(10);
  await slices.nth(3 + 3).hover();
  await expect(tooltip(page)).toHaveAttribute('data-state', 'open');
  await expect(tooltip(page)).toContainText('USA');
  await expect(tooltip(page)).toContainText('320');
  await expect(page.locator('[data-slot=chart-legend]')).toContainText(
    'Europe',
  );
});

test('Labels: each country beyond its slice; the keyboard moves through them', async ({
  page,
}) => {
  await page.goto(demo('label-sunburst'));
  const labels = page.locator('[data-slot=chart-labels] text');
  await expect(labels).toHaveCount(5);
  await expect(labels.first()).toHaveText('France');
  await page.locator('[data-slot=chart-plot]').focus();
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Japan');
});
