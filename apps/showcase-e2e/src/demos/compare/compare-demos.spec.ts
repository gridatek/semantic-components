import { type Page, expect, test } from '@playwright/test';

const handle = (page: Page) => page.getByRole('slider');
const compare = (page: Page) => page.locator('[data-slot="compare"]');

/** A point of the compare, as fractions of its size. */
async function at(page: Page, fx: number, fy = 0.5) {
  const box = await compare(page).boundingBox();
  return {
    x: (box?.x ?? 0) + (box?.width ?? 0) * fx,
    y: (box?.y ?? 0) + (box?.height ?? 0) * fy,
  };
}

test.describe('Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/compare/basic-compare-demo');
    await expect(handle(page)).toHaveAccessibleName('Before and after');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '50');
  });

  test('a click moves the divider there, a drag follows', async ({ page }) => {
    const quarter = await at(page, 0.25);
    await page.mouse.click(quarter.x, quarter.y);
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '25');

    const end = await at(page, 0.7);
    await page.mouse.move(quarter.x, quarter.y);
    await page.mouse.down();
    await page.mouse.move(end.x, end.y, { steps: 6 });
    await page.mouse.up();
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '70');
  });

  test('the keys move it, and a covered label fades', async ({ page }) => {
    await handle(page).focus();
    await page.keyboard.press('ArrowLeft');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '49');
    await page.keyboard.press('Shift+ArrowRight');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '59');
    await page.keyboard.press('End');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '100');
    await expect(page.getByText('After', { exact: true })).toHaveAttribute(
      'data-covered',
      'true',
    );
    await page.keyboard.press('Home');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '0');
  });

  test('right to left: from the right, and the arrows follow', async ({
    page,
  }) => {
    await page.evaluate(() =>
      document.documentElement.setAttribute('dir', 'rtl'),
    );
    await page.goto('/demos/compare/basic-compare-demo');
    await page.evaluate(() =>
      document.documentElement.setAttribute('dir', 'rtl'),
    );
    const point = await at(page, 0.75);
    await page.mouse.click(point.x, point.y);
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '25');
    await handle(page).focus();
    await page.keyboard.press('ArrowLeft');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '26');
  });
});

test('Vertical: up and down', async ({ page }) => {
  await page.goto('/demos/compare/vertical-compare-demo');
  await expect(handle(page)).toHaveAttribute('aria-orientation', 'vertical');
  const point = await at(page, 0.5, 0.2);
  await page.mouse.click(point.x, point.y);
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '20');
});

test('Hover: the divider follows the pointer', async ({ page }) => {
  await page.goto('/demos/compare/hover-compare-demo');
  const point = await at(page, 0.8);
  await page.mouse.move(point.x, point.y);
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '80');
});

test('Handle only: a click elsewhere does nothing; bounds hold', async ({
  page,
}) => {
  await page.goto('/demos/compare/handle-compare-demo');
  await expect(handle(page)).toHaveAttribute('aria-valuetext', '30% before');
  const point = await at(page, 0.9);
  await page.mouse.click(point.x, point.y);
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '30');
  await handle(page).focus();
  await page.keyboard.press('Home');
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '5');
  await expect(page.getByText('5% before', { exact: true })).toBeVisible();
});
