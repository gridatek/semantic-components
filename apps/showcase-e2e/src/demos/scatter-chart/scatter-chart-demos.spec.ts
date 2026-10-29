import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/scatter-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Scatter: a point per person; the keyboard moves through them', async ({
  page,
}) => {
  await page.goto(demo('scatter'));
  await expect(page.locator('[data-slot=chart-scatter] circle')).toHaveCount(
    12,
  );
  await page
    .getByRole('group', { name: 'Height and weight of 12 people' })
    .focus();
  await expect(tooltip(page)).toContainText('Ana');
  await expect(tooltip(page)).toContainText('52');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Lea');
});

test('Bubbles: sized by population', async ({ page }) => {
  await page.goto(demo('bubble-scatter'));
  const dots = page.locator('[data-slot=chart-scatter] circle');
  await expect(dots).toHaveCount(7);
  const r = (i: number) => dots.nth(i).getAttribute('r').then(Number);
  expect(await r(2)).toBeGreaterThan(await r(6));
});
