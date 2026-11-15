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
  const lowest = () =>
    page
      .locator('[data-slot=chart-radial-bar] path')
      .evaluateAll((paths) =>
        Math.min(...paths.map((p) => p.getBoundingClientRect().bottom)),
      );
  // A half circle: above its center, which is low in the plot — once the
  // arcs have grown round to it.
  await expect
    .poll(lowest)
    .toBeGreaterThan((box?.y ?? 0) + (box?.height ?? 0) / 2);
  await plot.focus();
  await expect(tooltip(page)).toContainText('1,260');
});

test('Labels: each browser on its ring', async ({ page }) => {
  await page.goto(demo('label-radial'));
  const labels = page.locator('[data-slot=chart-labels] text');
  await expect(labels).toHaveCount(5);
  await expect(labels.first()).toHaveText('chrome');
});

test('Entrance: the arcs grow along their rings, then the labels come', async ({
  page,
}) => {
  await page.goto(demo('label-radial'));
  const labels = page.locator('[data-slot=chart-labels] text');
  const arc = page
    // Its value's arc, not its track behind.
    .locator('[data-slot=chart-radial-bar] path:not(.fill-muted)')
    .first();
  // Growing: its shape changes, the labels not there yet.
  const first = await arc.getAttribute('d');
  await expect(labels).toHaveCount(0);
  await expect(arc).not.toHaveAttribute('d', first ?? '');
  await expect(labels).toHaveCount(5);
});

test.describe('keyboard', () => {
  // Placed at once (no glide), to read where it is.
  test.use({ reducedMotion: 'reduce' });

  test('Keyboard: the tooltip beside the item reached, not the middle', async ({
    page,
  }) => {
    await page.goto(demo('radial'));
    await page.locator('[data-slot=chart-plot]').first().focus();
    await expect(tooltip(page)).toBeVisible();
    const at = async () => {
      const box = await tooltip(page).boundingBox();
      return `${Math.round(box?.x ?? 0)},${Math.round(box?.y ?? 0)}`;
    };
    const first = await at();
    await press(page, 'ArrowRight');
    await expect.poll(at).not.toBe(first);
  });
});
