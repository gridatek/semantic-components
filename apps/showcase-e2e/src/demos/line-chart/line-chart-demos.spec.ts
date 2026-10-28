import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/line-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Line: a dot on each month; the keyboard moves through them', async ({
  page,
}) => {
  await page.goto(demo('line'));
  await expect(page.locator('[data-slot=chart-line] circle')).toHaveCount(6);
  await page
    .getByRole('group', { name: 'Desktop visitors, January to June' })
    .focus();
  await expect(tooltip(page)).toContainText('186');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('305');
});

test('Two lines: a legend; the tooltip has both', async ({ page }) => {
  await page.goto(demo('multiple-line'));
  await expect(page.locator('[data-slot=chart-legend]')).toHaveText(
    /Desktop\s*Mobile/,
  );
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('Desktop');
  await expect(tooltip(page)).toContainText('Mobile');
});
