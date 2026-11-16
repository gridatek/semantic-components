import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/line-chart/${name}-chart-demo`;
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

test('Line: a dot on each month; the keyboard moves through them', async ({
  page,
}) => {
  await page.goto(demo('line'));
  await expect(page.locator('[data-slot=chart-line] circle')).toHaveCount(6);
  await page
    .getByRole('group', { name: 'Desktop visitors, January to June' })
    .focus();
  await expect(tooltip(page)).toContainText('186');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('305');
});

test('Entrance: the line draws itself, then its dots come', async ({
  page,
}) => {
  await page.goto(demo('line'));
  const path = page.locator('[data-slot=chart-line] path').first();
  // Drawing: a share of its length (pathLength 1), the dots not yet there.
  await expect(path).toHaveAttribute('stroke-dasharray', /^0\.\d+ 1$/);
  await expect(page.locator('[data-slot=chart-line] circle')).toHaveCount(0);
  // Drawn: whole, its dots on it.
  await expect(path).not.toHaveAttribute('stroke-dasharray');
  await expect(page.locator('[data-slot=chart-line] circle')).toHaveCount(6);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('Entrance: none — the line whole from the start', async ({ page }) => {
    await page.goto(demo('line'));
    await expect(page.locator('[data-slot=chart-line] circle')).toHaveCount(6);
    await expect(
      page.locator('[data-slot=chart-line] path').first(),
    ).not.toHaveAttribute('stroke-dasharray');
  });
});

test('Two lines: a legend; the tooltip has both', async ({ page }) => {
  await page.goto(demo('multiple-line'));
  await expect(page.locator('[data-slot=chart-legend]')).toHaveText(
    /Desktop\s*Mobile/,
  );
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('Desktop');
  await expect(tooltip(page)).toContainText('Mobile');
});

test('Labels: each value above its point', async ({ page }) => {
  await page.goto(demo('label-line'));
  const labels = page.locator('[data-slot=chart-labels] text');
  await expect(labels).toHaveCount(6);
  await expect(labels.first()).toHaveText('186');
});

test('Update: a new size moves the line there, not at once', async ({
  page,
}) => {
  await page.goto(demo('line'));
  // Drawn: its dots are there.
  await expect(page.locator('[data-slot=chart-line] circle')).toHaveCount(6);
  const size = page.viewportSize() ?? { width: 1280, height: 720 };
  await page.setViewportSize({ width: 400, height: size.height });
  expect(
    // The last dot: the first stays at the start.
    await framesOf(page, '[data-slot=chart-line] circle:last-of-type', 'cx'),
  ).toBeGreaterThan(2);
});

test('RTL: mirrored — the months from the right, the values on the right; ← to the next', async ({
  page,
}) => {
  await page.goto(demo('rtl-line'));
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

test('RTL entrance: drawn from the right, in place — not moved there as the chart measures itself', async ({
  page,
}) => {
  await page.goto(demo('rtl-line'));
  // Where the line starts (January, on the right), frame by frame, as it draws.
  const starts = await page.evaluate(async () => {
    const xs: number[] = [];
    const end = performance.now() + 800;
    while (performance.now() < end) {
      const path = document.querySelector<SVGPathElement>(
        '[data-slot=chart-line] path',
      );
      if (path?.getAttribute('d')) xs.push(path.getPointAtLength(0).x);
      await new Promise((done) => requestAnimationFrame(done));
    }
    return xs;
  });
  expect(starts.length).toBeGreaterThan(5);
  expect(Math.max(...starts) - Math.min(...starts)).toBeLessThan(2);
});
