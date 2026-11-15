import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/pie-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Pie: a slice per browser; the pointer names it', async ({ page }) => {
  await page.goto(demo('pie'));
  const slices = page.locator('[data-slot=chart-pie] path');
  await expect(slices).toHaveCount(5);
  await slices.nth(1).hover();
  await expect(tooltip(page)).toBeVisible();
  await expect(tooltip(page)).toContainText('Safari');
  await expect(tooltip(page)).toContainText('200');
  await expect(page.locator('[data-slot=chart-legend]')).toContainText(
    'Firefox',
  );
});

test('Donut: its total in the center; the keyboard moves through the slices', async ({
  page,
}) => {
  await page.goto(demo('donut'));
  await expect(page.locator('[data-slot=chart-center]')).toContainText('925');
  await page.getByRole('group', { name: 'Visitors by browser' }).focus();
  await expect(tooltip(page)).toContainText('Chrome');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Other');
});

test('Rings: each series named, its category in the title', async ({
  page,
}) => {
  await page.goto(demo('stacked-pie'));
  await expect(page.locator('[data-slot=chart-pie]')).toHaveCount(2);
  await page.locator('[data-slot=chart-plot]').focus();
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('February');
  await expect(tooltip(page)).toContainText('Desktop');
  await expect(tooltip(page)).toContainText('Mobile');
});

test('Labels: each value beyond its slice', async ({ page }) => {
  await page.goto(demo('label-pie'));
  const labels = page.locator('[data-slot=chart-labels] text');
  await expect(labels).toHaveCount(5);
  await expect(labels.first()).toHaveText('275');
});

test('Entrance: it sweeps round, then its labels come', async ({ page }) => {
  await page.goto(demo('label-pie'));
  const pie = page.locator('[data-slot=chart-pie]').first();
  // Sweeping: part of the circle drawn (not round yet), no labels.
  await expect
    .poll(
      () =>
        pie.evaluate((g) => {
          const box = (g as SVGGElement).getBBox();
          return box.width > 0 && Math.abs(box.width - box.height) > 1;
        }),
      { intervals: [50] },
    )
    .toBe(true);
  await expect(page.locator('[data-slot=chart-labels] text')).toHaveCount(0);
  // Whole: round, its labels around it.
  await expect(page.locator('[data-slot=chart-labels] text')).toHaveCount(5);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('Entrance: none — whole, labelled, from the start', async ({ page }) => {
    await page.goto(demo('label-pie'));
    const pie = page.locator('[data-slot=chart-pie]').first();
    await expect(page.locator('[data-slot=chart-labels] text')).toHaveCount(5);
    const box = await pie.evaluate((g) => (g as SVGGElement).getBBox());
    expect(Math.round(box.width)).toBe(Math.round(box.height));
  });
});

test.describe('keyboard', () => {
  // Placed at once (no glide), to read where it is.
  test.use({ reducedMotion: 'reduce' });

  test('Keyboard: the tooltip beside the item reached, not the middle', async ({
    page,
  }) => {
    await page.goto(demo('pie'));
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

test('RTL: in Arabic, mirrored — ← to the next', async ({ page }) => {
  await page.goto(demo('rtl-pie'));
  await expect(page.locator('[data-slot=chart]')).toHaveAttribute('dir', 'rtl');
  // Named in Arabic.
  await expect(page.locator('[data-slot=chart-plot]')).toHaveAttribute(
    'aria-label',
    /[\u0600-\u06FF]/,
  );
  // From 9 o'clock, clockwise: the first slice (Chrome) on the left.
  const plot = await page.locator('[data-slot=chart-plot]').boundingBox();
  const first = await page
    .locator('[data-slot=chart-pie] path')
    .first()
    .evaluate((path) => {
      const box = path.getBoundingClientRect();
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    });
  expect(first.x).toBeLessThan((plot?.x ?? 0) + (plot?.width ?? 0) / 2);
  // The app follows the direction: the arrows mirrored, as its text.
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('Chrome');
  await press(page, 'ArrowLeft');
  await expect(tooltip(page)).toContainText('Safari');
});

test("Corners: a donut's slices the style's — square in Lyra, rounded in Nova; a pie's crisp", async ({
  page,
  baseURL,
}) => {
  const shapeIn = async (preset: string, name: string) => {
    await page.context().addCookies([
      {
        name: 'sc-preset',
        value: preset,
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    // Drawn whole at once (no entrance): its corners, not its growth.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(demo(name));
    const shape = page.locator('[data-slot=chart-pie] path').nth(1);
    // Once grown and still: the same outline twice in a row.
    let last = '';
    await expect
      .poll(
        async () => {
          const d = (await shape.getAttribute('d')) ?? '';
          const still = d !== '' && d === last;
          last = d;
          return still;
        },
        { intervals: [300] },
      )
      .toBe(true);
    return last;
  };
  // A slice's outline: its two edges' arcs, and a small one at each rounded corner.
  const arcs = (d: string) => d.split('A').length - 1;
  expect(arcs(await shapeIn('lyra', 'donut'))).toBe(2);
  expect(arcs(await shapeIn('nova', 'donut'))).toBeGreaterThan(2);
  // A whole pie: its slices meet in the middle, wedges in every style.
  expect(arcs(await shapeIn('nova', 'pie'))).toBe(1);
});
