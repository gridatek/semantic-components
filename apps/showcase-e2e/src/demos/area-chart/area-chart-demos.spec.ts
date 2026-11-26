import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/area-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

/**
 * How many values an attribute of the first match takes, frame by frame, for
 * a while: 900 ms from its first change (under load, WebKit starts the
 * animation late — up to 3 s waited for it).
 */
function framesOf(page: Page, selector: string, attribute: string) {
  return page.evaluate(
    async ([selector, attribute]) => {
      const value = () =>
        document.querySelector(selector)?.getAttribute(attribute) ?? null;
      const first = value();
      const seen = new Set([first]);
      let end = performance.now() + 3000;
      let moved = false;
      while (performance.now() < end) {
        const now = value();
        seen.add(now);
        if (!moved && now !== first) {
          moved = true;
          end = performance.now() + 900;
        }
        await new Promise((done) => requestAnimationFrame(done));
      }
      return seen.size;
    },
    [selector, attribute],
  );
}

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
  await expect(tooltip(page)).toHaveCount(0);

  await plot.focus();
  await expect(tooltip(page)).toBeVisible();
  await expect(tooltip(page)).toContainText('January');
  await expect(tooltip(page)).toContainText('186');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('February');
  await expect(tooltip(page)).toContainText('305');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('June');
  await press(page, 'Escape');
  await expect(tooltip(page)).toHaveCount(0);
});

test('Entrance: unveiled from its first month, then whole', async ({
  page,
}) => {
  await page.goto(demo('area'));
  const area = page.locator('[data-slot=chart-area]').first();
  // Unveiling: clipped to a box widening from January.
  await expect(area.locator('path').first()).toHaveAttribute(
    'clip-path',
    /^url\(#/,
  );
  await expect(area.locator('clipPath rect')).toHaveCount(1);
  // Whole: no clip left.
  await expect(area.locator('clipPath')).toHaveCount(0);
  await expect(area.locator('path').first()).not.toHaveAttribute('clip-path');
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('Entrance: none — whole from the start', async ({ page }) => {
    await page.goto(demo('area'));
    const area = page.locator('[data-slot=chart-area]').first();
    await expect(area.locator('path').first()).toBeAttached();
    await expect(area.locator('clipPath')).toHaveCount(0);
    await expect(area.locator('path').first()).not.toHaveAttribute('clip-path');
  });
});

test('Expanded area: shares, to 100%', async ({ page }) => {
  await page.goto(demo('expanded-area'));
  const axis = page.locator('[data-slot=chart-value-axis]');
  await expect(axis).toContainText('0%');
  await expect(axis).toContainText('100%');
});

test('Interactive: a time range; dates in the locale', async ({ page }) => {
  await page.goto(demo('interactive-area'));
  const plot = page.getByRole('group', { name: 'Visitors by device, by day' });
  await plot.focus();
  await press(page, 'Home');
  // The last 90 days of 91: from April 2.
  await expect(tooltip(page)).toContainText('Apr 2');
  await page.getByRole('button', { name: 'Last 7 days' }).click();
  await plot.focus();
  await press(page, 'Home');
  // The last week: from June 24.
  await expect(tooltip(page)).toContainText('Jun 24');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Jun 30');
});

test('Update: a new time range moves the areas there, not at once', async ({
  page,
}) => {
  await page.goto(demo('interactive-area'));
  // Unveiled: no clip left.
  await expect(page.locator('[data-slot=chart-area] clipPath')).toHaveCount(0);
  await page.getByRole('button', { name: 'Last 7 days' }).click();
  expect(
    await framesOf(page, '[data-slot=chart-area] path', 'd'),
  ).toBeGreaterThan(2);
});

test.describe('reduced motion, on a change', () => {
  test.use({ reducedMotion: 'reduce' });

  test('Update: at once', async ({ page }) => {
    await page.goto(demo('interactive-area'));
    await page.getByRole('button', { name: 'Last 7 days' }).click();
    // One step: from 90 days to 7, nothing between (the old one, if read first).
    expect(
      await framesOf(page, '[data-slot=chart-area] path', 'd'),
    ).toBeLessThanOrEqual(2);
  });
});

test('RTL: mirrored — the months from the right, the values on the right; ← to the next', async ({
  page,
}) => {
  await page.goto(demo('rtl-area'));
  // Drawn once measured: both axes' labels there.
  await expect(
    page.locator('[data-slot=chart-category-axis] text').first(),
  ).toBeVisible();
  await expect(
    page.locator('[data-slot=chart-value-axis] text').first(),
  ).toBeVisible();
  // Where each label of an axis is, left to right on the screen.
  const xs = (slot: string) =>
    page
      .locator(`[data-slot=${slot}] text`)
      .evaluateAll((texts) =>
        texts.map((text) => text.getBoundingClientRect().x),
      );
  const categories = await xs('chart-category-axis');
  // The first category (or the smallest x value) furthest right.
  expect(categories[0]).toBeGreaterThan(categories[categories.length - 1]);
  // The value axis right of every category.
  const values = await xs('chart-value-axis');
  expect(Math.min(...values)).toBeGreaterThan(Math.max(...categories));
  // The arrows go the way it's drawn: ← to the next.
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('يناير');
  await press(page, 'ArrowLeft');
  await expect(tooltip(page)).toContainText('فبراير');
});

test('Interactive, in the docs on a phone (280px): the time ranges in the width they have, each still named in full', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/demos/area-chart/interactive-area-chart-demo');
  // The docs' frame on a phone: 40px a side (their margin and its padding).
  await page.addStyleTag({
    content: 'app-root { padding-inline: 40px !important; }',
  });
  const ranges = page.getByRole('group', { name: 'Time range' });
  await expect(ranges).toBeVisible();
  const box = await ranges.boundingBox();
  expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(360 - 40 + 0.5);
  for (const name of ['Last 3 months', 'Last 30 days', 'Last 7 days'])
    await expect(ranges.getByRole('button', { name })).toBeVisible();
});
