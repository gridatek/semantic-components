import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/meter/${name}-demo`;
const indicator = (page: Page) =>
  page.locator('[data-slot=meter-indicator]').first();

/** The fill's width, a share of its track's (as laid out, not animated). */
const fill = (page: Page) =>
  indicator(page).evaluate((element) => {
    const track = element.parentElement as HTMLElement;
    return (
      parseFloat(getComputedStyle(element).width) /
      parseFloat(getComputedStyle(track).width)
    );
  });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a meter named by its label, read as a percent', async ({
  page,
}) => {
  await page.goto(demo('meter-usage'));
  const meter = page.getByRole('meter', { name: 'Storage used' });
  await expect(meter).toHaveAttribute('aria-valuenow', '68');
  await expect(meter).toHaveAttribute('aria-valuemin', '0');
  await expect(meter).toHaveAttribute('aria-valuemax', '100');
  await expect(meter).toHaveAttribute('aria-valuetext', '68%');
  await expect(page.locator('[data-slot=meter-value]')).toHaveText('68%');
  await expect(page.locator('[data-slot=meter-value]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  await expect.poll(() => fill(page)).toBeCloseTo(0.68, 2);
});

test('Bounds: 720 between 300 and 850, written as itself', async ({ page }) => {
  await page.goto(demo('bounds-meter'));
  const meter = page.getByRole('meter', { name: 'Credit score' });
  await expect(meter).toHaveAttribute('aria-valuetext', '720');
  await expect(meter).toHaveAttribute('style', /--sc-meter-value: 76\.36/);
  await expect.poll(() => fill(page)).toBeCloseTo(420 / 550, 2);
});

test('Format: a unit, a currency, a function', async ({ page }) => {
  await page.goto(demo('format-meter'));
  await expect(page.locator('[data-slot=meter-value]')).toHaveText([
    '120 GB',
    '$1,840',
    '18 of 25 seats',
  ]);
  await expect(page.getByRole('meter', { name: 'Seats' })).toHaveAttribute(
    'aria-valuetext',
    '18 of 25 seats',
  );
});

test('Locale: the percent in German', async ({ page }) => {
  await page.goto(demo('locale-meter'));
  await expect(page.getByRole('meter', { name: 'Auslastung' })).toHaveAttribute(
    'aria-valuetext',
    '40 %',
  );
});

test('Value label: more words for screen readers', async ({ page }) => {
  await page.goto(demo('value-label-meter'));
  await expect(
    page.getByRole('meter', { name: 'API requests' }),
  ).toHaveAttribute('aria-valuetext', '750 of 1000 requests, 75%');
  await expect(page.locator('[data-slot=meter-value]')).toHaveText(
    '750 / 1,000',
  );
});

test('RTL: the bar fills from the right', async ({ page }) => {
  await page.goto(demo('rtl-meter'));
  await expect.poll(() => fill(page)).toBeCloseTo(0.68, 2);
  const track = await page.locator('[data-slot=meter-track]').boundingBox();
  const bar = await indicator(page).boundingBox();
  expect(
    Math.abs(
      (track?.x ?? 0) +
        (track?.width ?? 0) -
        ((bar?.x ?? 0) + (bar?.width ?? 0)),
    ),
  ).toBeLessThan(1);
});
