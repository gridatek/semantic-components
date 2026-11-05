import { type Page } from '@playwright/test';
import { collectErrors, focus, openMenuCount, press } from '../../interaction';
import { box, openStill } from '../../looks';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/context-menu/${name}-context-menu-demo`;
const usage = '/demos/context-menu/context-menu-usage-demo';

const highlighted = (page: Page) => page.locator('[data-highlighted]');

/** Right-clicks the middle of the nth area; returns where. */
async function rightClick(page: Page, nth = 0) {
  const area = await box(page.locator('[scContextMenuTrigger]').nth(nth));
  const at = { x: area.x + area.width / 2, y: area.y + area.height / 2 };
  await page.mouse.click(at.x, at.y, { button: 'right' });
  // Keys go to it once it is there.
  await expect(page.getByRole('menu').first()).toBeVisible();
  return at;
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a right-click opens the menu at the pointer, nothing highlighted; ArrowDown shows the first item', async ({
  page,
}) => {
  await openStill(page, usage);
  // Not in the page until it opens: it is in a portal.
  await expect(page.locator('[role=menu]')).toHaveCount(0);
  const at = await rightClick(page);
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();
  const popup = await box(menu);
  // At the reading end of the pointer, 4px down.
  expect(popup.x - at.x).toBeCloseTo(0, 0);
  expect(popup.y - at.y).toBeCloseTo(4, 0);
  await expect(highlighted(page)).toHaveCount(0);
  await press(page, 'ArrowDown');
  await expect(highlighted(page)).toHaveText(/^\s*Back/);
  // A choice closes it.
  await page.getByRole('menuitem', { name: /Reload/ }).click();
  await expect.poll(() => openMenuCount(page)).toBe(0);
});

test('Keyboard: the area takes focus; the contextmenu event opens on the first item; Escape gives focus back', async ({
  page,
}) => {
  await openStill(page, demo('basic'));
  const area = page.locator('[scContextMenuTrigger]');
  await focus(area);
  // What the Menu key or Shift+F10 make the browser fire on the focused area.
  await area.dispatchEvent('contextmenu', { bubbles: true, cancelable: true });
  await expect.poll(() => openMenuCount(page)).toBe(1);
  await expect(highlighted(page)).toHaveText('Back');
  await press(page, 'Escape');
  await expect.poll(() => openMenuCount(page)).toBe(0);
  await expect(area).toBeFocused();
});

test('Keyboard: Shift+F10 opens on the first item', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    "Playwright's Firefox and WebKit don't turn Shift+F10 into the contextmenu event (Firefox itself does, on Windows and Linux)",
  );
  await openStill(page, demo('basic'));
  await focus(page.locator('[scContextMenuTrigger]'));
  await press(page, 'Shift+F10');
  await expect.poll(() => openMenuCount(page)).toBe(1);
  await expect(highlighted(page)).toHaveText('Back');
});

test('Checkboxes: a click toggles an item, the menu stays open', async ({
  page,
}) => {
  await openStill(page, demo('checkboxes'));
  await rightClick(page);
  const urls = page.getByRole('menuitemcheckbox', { name: 'Show Full URLs' });
  await expect(urls).toHaveAttribute('aria-checked', 'false');
  await urls.click();
  await expect(urls).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByRole('menu')).toBeVisible();
});

test('Radio: a click chooses one, the menu stays open; groups named by their labels', async ({
  page,
}) => {
  await openStill(page, demo('radio'));
  await rightClick(page);
  await expect(page.getByRole('group', { name: 'Theme' })).toBeVisible();
  const radio = (name: string) => page.getByRole('menuitemradio', { name });
  await expect(radio('Light')).toHaveAttribute('aria-checked', 'true');
  await radio('Dark').click();
  await expect(radio('Dark')).toHaveAttribute('aria-checked', 'true');
  await expect(radio('Light')).toHaveAttribute('aria-checked', 'false');
  await expect(page.getByRole('menu')).toBeVisible();
});

test('Submenu: ArrowRight opens it on its first item, beside the menu', async ({
  page,
}) => {
  await openStill(page, demo('submenu'));
  await rightClick(page);
  await press(page, 'End');
  const more = page.getByRole('menuitem', { name: 'More Tools' });
  await expect(more).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(
    page.getByRole('menuitem', { name: 'Save Page...' }),
  ).toBeFocused();
  const [parent, sub] = [
    await box(page.getByRole('menu').first()),
    await box(page.getByRole('menu').nth(1)),
  ];
  expect(sub.x - (parent.x + parent.width)).toBeCloseTo(4, 0);
});

test('Sides: start opens the menu before the pointer, bottom below it', async ({
  page,
}) => {
  await openStill(page, demo('sides'));
  // The areas: top, end, bottom, start.
  let at = await rightClick(page, 3);
  let popup = await box(page.getByRole('menu'));
  expect(at.x - (popup.x + popup.width)).toBeCloseTo(0, 0);
  await press(page, 'Escape');
  await expect.poll(() => openMenuCount(page)).toBe(0);
  at = await rightClick(page, 2);
  popup = await box(page.getByRole('menu'));
  expect(popup.y - at.y).toBeCloseTo(0, 0);
  expect(popup.x - at.x).toBeCloseTo(4, 0);
});

test('RTL: the menu right to left, before the pointer; its submenu to the left', async ({
  page,
}) => {
  await openStill(page, demo('rtl'));
  const at = await rightClick(page);
  const menu = page.getByRole('menu').first();
  await expectRtl(menu);
  await expect(menu).toHaveAttribute('lang', 'ar');
  const popup = await box(menu);
  expect(at.x - (popup.x + popup.width)).toBeCloseTo(0, 0);
  await page.getByRole('menuitem', { name: 'التنقل' }).hover();
  const sub = await box(page.getByRole('menu').nth(1));
  expect(popup.x - (sub.x + sub.width)).toBeCloseTo(4, 0);
});

test('On a phone: the demos fit, every target 24px @mobile', async ({
  page,
}) => {
  for (const name of ['basic', 'sides', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});
