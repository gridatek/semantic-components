import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/sankey-chart/${name}-chart-demo`;
const tooltip = (page: Page) => page.locator('[data-slot=chart-tooltip]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Sankey: nodes named, a flow per row; the pointer names it', async ({
  page,
}) => {
  await page.goto(demo('sankey'));
  const sankey = page.locator('[data-slot=chart-sankey]');
  await expect(sankey.locator('rect')).toHaveCount(7);
  await expect(sankey.locator('path')).toHaveCount(9);
  await expect(sankey.locator('text')).toContainText([
    'Search',
    'Pricing',
    'Sign up',
  ]);
  await page
    .getByRole('group', { name: 'Where visitors come from and where they go' })
    .focus();
  await expect(tooltip(page)).toContainText('Search → Pricing');
  await expect(tooltip(page)).toContainText('420');
  await press(page, 'End');
  await expect(tooltip(page)).toContainText('Docs → Left');
});

test.describe('keyboard', () => {
  // Placed at once (no glide), to read where it is.
  test.use({ reducedMotion: 'reduce' });

  test('Keyboard: the tooltip beside the item reached, not the middle', async ({
    page,
  }) => {
    await page.goto(demo('sankey'));
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
  await page.goto(demo('rtl-sankey'));
  await expect(page.locator('[data-slot=chart]')).toHaveAttribute('dir', 'rtl');
  // Named in Arabic.
  await expect(page.locator('[data-slot=chart-plot]')).toHaveAttribute(
    'aria-label',
    /[\u0600-\u06FF]/,
  );
  // A shape reads the same both ways: the arrows as drawn.
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('البحث ← الأسعار');
  await press(page, 'ArrowRight');
  await expect(tooltip(page)).toContainText('البحث ← التوثيق');
});
