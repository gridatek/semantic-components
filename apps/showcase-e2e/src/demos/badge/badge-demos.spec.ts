import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/badge/${name}-badge-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Variants: each its own look', async ({ page }) => {
  await page.goto(demo('variants'));
  const badges = page.locator('[scBadge]');
  await expect(badges).toHaveText([
    'Default',
    'Secondary',
    'Destructive',
    'Outline',
    'Ghost',
  ]);
  const looks = await badges.evaluateAll((all) =>
    all.map((badge) => {
      const style = getComputedStyle(badge);
      return `${style.backgroundColor} ${style.color} ${style.borderColor}`;
    }),
  );
  expect(new Set(looks).size).toBe(looks.length);
});

test('With Icon: less padding on the icon’s side', async ({ page }) => {
  await page.goto(demo('icon'));
  const verified = page.locator('[scBadge]', { hasText: 'Verified' });
  const start = parseFloat(
    await verified.evaluate((el) => getComputedStyle(el).paddingInlineStart),
  );
  const end = parseFloat(
    await verified.evaluate((el) => getComputedStyle(el).paddingInlineEnd),
  );
  expect(start).toBeLessThan(end);
});

test('With Spinner: the spinner a named status, turning', async ({ page }) => {
  await page.goto(demo('spinner'));
  const spinners = page.getByRole('status', { name: 'Loading' });
  await expect(spinners).toHaveCount(2);
  await expect(spinners.first()).not.toHaveCSS('animation-name', 'none');
});

test('Link: a link, followed', async ({ page }) => {
  await page.goto(demo('link'));
  await page.getByRole('link', { name: 'Open Link' }).click();
  await expect(page).toHaveURL(/\/docs\/components\/button$/);
});

test('Custom Colors: your classes over the preset’s', async ({ page }) => {
  await page.goto(demo('colors'));
  const blue = page.locator('[scBadge]', { hasText: 'Blue' });
  await expect(blue).toHaveClass(/bg-blue-50/);
  await expect(blue).not.toHaveClass(/bg-primary/);
});

test('RTL: from the right, the icon at the start', async ({ page }) => {
  await page.goto(demo('rtl'));
  const badges = page.locator('[scBadge]');
  await expectRtl(badges.first());
  await expectInlineOrder([badges.first(), badges.nth(1), badges.nth(2)]);
  // The icon at the start: in the badge's right half.
  const verified = badges.nth(1);
  const [b, i] = [await box(verified), await box(verified.locator('svg'))];
  expect(i.x).toBeGreaterThan(b.x + b.width / 2);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['variants', 'icon', 'spinner', 'link', 'colors', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
