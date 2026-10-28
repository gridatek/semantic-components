import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/area-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Area: the keyboard moves through the months; the tooltip says them', async ({
  page,
}) => {
  await page.goto(demo('area'));
  const plot = page.getByRole('group', {
    name: 'Desktop visitors, January to June',
  });
  await expect(
    page.locator('[data-slot=chart-area] path').first(),
  ).toHaveAttribute('d', /^M/);
  await expect(tooltip(page)).toHaveAttribute('data-state', 'closed');

  await plot.focus();
  await expect(tooltip(page)).toHaveAttribute('data-state', 'open');
  await expect(tooltip(page)).toContainText('January');
  await expect(tooltip(page)).toContainText('186');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('February');
  await expect(tooltip(page)).toContainText('305');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('June');
  await press(page, 'Escape');
  await expect(tooltip(page)).toHaveAttribute('data-state', 'closed');
});

test('Expanded area: shares, to 100%', async ({ page }) => {
  await page.goto(demo('expanded-area'));
  const axis = page.locator('[data-slot=chart-y-axis]');
  await expect(axis).toContainText('0%');
  await expect(axis).toContainText('100%');
});
