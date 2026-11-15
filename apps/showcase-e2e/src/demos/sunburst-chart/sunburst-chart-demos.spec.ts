import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/sunburst-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Sunburst: groups inside, countries around; the pointer names them', async ({
  page,
}) => {
  await page.goto(demo('sunburst'));
  const slices = page.locator('[data-slot=chart-sunburst] path');
  await expect(slices).toHaveCount(10);
  await slices.nth(3 + 3).hover();
  await expect(tooltip(page)).toBeVisible();
  await expect(tooltip(page)).toContainText('USA');
  await expect(tooltip(page)).toContainText('320');
  await expect(page.locator('[data-slot=chart-legend]')).toContainText(
    'Europe',
  );
});

test('Labels: each country beyond its slice; the keyboard moves through them', async ({
  page,
}) => {
  await page.goto(demo('label-sunburst'));
  const labels = page.locator('[data-slot=chart-labels] text');
  await expect(labels).toHaveCount(5);
  await expect(labels.first()).toHaveText('France');
  await page.locator('[data-slot=chart-plot]').focus();
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Japan');
});

test.describe('keyboard', () => {
  // Placed at once (no glide), to read where it is.
  test.use({ reducedMotion: 'reduce' });

  test('Keyboard: the tooltip beside the item reached, not the middle', async ({
    page,
  }) => {
    await page.goto(demo('sunburst'));
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
  await page.goto(demo('rtl-sunburst'));
  await expect(page.locator('[data-slot=chart]')).toHaveAttribute('dir', 'rtl');
  // Named in Arabic.
  await expect(page.locator('[data-slot=chart-plot]')).toHaveAttribute(
    'aria-label',
    /[\u0600-\u06FF]/,
  );
  // A shape reads the same both ways: the arrows as drawn.
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('فرنسا');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('ألمانيا');
});
