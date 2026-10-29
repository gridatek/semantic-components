import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/radial-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Radial: a ring per browser, on its track', async ({ page }) => {
  await page.goto(demo('radial'));
  const rings = page.locator(
    '[data-slot=chart-radial-bar] path:not(.fill-muted)',
  );
  await expect(rings).toHaveCount(5);
  await expect(
    page.locator('[data-slot=chart-radial-bar] path.fill-muted'),
  ).toHaveCount(5);
  await page.getByRole('group', { name: 'Visitors by browser' }).focus();
  await press(page, 'ArrowRight');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('Firefox');
});

test('Stacked radial: a half circle, both series in one ring', async ({
  page,
}) => {
  await page.goto(demo('stacked-radial'));
  await expect(page.locator('[data-slot=chart-center]')).toContainText('1830');
  const plot = page.getByRole('group', {
    name: 'Visitors in January, by device',
  });
  const box = await plot.boundingBox();
  const arcs = await page
    .locator('[data-slot=chart-radial-bar] path')
    .evaluateAll((paths) => paths.map((p) => p.getBoundingClientRect().bottom));
  // A half circle: above its center, which is low in the plot.
  for (const bottom of arcs)
    expect(bottom).toBeGreaterThan((box?.y ?? 0) + (box?.height ?? 0) / 2);
  await plot.focus();
  await expect(tooltip(page)).toContainText('1,260');
});
