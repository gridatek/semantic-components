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

test('RTL: in Arabic, mirrored — ← to the next', async ({ page }) => {
  await page.goto(demo('rtl-sankey'));
  await expect(page.locator('[data-slot=chart]')).toHaveAttribute('dir', 'rtl');
  // Named in Arabic.
  await expect(page.locator('[data-slot=chart-plot]')).toHaveAttribute(
    'aria-label',
    /[\u0600-\u06FF]/,
  );
  // Flowing from the right: the sources (Search) right of the targets (Sign up).
  const xOf = (name: string) =>
    page
      .locator('[data-slot=chart-sankey] text', { hasText: name })
      .first()
      .evaluate((text) => text.getBoundingClientRect().x);
  expect(await xOf('البحث')).toBeGreaterThan(await xOf('التسجيل'));
  // The app follows the direction: the arrows mirrored, as its text.
  await page.locator('[data-slot=chart-plot]').focus();
  await expect(tooltip(page)).toContainText('البحث ← الأسعار');
  await press(page, 'ArrowLeft');
  await expect(tooltip(page)).toContainText('البحث ← التوثيق');
});

test("Corners: its nodes the style's — square in Lyra, rounded in Nova", async ({
  page,
  baseURL,
}) => {
  const rx = async (style: string) => {
    await page.context().addCookies([
      {
        name: 'sc-style',
        value: style,
        url: baseURL ?? 'http://localhost:4200',
      },
    ]);
    await page.goto(demo('sankey'));
    const node = page.locator('[data-slot=chart-sankey] rect').first();
    await expect(node).toBeAttached();
    // No rounding reads auto (no rx) or 0px.
    return node.evaluate((rect) => parseFloat(getComputedStyle(rect).rx) || 0);
  };
  expect(await rx('lyra')).toBe(0);
  expect(await rx('nova')).toBeGreaterThan(2);
});

test('Flows come out from behind their nodes — no square end beside a rounded one', async ({
  page,
}) => {
  await page.goto(demo('sankey'));
  const flow = page.locator('[data-slot=chart-sankey] path').first();
  await expect(flow).toBeAttached();
  // Its start, and its source's node (the first: Search).
  const { start, left, right } = await page
    .locator('[data-slot=chart-sankey]')
    .evaluate((group) => {
      const path = group.querySelector('path') as SVGPathElement;
      const node = group.querySelector('rect') as SVGRectElement;
      const x = Number(node.getAttribute('x'));
      return {
        start: path.getPointAtLength(0).x,
        left: x,
        right: x + Number(node.getAttribute('width')),
      };
    });
  // Within the node (drawn over it), not at its edge.
  expect(start).toBeGreaterThan(left + 1);
  expect(start).toBeLessThan(right - 1);
});
