import { expect, test } from '@playwright/test';
import { collectErrors, openMenuCount, press } from '../../interaction';

test.describe('Menu Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/menu/menu-demo');
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('type-ahead moves to the matching item', async ({ page }) => {
    await page.locator('[aria-haspopup]').first().click();
    await expect.poll(() => openMenuCount(page)).toBe(1);
    await press(page, 's');
    await expect(page.getByRole('menuitem', { name: /^Snooze/ })).toBeFocused();
  });

  test('Tab closes the menu and moves on from the trigger', async ({
    page,
  }) => {
    const trigger = page.locator('[aria-haspopup]').first();
    await trigger.click();
    await expect.poll(() => openMenuCount(page)).toBe(1);
    await press(page, 'Tab');
    await expect.poll(() => openMenuCount(page)).toBe(0);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).not.toBeFocused();
  });

  test('Escape closes and returns focus to the trigger', async ({ page }) => {
    const trigger = page.locator('[aria-haspopup]').first();
    await trigger.click();
    await press(page, 'Escape');
    await expect.poll(() => openMenuCount(page)).toBe(0);
    await expect(trigger).toBeFocused();
  });
});
