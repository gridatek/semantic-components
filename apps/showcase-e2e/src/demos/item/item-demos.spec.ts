import { type Page } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/item/${name}-item-demo`;
const items = (page: Page) => page.locator('[data-slot="item"]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: an item with its action; a link item named by its text', async ({
  page,
}) => {
  await page.goto('/demos/item/item-usage-demo');
  await expect(items(page)).toHaveCount(2);
  await expect(
    page.getByRole('link', { name: 'Your profile has been verified.' }),
  ).toHaveAttribute('href', '#usage');
});

test('Variant and Size: each marked; smaller each time', async ({ page }) => {
  await page.goto(demo('variant'));
  const variants = await items(page).evaluateAll((all) =>
    all.map((i) => i.getAttribute('data-variant')),
  );
  expect(variants).toEqual(['default', 'outline', 'muted']);
  await expect(items(page).nth(1)).toHaveCSS('border-top-style', 'solid');

  await page.goto(demo('size'));
  await expect(items(page)).toHaveCount(3);
  const heights = await items(page).evaluateAll((all) =>
    all.map((i) => i.getBoundingClientRect().height),
  );
  expect(heights[0]).toBeGreaterThanOrEqual(heights[1]);
  expect(heights[1]).toBeGreaterThan(heights[2]);
});

test('Image and Group: square images; a group said to be a list', async ({
  page,
}) => {
  await page.goto(demo('group'));
  await expect(page.getByRole('list')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(3);
  await page.goto(demo('image'));
  const media = await box(page.locator('[data-slot="item-media"]').first());
  expect(Math.abs(media.width - media.height)).toBeLessThan(2);
});

test('Link: to a new tab, it says so', async ({ page }) => {
  await page.goto(demo('link'));
  await expect(
    page.getByRole('link', {
      name: /External resource \(opens in a new tab\)/,
    }),
  ).toHaveAttribute('target', '_blank');
});

test('Dropdown: items in the menu’s items, no padding of their own', async ({
  page,
}) => {
  await page.goto(demo('dropdown'));
  await page.getByRole('button', { name: 'Select' }).click();
  await expect(page.getByRole('menuitem')).toHaveCount(3);
  await expect(
    page.getByRole('menuitem').first().locator('[data-slot="item"]'),
  ).toHaveCSS('padding-top', '0px');
});

test('RTL: the media on the right, the actions on the left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const first = items(page).first();
  await expectRtl(first);
  const [media, actions] = [
    await box(first.locator('[data-slot="item-media"]')),
    await box(first.getByRole('button')),
  ];
  expect(media.x).toBeGreaterThan(actions.x);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['variant', 'avatar', 'header', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
