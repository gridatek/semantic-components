import { type Page } from '@playwright/test';
import { collectErrors, focus, openMenuCount, press } from '../../interaction';
import { box, openStill } from '../../looks';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/menu-bar/${name}-menu-bar-demo`;
const usage = '/demos/menu-bar/menu-bar-usage-demo';

/** A bar item, by its text. */
const barItem = (page: Page, name: string) =>
  page.getByRole('menubar').getByRole('menuitem', { name, exact: true });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a click opens a menu 8px below its item, 4px toward the start; nothing highlighted', async ({
  page,
}) => {
  await openStill(page, usage);
  await expect(page.getByRole('menubar', { name: 'Browser' })).toBeVisible();
  const file = barItem(page, 'File');
  await file.click();
  await expect(file).toHaveAttribute('aria-expanded', 'true');
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();
  await expect(page.locator('[data-highlighted]')).toHaveCount(0);
  const [item, popup] = [await box(file), await box(menu)];
  expect(popup.y - (item.y + item.height)).toBeCloseTo(8, 0);
  expect(item.x - popup.x).toBeCloseTo(4, 0);
  // An item chosen closes it; focus back on the bar.
  await page.getByRole('menuitem', { name: 'New Tab' }).click();
  await expect.poll(() => openMenuCount(page)).toBe(0);
});

test('Keyboard: the bar is one tab stop; ArrowRight moves along it, ArrowDown opens on the first item, Escape closes', async ({
  page,
}) => {
  await openStill(page, usage);
  const file = barItem(page, 'File');
  await focus(file);
  await press(page, 'ArrowRight');
  await expect(barItem(page, 'Edit')).toBeFocused();
  await press(page, 'ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Undo' })).toBeFocused();
  // With a menu open, ArrowRight opens the next item's.
  await press(page, 'ArrowRight');
  await expect(barItem(page, 'View')).toHaveAttribute('aria-expanded', 'true');
  await press(page, 'Escape');
  await expect.poll(() => openMenuCount(page)).toBe(0);
  await expect(barItem(page, 'View')).toBeFocused();
});

test('Escape on a bar item closes its menu', async ({ page }) => {
  await openStill(page, usage);
  const file = barItem(page, 'File');
  await file.click();
  await expect.poll(() => openMenuCount(page)).toBe(1);
  await press(page, 'Escape');
  await expect.poll(() => openMenuCount(page)).toBe(0);
  await expect(file).toBeFocused();
  await expect(file).toHaveAttribute('aria-expanded', 'false');
});

test('Type-ahead on the bar', async ({ page }) => {
  await openStill(page, usage);
  await focus(barItem(page, 'File'));
  await press(page, 'v');
  await expect(barItem(page, 'View')).toBeFocused();
});

test('Tab out of an open menu leaves the bar', async ({ page }) => {
  // On the docs page: there is something after the bar to go to.
  await page.goto('/docs/components/menu-bar');
  await focus(
    page
      .getByRole('menubar')
      .first()
      .getByRole('menuitem', { name: 'File', exact: true }),
  );
  await press(page, 'ArrowDown');
  await expect.poll(() => openMenuCount(page)).toBe(1);
  await press(page, 'Tab');
  await expect.poll(() => openMenuCount(page)).toBe(0);
  await expect
    .poll(() =>
      page.evaluate(() => !!document.activeElement?.closest('[role=menubar]')),
    )
    .toBe(false);
});

test('Checkbox: a click toggles, the menu stays open; the check at the start', async ({
  page,
}) => {
  await openStill(page, demo('checkbox'));
  await barItem(page, 'View').click();
  const bookmarks = page.getByRole('menuitemcheckbox', {
    name: 'Always Show Bookmarks Bar',
  });
  await expect(bookmarks).toHaveAttribute('aria-checked', 'false');
  await bookmarks.click();
  await expect(bookmarks).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByRole('menu')).toBeVisible();
  const [row, check] = [
    await box(bookmarks),
    await box(bookmarks.locator('[scMenuItemIndicator]')),
  ];
  expect(check.x - row.x).toBeLessThan(row.width / 4);
});

test('Radio: a click chooses one, the menu stays open', async ({ page }) => {
  await openStill(page, demo('radio'));
  await barItem(page, 'Theme').click();
  const radio = (name: string) => page.getByRole('menuitemradio', { name });
  await expect(radio('System')).toHaveAttribute('aria-checked', 'true');
  await radio('Dark').click();
  await expect(radio('Dark')).toHaveAttribute('aria-checked', 'true');
  await expect(radio('System')).toHaveAttribute('aria-checked', 'false');
  await expect(page.getByRole('menu')).toBeVisible();
});

test('Submenu: ArrowRight opens it on its first item, beside the menu', async ({
  page,
}) => {
  await openStill(page, demo('submenu'));
  await focus(barItem(page, 'File'));
  await press(page, 'ArrowDown');
  const share = page.getByRole('menuitem', { name: 'Share' });
  await expect(share).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(
    page.getByRole('menuitem', { name: 'Email link' }),
  ).toBeFocused();
  const [parent, sub] = [
    await box(page.getByRole('menu').first()),
    await box(page.getByRole('menu').nth(1)),
  ];
  expect(sub.x - (parent.x + parent.width)).toBeCloseTo(4, 0);
  await press(page, 'ArrowLeft');
  await expect(share).toBeFocused();
});

test('With Icons: a destructive item in the destructive color', async ({
  page,
}) => {
  await openStill(page, demo('icons'));
  await barItem(page, 'More').click();
  await expect(page.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute(
    'data-variant',
    'destructive',
  );
});

test('RTL: the bar from the right; its menu under the item’s right edge, right to left; ArrowLeft moves on', async ({
  page,
}) => {
  await openStill(page, demo('rtl'));
  const bar = page.getByRole('menubar', { name: 'المتصفح' });
  await expectRtl(bar);
  const file = barItem(page, 'ملف');
  await file.click();
  const menu = page.getByRole('menu');
  await expectRtl(menu);
  const [item, popup] = [await box(file), await box(menu)];
  expect(popup.x + popup.width - (item.x + item.width)).toBeCloseTo(4, 0);
  await press(page, 'Escape');
  await expect(file).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(barItem(page, 'تعديل')).toBeFocused();
});

test('On a phone: the demos fit, every target 24px; a tap opens a menu @mobile', async ({
  page,
}) => {
  for (const name of ['checkbox', 'submenu', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
  await page.goto(usage);
  await barItem(page, 'File').tap();
  await expect(page.getByRole('menu')).toBeVisible();
});
