import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/bar-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Bar: the pointer shows its month', async ({ page }) => {
  await page.goto(demo('bar'));
  const bars = page.locator('[data-slot=chart-bar] path');
  await expect(bars).toHaveCount(6);
  await bars.nth(2).hover();
  await expect(tooltip(page)).toHaveAttribute('data-state', 'open');
  await expect(tooltip(page)).toContainText('237'); // March
  await expect(page.locator('[data-slot=chart-cursor] rect')).toHaveCount(1);
});

test('Stacked bar: each month, one on the other; a legend', async ({
  page,
}) => {
  await page.goto(demo('stacked-bar'));
  const desktop = page.locator('[data-slot=chart-bar][data-key=desktop] path');
  const mobile = page.locator('[data-slot=chart-bar][data-key=mobile] path');
  await expect(desktop).toHaveCount(6);
  await expect(mobile).toHaveCount(6);
  const below = await desktop.first().boundingBox();
  const above = await mobile.first().boundingBox();
  // Mobile on Desktop: same column, ending where it starts.
  expect(Math.round(above?.x ?? 0)).toBe(Math.round(below?.x ?? 1));
  expect(
    Math.abs((above?.y ?? 0) + (above?.height ?? 0) - (below?.y ?? 0)),
  ).toBeLessThan(1);
  await expect(page.locator('[data-slot=chart-legend]')).toHaveText(
    /Desktop\s*Mobile/,
  );
});

test('Negative bar: below zero, downwards', async ({ page }) => {
  await page.goto(demo('negative-bar'));
  const bars = page.locator('[data-slot=chart-bar] path');
  const february = await bars.nth(1).boundingBox(); // +205
  const march = await bars.nth(2).boundingBox(); // −207
  // March starts where February ends: at zero.
  expect(
    Math.abs((february?.y ?? 0) + (february?.height ?? 0) - (march?.y ?? 0)),
  ).toBeLessThan(1);
});
