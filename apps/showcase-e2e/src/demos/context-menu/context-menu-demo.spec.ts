import { expect, test } from '@playwright/test';
import { collectErrors, openMenuCount, press } from '../../interaction';

test.describe('Context Menu Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/context-menu/context-menu-demo');
    await expect(page.locator('[scContextMenuTrigger]')).toBeVisible();
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('right-click opens; picking reports the action', async ({ page }) => {
    await page.locator('[scContextMenuTrigger]').click({ button: 'right' });
    await expect.poll(() => openMenuCount(page)).toBe(1);
    await page.getByRole('menuitem', { name: /Reload/ }).click();
    await expect(page.getByText('Last action: Reload')).toBeVisible();
  });

  test('keyboard: focusable, the contextmenu event opens, Escape returns focus', async ({
    page,
  }) => {
    const trigger = page.locator('[scContextMenuTrigger]');
    await press(page, 'Tab');
    await expect(trigger).toBeFocused();
    // What the Menu key or Shift+F10 make the browser fire on the focused
    // trigger.
    await trigger.dispatchEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
    });
    await expect.poll(() => openMenuCount(page)).toBe(1);
    await press(page, 'Escape');
    await expect.poll(() => openMenuCount(page)).toBe(0);
    await expect(trigger).toBeFocused();
  });

  test('keyboard: Shift+F10 opens', async ({ page, browserName }) => {
    test.skip(
      browserName !== 'chromium',
      "Playwright's Firefox and WebKit don't turn Shift+F10 into the contextmenu event (Firefox itself does, on Windows and Linux)",
    );
    await press(page, 'Tab');
    await expect(page.locator('[scContextMenuTrigger]')).toBeFocused();
    await press(page, 'Shift+F10');
    await expect.poll(() => openMenuCount(page)).toBe(1);
  });
});
