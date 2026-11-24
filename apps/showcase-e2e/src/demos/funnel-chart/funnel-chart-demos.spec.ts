import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/funnel-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Funnel: a stage per step; the pointer names it', async ({ page }) => {
  await page.goto(demo('funnel'));
  const stages = page.locator('[data-slot=chart-funnel] path');
  await expect(stages).toHaveCount(4);
  await stages.nth(2).hover();
  await expect(tooltip(page)).toBeVisible();
  await expect(tooltip(page)).toContainText('Trial');
  await expect(tooltip(page)).toContainText('540');
  await expect(page.locator('[data-slot=chart-legend]')).toContainText('Paid');
});

test('Labels: each stage named inside, its value beside it', async ({
  page,
}) => {
  await page.goto(demo('label-funnel'));
  const lists = page.locator('[data-slot=chart-labels]');
  await expect(lists.nth(0).locator('text').first()).toHaveText('Visit');
  await expect(lists.nth(1).locator('text').first()).toHaveText('1,200');
  await page
    .getByRole('group', { name: 'Visitors at each step to a purchase' })
    .focus();
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Paid');
});

test('Entrance: the stages grow out of their centers, then the labels come', async ({
  page,
}) => {
  await page.goto(demo('label-funnel'));
  const stage = page.locator('[data-slot=chart-funnel] path').first();
  const height = () =>
    stage.evaluate((path) => (path as SVGPathElement).getBBox().height);
  const labels = page.locator('[data-slot=chart-labels] text');
  // It waits 400ms, then grows: flat, unlabelled at first.
  expect(await height()).toBeLessThan(5);
  await expect(labels).toHaveCount(0);
  await expect.poll(height).toBeGreaterThan(20);
  await expect(labels).toHaveCount(8);
});

test.describe('keyboard', () => {
  // Placed at once (no glide), to read where it is.
  test.use({ reducedMotion: 'reduce' });

  test('Keyboard: the tooltip beside the item reached, not the middle', async ({
    page,
  }) => {
    await page.goto(demo('funnel'));
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

test('RTL: in Arabic, symmetric, its arrows mirrored — ← to the next', async ({
  page,
}) => {
  await page.goto(demo('rtl-funnel'));
  await expect(page.locator('[data-slot=chart]')).toHaveAttribute('dir', 'rtl');
  // Named in Arabic.
  await expect(page.locator('[data-slot=chart-plot]')).toHaveAttribute(
    'aria-label',
    /[\u0600-\u06FF]/,
  );
  // The app follows the direction: the arrows mirrored, as its text.
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('زيارة');
  await press(page, 'ArrowLeft');
  await expect(tooltip(page)).toContainText('تسجيل');
});

test("Corners: the stages' the style's — square in Lyra, rounded in Nova", async ({
  page,
  baseURL,
}) => {
  const shapeIn = async (style: string, name: string) => {
    await page.context().addCookies([
      {
        name: 'sc-style',
        value: style,
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    // Drawn whole at once (no entrance): its corners, not its growth.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(demo(name));
    const shape = page.locator('[data-slot=chart-funnel] path').nth(1);
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
  // A rounded corner: a curve in its outline.
  const curves = (d: string) => (d.match(/[QA]/g) ?? []).length;
  expect(curves(await shapeIn('lyra', 'funnel'))).toBe(0);
  expect(curves(await shapeIn('nova', 'funnel'))).toBe(4);
});
