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

test('Entrance: its points move out from the center', async ({ page }) => {
  await page.goto(demo('radar'));
  const radar = page.locator('[data-slot=chart-radar] path').first();
  const width = () =>
    radar.evaluate((path) => (path as SVGPathElement).getBBox().width);
  // Small at first, then out to its values.
  const first = await width();
  await expect.poll(width).toBeGreaterThan(first + 40);
});

test.describe('keyboard', () => {
  // Placed at once (no glide), to read where it is.
  test.use({ reducedMotion: 'reduce' });

  test('Keyboard: the tooltip beside the item reached, not the middle', async ({
    page,
  }) => {
    await page.goto(demo('radar'));
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

test('RTL: in Arabic, not mirrored — → still to the next', async ({ page }) => {
  await page.goto(demo('rtl-radar'));
  await expect(page.locator('[data-slot=chart]')).toHaveAttribute('dir', 'rtl');
  // Named in Arabic.
  await expect(page.locator('[data-slot=chart-plot]')).toHaveAttribute(
    'aria-label',
    /[\u0600-\u06FF]/,
  );
  // A shape reads the same both ways: the arrows as drawn.
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('يناير');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('فبراير');
});
