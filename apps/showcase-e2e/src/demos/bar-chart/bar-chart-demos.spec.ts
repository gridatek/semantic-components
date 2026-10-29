import { collectErrors, press } from '../../interaction';
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

test('Horizontal: bars across, the months down the side', async ({ page }) => {
  await page.goto(demo('horizontal-bar'));
  const bars = page.locator('[data-slot=chart-bar] path');
  await expect(bars).toHaveCount(6);
  const january = await bars.nth(0).boundingBox();
  const february = await bars.nth(1).boundingBox();
  // Across: wider than high, one under the other, from the same start.
  expect(january?.width ?? 0).toBeGreaterThan(january?.height ?? 0);
  expect(february?.y ?? 0).toBeGreaterThan(january?.y ?? 0);
  expect(Math.round(february?.x ?? 0)).toBe(Math.round(january?.x ?? 1));
  // February (305) the longest.
  expect(february?.width ?? 0).toBeGreaterThan(january?.width ?? 0);
  await expect(page.locator('[data-slot=chart-category-axis]')).toContainText(
    'Feb',
  );
  await page
    .getByRole('group', { name: 'Desktop visitors, January to June' })
    .focus();
  await press(page, 'ArrowDown');
  await expect(tooltip(page)).toContainText('305');
});

test('Labels: each value above its bar', async ({ page }) => {
  await page.goto(demo('label-bar'));
  const labels = page.locator('[data-slot=chart-labels] text');
  await expect(labels).toHaveCount(6);
  await expect(labels.nth(1)).toHaveText('305');
  const bar = await page
    .locator('[data-slot=chart-bar] path')
    .nth(1)
    .boundingBox();
  const label = await labels.nth(1).boundingBox();
  expect((label?.y ?? 0) + (label?.height ?? 0)).toBeLessThanOrEqual(
    (bar?.y ?? 0) + 1,
  );
});

test('Custom labels: the month inside its bar, the value beyond', async ({
  page,
}) => {
  await page.goto(demo('custom-label-bar'));
  const [names, values] = [
    page.locator('[data-slot=chart-labels]').nth(0).locator('text'),
    page.locator('[data-slot=chart-labels]').nth(1).locator('text'),
  ];
  await expect(names.first()).toHaveText('January');
  await expect(values.first()).toHaveText('186');
  // In its bar, then beyond it — once the plot has its size.
  await expect
    .poll(() =>
      page.evaluate(() => {
        const boxes = (selector: string) =>
          [...document.querySelectorAll(selector)].map((element) =>
            element.getBoundingClientRect(),
          );
        const [bar] = boxes('[data-slot=chart-bar] path');
        const [names, values] = [
          ...document.querySelectorAll('[data-slot=chart-labels]'),
        ].map((labels) =>
          labels.querySelector('text')?.getBoundingClientRect(),
        );
        return (
          !!bar &&
          !!names &&
          !!values &&
          names.left > bar.left &&
          names.right < bar.right &&
          values.left > bar.right
        );
      }),
    )
    .toBe(true);
});
