import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/compare-next/${name}-demo`;
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

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('compare-next-usage'));
    await expect(handle(page)).toHaveAccessibleName('Before and after');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '50');
  });

  test('it reads as a percentage', async ({ page }) => {
    await expect(handle(page)).toHaveAttribute('aria-valuetext', '50%');
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

  test('the keys: arrows, Shift, Page Up / Down, Home / End; a covered label fades', async ({
    page,
  }) => {
    await handle(page).focus();
    await page.keyboard.press('ArrowLeft');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '49');
    await page.keyboard.press('Shift+ArrowRight');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '59');
    // Page Up: up the slider — forward, across.
    await page.keyboard.press('PageUp');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '69');
    await page.keyboard.press('PageDown');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '59');
    await page.keyboard.press('End');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '100');
    await expect(page.getByText('After', { exact: true })).toHaveAttribute(
      'data-covered',
      'true',
    );
    await expect
      .poll(() =>
        page
          .getByText('After', { exact: true })
          .evaluate((e) => getComputedStyle(e).opacity),
      )
      .toBe('0');
    await page.keyboard.press('Home');
    await expect(handle(page)).toHaveAttribute('aria-valuenow', '0');
  });
});

test('Touch: only the handle drags; a tap on the photo leaves it @mobile', async ({
  page,
}) => {
  await page.goto(demo('compare-next-usage'));
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '50');
  const point = await at(page, 0.2);
  await page.touchscreen.tap(point.x, point.y);
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '50');
});

test('Vertical: up and down; the arrows their way', async ({ page }) => {
  await page.goto(demo('vertical-compare-next'));
  await expect(handle(page)).toHaveAttribute('aria-orientation', 'vertical');
  const point = await at(page, 0.5, 0.2);
  await page.mouse.click(point.x, point.y);
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '20');
  await handle(page).focus();
  await page.keyboard.press('ArrowDown');
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '21');
  await page.keyboard.press('PageUp');
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '11');
});

test('Hover: the divider follows the pointer', async ({ page }) => {
  await page.goto(demo('hover-compare-next'));
  const point = await at(page, 0.8);
  await page.mouse.move(point.x, point.y);
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '80');
});

test('Handle only, bounds and step: a click elsewhere does nothing', async ({
  page,
}) => {
  await page.goto(demo('handle-compare-next'));
  await expect(handle(page)).toHaveAttribute('aria-valuetext', '30% before');
  const point = await at(page, 0.9);
  await page.mouse.click(point.x, point.y);
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '30');
  await handle(page).focus();
  await page.keyboard.press('ArrowRight');
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '35');
  await page.keyboard.press('Home');
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '5');
  await expect(handle(page)).toHaveAttribute('aria-valuemin', '5');
  await expect(page.getByText('5% before', { exact: true })).toBeVisible();
});

test('RTL: the before on the right; the arrows follow the text', async ({
  page,
}) => {
  await page.goto(demo('rtl-compare-next'));
  const point = await at(page, 0.75);
  await page.mouse.click(point.x, point.y);
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '25');
  await handle(page).focus();
  await page.keyboard.press('ArrowLeft');
  await expect(handle(page)).toHaveAttribute('aria-valuenow', '26');
});

test('Any content: the same card, light and dark', async ({ page }) => {
  await page.goto(demo('content-compare-next'));
  await expect(page.getByText('Team plan')).toHaveCount(2);
  await expect(handle(page)).toHaveAccessibleName('Light and dark theme');
});
