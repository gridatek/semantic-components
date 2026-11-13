import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/avatar/${name}-avatar-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: a lazy image loads in place and covers the fallback', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const avatar = page.locator('[scAvatar]');
  const image = page.getByRole('img', { name: 'Jordan Lee' });
  await expect(image).toHaveAttribute('loading', 'lazy');
  // Loaded: shown, the fallback gone (it would never load with display: none).
  await expect(avatar).toHaveAttribute('data-image', 'loaded');
  await expect(image).not.toHaveAttribute('data-loading');
  await expect(image).toHaveCSS('visibility', 'visible');
  await expect(page.getByText('JL', { exact: true })).toBeHidden();
});

test('Fallback: a broken image is invisible, the initials show; none at all, the same', async ({
  page,
}) => {
  await page.goto(demo('fallback'));
  const [broken, none] = [
    page.locator('[scAvatar]').first(),
    page.locator('[scAvatar]').nth(1),
  ];
  await expect(broken).toHaveAttribute('data-image', 'error');
  const image = broken.locator('img');
  await expect(image).toHaveAttribute('data-error');
  await expect(image).toHaveCSS('visibility', 'hidden');
  await expect(broken.getByText('JD')).toBeVisible();
  await expect(none).toHaveAttribute('data-image', 'idle');
  await expect(none.getByText('AB')).toBeVisible();
});

test('Badge: a dot in the end-bottom corner', async ({ page }) => {
  await page.goto(demo('badge'));
  const [a, b] = [
    await box(page.locator('[scAvatar]')),
    await box(page.locator('[scAvatarBadge]')),
  ];
  expect(Math.abs(a.x + a.width - (b.x + b.width))).toBeLessThan(1);
  expect(Math.abs(a.y + a.height - (b.y + b.height))).toBeLessThan(1);
  expect(b.width).toBeCloseTo(10, 0);
});

test('Avatar Group Count: overlapping avatars, then how many more', async ({
  page,
}) => {
  await page.goto(demo('group-count'));
  const avatars = page.locator('[scAvatar]');
  const [first, second] = [
    await box(avatars.first()),
    await box(avatars.nth(1)),
  ];
  // Overlapping: the second starts before the first ends.
  expect(second.x).toBeLessThan(first.x + first.width);
  await expect(page.locator('[scAvatarGroupCount]')).toHaveText('+3');
});

test('Sizes: 24, 32 and 40 pixels', async ({ page }) => {
  await page.goto(demo('sizes'));
  const avatars = page.locator('[scAvatar]');
  const widths = [];
  for (const i of [0, 1, 2]) widths.push((await box(avatars.nth(i))).width);
  expect(widths).toEqual([24, 32, 40]);
});

test('Dropdown: a round button named Account opens the menu', async ({
  page,
}) => {
  await page.goto(demo('dropdown'));
  await page.getByRole('button', { name: 'Account' }).click();
  await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Log out' })).toBeVisible();
});

test('RTL: the group overlaps from the right, the badge at the bottom left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const withBadge = page.locator('[scAvatar]').first();
  await expectRtl(withBadge);
  const [a, b] = [
    await box(withBadge),
    await box(withBadge.locator('[scAvatarBadge]')),
  ];
  expect(Math.abs(b.x - a.x)).toBeLessThan(1);
  const group = page.locator('[scAvatarGroup] [scAvatar]');
  const [first, second] = [await box(group.first()), await box(group.nth(1))];
  expect(second.x).toBeLessThan(first.x);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['group-count', 'sizes', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
