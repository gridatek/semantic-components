import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/treemap-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Treemap: a box per browser; the pointer names it', async ({ page }) => {
  await page.goto(demo('treemap'));
  const boxes = page.locator('[data-slot=chart-treemap] rect');
  await expect(boxes).toHaveCount(4);
  await boxes.nth(1).hover();
  await expect(tooltip(page)).toBeVisible();
  await expect(tooltip(page)).toContainText('Safari');
  await expect(tooltip(page)).toContainText('200');
  await expect(
    page.locator('[data-slot=chart-labels] text').first(),
  ).toHaveText('Chrome');
});

test('Groups: boxes under their folders; the keyboard moves through them', async ({
  page,
}) => {
  await page.goto(demo('grouped-treemap'));
  await expect(page.locator('[data-slot=chart-treemap] rect')).toHaveCount(7);
  await expect(page.locator('[data-slot=chart-treemap] > text')).toHaveText([
    'src',
    'assets',
    'docs',
  ]);
  await page.getByRole('group', { name: 'Disk use by folder, in MB' }).focus();
  await expect(tooltip(page)).toContainText('components');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('api');
});

test('Entrance: the boxes slide in from the left', async ({ page }) => {
  await page.goto(demo('treemap'));
  const box = page.locator('[data-slot=chart-treemap] rect').first();
  const x = () => box.evaluate((rect) => Number(rect.getAttribute('x')));
  // Past the left edge at first, then at its place.
  const first = await x();
  await expect.poll(x).toBeGreaterThan(first + 20);
});

test.describe('keyboard', () => {
  // Placed at once (no glide), to read where it is.
  test.use({ reducedMotion: 'reduce' });

  test('Keyboard: the tooltip beside the item reached, not the middle', async ({
    page,
  }) => {
    await page.goto(demo('treemap'));
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
  await page.goto(demo('rtl-treemap'));
  await expect(page.locator('[data-slot=chart]')).toHaveAttribute('dir', 'rtl');
  // Named in Arabic.
  await expect(page.locator('[data-slot=chart-plot]')).toHaveAttribute(
    'aria-label',
    /[\u0600-\u06FF]/,
  );
  // A shape reads the same both ways: the arrows as drawn.
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('Chrome');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('Safari');
});

test("Corners: the style's — square in Lyra, rounded in Nova", async ({
  page,
  baseURL,
}) => {
  const rx = async (preset: string) => {
    await page.context().addCookies([
      {
        name: 'sc-preset',
        value: preset,
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto(demo('treemap'));
    const box = page.locator('[data-slot=chart-treemap] rect').first();
    await expect(box).toBeAttached();
    return box.evaluate((rect) => getComputedStyle(rect).rx);
  };
  expect(await rx('lyra')).toBe('0px');
  expect(parseFloat(await rx('nova'))).toBeGreaterThan(0);
});
