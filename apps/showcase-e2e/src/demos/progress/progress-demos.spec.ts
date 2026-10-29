import { collectErrors } from '../../interaction';
import { expectRtl } from '../../rtl';
import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/progress/${name}-progress-demo`;
const bars = (page: Page) => page.getByRole('progressbar');

/** The bar's filled share of its track. */
const filled = (page: Page) =>
  page
    .locator('[data-slot=progress-indicator]')
    .first()
    .evaluate((range) => {
      const track = range.parentElement as HTMLElement;
      return Math.round((range.clientWidth / track.clientWidth) * 100);
    });

/** An element's box — it must have one. */
const box = async (locator: Locator) => {
  const found = await locator.boundingBox();
  if (!found) throw new Error(`no box: ${locator}`);
  return found;
};

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Bar: named by its label, its value text read', async ({ page }) => {
  await page.goto(demo('basic'));
  const bar = page.getByRole('progressbar', { name: 'Uploading' });
  await expect(bar).toHaveAttribute('aria-valuenow', '33');
  await expect(bar).toHaveAttribute('aria-valuemin', '0');
  await expect(bar).toHaveAttribute('aria-valuemax', '100');
  await expect(bar).toHaveAttribute('aria-valuetext', '33%');
  await expect(bar).toHaveAttribute('data-state', 'loading');
  await expect.poll(() => filled(page)).toBe(33);
});

test('Circle: an arc as long as the value, the text in its middle', async ({
  page,
}) => {
  await page.goto(demo('circle'));
  await expect(bars(page)).toHaveCount(6);
  const range = (index: number) =>
    bars(page).nth(index).locator('[data-slot=progress-circle-range]');
  await expect(range(0)).toHaveAttribute('visibility', 'hidden');
  await expect(range(1)).toHaveAttribute('stroke-dashoffset', '75');
  await expect(range(4)).toHaveAttribute('stroke-dashoffset', '0');
  await expect(bars(page).nth(4)).toHaveAttribute('data-state', 'complete');
  // The value text over the circle's middle.
  const circle = await box(bars(page).nth(2));
  const text = await box(
    bars(page).nth(2).locator('[data-slot=progress-value]'),
  );
  expect(
    Math.abs(circle.x + circle.width / 2 - (text.x + text.width / 2)),
  ).toBeLessThan(2);
});

test('Indeterminate: no value, still moving', async ({ page }) => {
  await page.goto(demo('indeterminate'));
  const bar = page.getByRole('progressbar', { name: 'Connecting' });
  await expect(bar).toHaveAttribute('data-state', 'indeterminate');
  await expect(bar).not.toHaveAttribute('aria-valuenow');
  await expect
    .poll(() =>
      bar
        .locator('[data-slot=progress-indicator]')
        .evaluate((range) => range.getAnimations().length),
    )
    .toBe(1);
  await expect(
    page.getByRole('progressbar', { name: 'Loading' }).locator('svg'),
  ).toHaveCSS('animation-name', 'spin');
});

test('Indeterminate: still when motion is reduced', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(demo('indeterminate'));
  const bar = page.getByRole('progressbar', { name: 'Connecting' });
  await expect(bar).toHaveAttribute('data-state', 'indeterminate');
  expect(
    await bar
      .locator('[data-slot=progress-indicator]')
      .evaluate((range) => range.getAnimations().length),
  ).toBe(0);
  await expect(
    page.getByRole('progressbar', { name: 'Loading' }).locator('svg'),
  ).toHaveCSS('animation-name', 'none');
});

test('Min and Max: out of 5 steps, as they change', async ({ page }) => {
  await page.goto(demo('steps'));
  const bar = page.getByRole('progressbar', { name: 'Setup' }).first();
  await expect(bar).toHaveAttribute('aria-valuemax', '5');
  await expect(bar).toHaveAttribute('aria-valuetext', '2 of 5 steps');
  await expect.poll(() => filled(page)).toBe(40);
  await page.getByRole('button', { name: 'Next step' }).click();
  await expect(bar).toHaveAttribute('aria-valuenow', '3');
  await expect(bar).toHaveAttribute('aria-valuetext', '3 of 5 steps');
  await expect.poll(() => filled(page)).toBe(60);
});

test('RTL: the bar fills from the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const bar = page.getByRole('progressbar', { name: 'التحميل' }).first();
  await expectRtl(bar);
  const track = await box(bar.locator('[data-slot=progress-track]'));
  const range = await box(bar.locator('[data-slot=progress-indicator]'));
  expect(
    Math.abs(track.x + track.width - (range.x + range.width)),
  ).toBeLessThan(1);
});

test('Download: the ring turns while the percentage climbs', async ({
  page,
}) => {
  await page.goto(demo('download'));
  const progress = page.getByRole('progressbar', {
    name: 'Downloading report.pdf',
  });
  const ring = progress.locator('svg');
  await expect(progress).toHaveAttribute('aria-valuetext', '0%');
  await expect(ring).toHaveCSS('animation-name', 'none');
  await page.getByRole('button', { name: 'Download' }).click();
  await expect(ring).toHaveCSS('animation-name', 'spin');
  // The value stays known while it turns.
  await expect
    .poll(async () => Number(await progress.getAttribute('aria-valuenow')))
    .toBeGreaterThan(0);
  await expect(progress).toHaveAttribute('data-state', 'complete', {
    timeout: 15_000,
  });
  await expect(progress).toHaveAttribute('aria-valuetext', '100%');
  await expect(ring).toHaveCSS('animation-name', 'none');
});

test('Download: with motion reduced, the arc to the value', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(demo('download'));
  const progress = page.getByRole('progressbar', {
    name: 'Downloading report.pdf',
  });
  await page.getByRole('button', { name: 'Download' }).click();
  await expect
    .poll(async () => Number(await progress.getAttribute('aria-valuenow')))
    .toBeGreaterThan(0);
  await expect(progress.locator('svg')).toHaveCSS('animation-name', 'none');
  const now = Number(await progress.getAttribute('aria-valuenow'));
  const offset = Number(
    await progress
      .locator('[data-slot=progress-circle-range]')
      .getAttribute('stroke-dashoffset'),
  );
  // The arc follows the value (allowing for one more chunk in between).
  expect(Math.abs(100 - offset - now)).toBeLessThanOrEqual(12);
});
