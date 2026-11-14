import { type Page } from '@playwright/test';
import { collectErrors, focus, openMenuCount, press } from '../../interaction';
import { box, openStill } from '../../looks';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/menu/${name}-menu-demo`;

/** The item with data-highlighted, if one is. */
const highlighted = (page: Page) => page.locator('[data-highlighted]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a click opens the menu, an item closes it, focus back on the trigger', async ({
  page,
}) => {
  await openStill(page, '/demos/menu/menu-usage-demo');
  const trigger = page.getByRole('button', { name: 'Open' });
  await expect(trigger).toHaveAttribute('aria-haspopup', 'true');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('group', { name: 'My Account' })).toBeVisible();
  await page.getByRole('menuitem', { name: 'Billing' }).click();
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('Highlight: none after a click open; the first ArrowDown shows the first item, then moves', async ({
  page,
}) => {
  await openStill(page, demo('basic'));
  await page.getByRole('button', { name: 'Open' }).click();
  await expect(page.getByRole('menu')).toBeVisible();
  await expect(highlighted(page)).toHaveCount(0);
  await press(page, 'ArrowDown');
  await expect(highlighted(page)).toHaveText('Profile');
  await press(page, 'ArrowDown');
  await expect(highlighted(page)).toHaveText('Billing');
  // The pointer highlights what it is over.
  await page.getByRole('menuitem', { name: 'Settings' }).hover();
  await expect(highlighted(page)).toHaveText('Settings');
});

test('Keyboard: Enter opens on the first item; a disabled one is reached, not chosen; Escape closes', async ({
  page,
}) => {
  await openStill(page, demo('basic'));
  const trigger = page.getByRole('button', { name: 'Open' });
  await focus(trigger);
  await press(page, 'Enter');
  await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeFocused();
  await expect(highlighted(page)).toHaveText('Profile');
  // The last item, API, is disabled: reached, so it is read, but Enter does
  // nothing.
  await press(page, 'End');
  const api = page.getByRole('menuitem', { name: 'API' });
  await expect(api).toBeFocused();
  await expect(api).toHaveAttribute('aria-disabled', 'true');
  await press(page, 'Enter');
  await expect(page.getByRole('menu')).toBeVisible();
  await press(page, 'Escape');
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Tab closes the menu and moves on', async ({ page }) => {
  await openStill(page, demo('basic'));
  const trigger = page.getByRole('button', { name: 'Open' });
  await focus(trigger);
  await press(page, 'Enter');
  await expect(page.getByRole('menu')).toBeVisible();
  await press(page, 'Tab');
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(trigger).not.toBeFocused();
});

test('Checkboxes: a click toggles an item, the menu stays open; a disabled one does not toggle', async ({
  page,
}) => {
  await openStill(page, demo('checkboxes'));
  await page.getByRole('button', { name: 'Open' }).click();
  const statusBar = page.getByRole('menuitemcheckbox', { name: 'Status Bar' });
  const panel = page.getByRole('menuitemcheckbox', { name: 'Panel' });
  await expect(statusBar).toHaveAttribute('aria-checked', 'true');
  await expect(panel).toHaveAttribute('aria-checked', 'false');
  // The check shows only when on.
  await expect(panel.locator('[scMenuItemIndicator]')).toHaveCSS(
    'visibility',
    'hidden',
  );
  await panel.click();
  await expect(panel).toHaveAttribute('aria-checked', 'true');
  await expect(panel.locator('[scMenuItemIndicator]')).toHaveCSS(
    'visibility',
    'visible',
  );
  await expect(page.getByRole('menu')).toBeVisible();
  // By keyboard: Space toggles.
  await statusBar.hover();
  await press(page, ' ');
  await expect(statusBar).toHaveAttribute('aria-checked', 'false');
  await expect(page.getByRole('menu')).toBeVisible();
  const activityBar = page.getByRole('menuitemcheckbox', {
    name: 'Activity Bar',
  });
  // Disabled: no pointer on it; a click sent anyway changes nothing.
  await activityBar.dispatchEvent('click');
  await expect(activityBar).toHaveAttribute('aria-checked', 'false');
  await expect(page.getByRole('group', { name: 'Appearance' })).toBeVisible();
});

test('Radio Group: a click chooses one, the menu stays open', async ({
  page,
}) => {
  await openStill(page, demo('radio-group'));
  await page.getByRole('button', { name: 'Open' }).click();
  const radio = (name: string) => page.getByRole('menuitemradio', { name });
  await expect(radio('Bottom')).toHaveAttribute('aria-checked', 'true');
  await radio('Right').click();
  await expect(radio('Right')).toHaveAttribute('aria-checked', 'true');
  await expect(radio('Bottom')).toHaveAttribute('aria-checked', 'false');
  await expect(page.getByRole('menu')).toBeVisible();
  // By keyboard: Enter chooses.
  await radio('Top').hover();
  await press(page, 'Enter');
  await expect(radio('Top')).toHaveAttribute('aria-checked', 'true');
  await expect(radio('Right')).toHaveAttribute('aria-checked', 'false');
});

test('Destructive: the item in the destructive color', async ({ page }) => {
  await openStill(page, demo('destructive'));
  await page.getByRole('button', { name: 'Open' }).click();
  const remove = page.getByRole('menuitem', { name: 'Delete' });
  await expect(remove).toHaveAttribute('data-variant', 'destructive');
  const color = (name: string) =>
    page
      .getByRole('menuitem', { name })
      .evaluate((element) => getComputedStyle(element).color);
  expect(await color('Delete')).not.toBe(await color('Edit'));
});

test('Submenu: ArrowRight opens it on its first item, ArrowLeft closes it; nested too', async ({
  page,
}) => {
  await openStill(page, demo('submenu'));
  const trigger = page.getByRole('button', { name: 'Open' });
  await focus(trigger);
  await press(page, 'Enter');
  await press(page, 'ArrowDown');
  const invite = page.getByRole('menuitem', { name: 'Invite users' });
  await expect(invite).toBeFocused();
  await expect(invite).toHaveAttribute('aria-haspopup', 'true');
  await press(page, 'ArrowRight');
  await expect(page.getByRole('menuitem', { name: 'Email' })).toBeFocused();
  await expect(invite).toHaveAttribute('aria-expanded', 'true');
  const [parent, sub] = [
    await box(page.getByRole('menu').first()),
    await box(page.getByRole('menu').nth(1)),
  ];
  // At the reading end, 4px from its menu, whatever the preset's padding.
  expect(sub.x - (parent.x + parent.width)).toBeCloseTo(4, 0);
  // Its first row level with the item that opened it.
  const [opener, first] = [
    await box(invite),
    await box(page.getByRole('menuitem', { name: 'Email' })),
  ];
  expect(first.y).toBeCloseTo(opener.y, 0);
  await press(page, 'ArrowDown');
  await press(page, 'ArrowDown');
  await press(page, 'ArrowRight');
  await expect(page.getByRole('menuitem', { name: 'Calendly' })).toBeFocused();
  await expect.poll(() => openMenuCount(page)).toBe(3);
  await press(page, 'ArrowLeft');
  await expect(
    page.getByRole('menuitem', { name: 'More options' }),
  ).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(invite).toBeFocused();
  await expect.poll(() => openMenuCount(page)).toBe(1);
  // The pointer opens it too; choosing in it closes everything.
  await invite.hover();
  await page.getByRole('menuitem', { name: 'Message' }).click();
  await expect.poll(() => openMenuCount(page)).toBe(0);
});

test('Standalone: shown with no trigger, nothing highlighted until used; one tab stop; Enter chooses; its submenu', async ({
  page,
}) => {
  await openStill(page, demo('standalone'));
  const menu = page.getByRole('menu', { name: 'Edit' });
  await expect(menu).toBeVisible();
  await expect(highlighted(page)).toHaveCount(0);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('menuitem', { name: 'Cut' })).toBeFocused();
  await expect(highlighted(page)).toHaveText('Cut');
  await press(page, 'ArrowDown');
  await press(page, 'Enter');
  await expect(page.getByText('Chosen: Copy')).toBeVisible();
  // Still shown: there is nothing to close.
  await expect(menu).toBeVisible();
  // Its submenu: ArrowRight opens it on its first item; choosing there
  // closes it, the menu stays.
  await press(page, 'End');
  await press(page, 'ArrowUp');
  await expect(page.getByRole('menuitem', { name: 'Share' })).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(page.getByRole('menuitem', { name: 'Email' })).toBeFocused();
  await press(page, 'ArrowDown');
  await press(page, 'Enter');
  await expect(page.getByText('Chosen: Message')).toBeVisible();
  await expect.poll(() => openMenuCount(page)).toBe(1);
  await expect(menu).toBeVisible();
  // Tab leaves it; the highlight goes with the focus. A button after it to
  // go to: past the page's last stop, headless Firefox keeps the focus
  // where it was (there is no browser UI to take it).
  await page.evaluate(() => {
    const after = document.createElement('button');
    after.textContent = 'After the menu';
    document.body.append(after);
  });
  await press(page, 'Tab');
  await expect(
    page.getByRole('button', { name: 'After the menu' }),
  ).toBeFocused();
  await expect(highlighted(page)).toHaveCount(0);
  // The pointer highlights what it is over, and chooses.
  await page.getByRole('menuitem', { name: 'Paste' }).click();
  await expect(page.getByText('Chosen: Paste')).toBeVisible();
});

test('RTL: the menu takes its trigger’s direction and language; the submenu opens to the left, ArrowLeft opens it', async ({
  page,
}) => {
  await openStill(page, demo('rtl'));
  const trigger = page.getByRole('button', { name: 'فتح' });
  await focus(trigger);
  await press(page, 'Enter');
  const menu = page.getByRole('menu').first();
  await expectRtl(menu);
  await expect(menu).toHaveAttribute('lang', 'ar');
  const invite = page.getByRole('menuitem', { name: 'دعوة مستخدمين' });
  await invite.hover();
  await press(page, 'ArrowLeft');
  await expect(page.getByRole('menuitem', { name: 'البريد' })).toBeFocused();
  const [parent, sub] = [
    await box(menu),
    await box(page.getByRole('menu').nth(1)),
  ];
  expect(parent.x - (sub.x + sub.width)).toBeCloseTo(4, 0);
  await press(page, 'ArrowRight');
  await expect(invite).toBeFocused();
});

test('On a phone: the demos fit, every target 24px; a tap opens the menu @mobile', async ({
  page,
}) => {
  for (const name of ['basic', 'submenu', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
  await page.goto('/demos/menu/menu-usage-demo');
  await page.getByRole('button', { name: 'Open' }).tap();
  await expect(page.getByRole('menu')).toBeVisible();
  await expectTargetSize(page.getByRole('menu'), 24);
});
