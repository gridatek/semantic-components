import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/line-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

/** How many values an attribute of the first match takes, frame by frame, for a while. */
function framesOf(page: Page, selector: string, attribute: string) {
  return page.evaluate(
    async ([selector, attribute]) => {
      const seen = new Set<string | null>();
      const end = performance.now() + 900;
      while (performance.now() < end) {
        seen.add(
          document.querySelector(selector)?.getAttribute(attribute) ?? null,
        );
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
