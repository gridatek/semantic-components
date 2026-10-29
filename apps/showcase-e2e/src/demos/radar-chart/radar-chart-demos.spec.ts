import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/radar-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Radar: a spoke per month; the keyboard moves around', async ({
  page,
}) => {
  await page.goto(demo('radar'));
  await expect(
    page.locator('[data-slot=chart-polar-angle-axis] text'),
  ).toHaveCount(6);
  await expect(page.locator('[data-slot=chart-radar] path')).toHaveAttribute(
    'd',
    /Z$/,
  );
  await page
    .getByRole('group', { name: 'Desktop visitors, January to June' })
    .focus();
  await expect(tooltip(page)).toContainText('January');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('February');
  await expect(tooltip(page)).toContainText('305');
});

test('Two radars: a legend; the pointer finds the nearest spoke', async ({
  page,
}) => {
  await page.goto(demo('multiple-radar'));
  await expect(page.locator('[data-slot=chart-legend]')).toHaveText(
    /Desktop\s*Mobile/,
  );
  // Below the center: April's spoke (the 4th of 6, the first at the top).
  const box = await page.locator('[data-slot=chart-plot]').boundingBox();
  await page.mouse.move(
    (box?.x ?? 0) + (box?.width ?? 0) / 2,
    (box?.y ?? 0) + (box?.height ?? 0) * 0.75,
  );
  await expect(tooltip(page)).toContainText('April');
});
