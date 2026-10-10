import { expect, test } from '@playwright/test';
import { collectErrors, openMenuCount, press } from '../../interaction';

test.describe('Menu Bar Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/menu-bar/menu-bar-demo');
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('Escape on a bar item closes its menu', async ({ page }) => {
    const file = page.locator('[role=menubar] [role=menuitem]').first();
    await file.click();
    await expect.poll(() => openMenuCount(page)).toBe(1);
    await press(page, 'Escape');
    await expect.poll(() => openMenuCount(page)).toBe(0);
    await expect(file).toBeFocused();
    await expect(file).toHaveAttribute('aria-expanded', 'false');
  });

  test('Escape inside a menu returns to the bar item', async ({ page }) => {
    const file = page.locator('[role=menubar] [role=menuitem]').first();
    await file.focus();
    await press(page, 'ArrowDown');
    await expect.poll(() => openMenuCount(page)).toBe(1);
    await press(page, 'Escape');
    await expect.poll(() => openMenuCount(page)).toBe(0);
    await expect(file).toBeFocused();
  });

  test('type-ahead on the bar', async ({ page }) => {
    await page.locator('[role=menubar] [role=menuitem]').first().focus();
    await press(page, 'v');
    await expect
      .poll(() =>
        page.evaluate(() =>
          document.activeElement?.textContent?.trim().startsWith('View'),
        ),
      )
      .toBe(true);
  });
});

test.describe('Menu Bar Page', () => {
  test('Tab out of an open menu leaves the menubar', async ({ page }) => {
    await page.goto('/docs/components/menu-bar');
    const bar = page.locator('[role=menubar]').first();
    await bar.locator('[role=menuitem]').first().focus();
    await press(page, 'ArrowDown');
    await expect.poll(() => openMenuCount(page)).toBe(1);
    await press(page, 'Tab');
    await expect.poll(() => openMenuCount(page)).toBe(0);
    await expect
      .poll(() =>
        page.evaluate(
          () => !!document.activeElement?.closest('[role=menubar]'),
        ),
      )
      .toBe(false);
  });
});
