import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Vertical Tabs Demo', () => {
  test('vertical tab list uses up/down arrows', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/tabs/vertical-tabs-demo');
    const list = page.getByRole('tablist');
    await expect(list).toHaveAttribute('aria-orientation', 'vertical');
    const tabs = page.getByRole('tab');
    await tabs.first().focus();
    await press(page, 'ArrowDown');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await press(page, 'ArrowUp');
    await expect(tabs.first()).toBeFocused();
    expect(errors).toEqual([]);
  });
});

test.describe('Disabled Tabs Demo', () => {
  test('disabled tab is focusable but not selected', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/tabs/disabled-tabs-demo');
    const disabled = page.locator('[role=tab][aria-disabled=true]');
    await expect(disabled).toHaveCount(1);
    await page.getByRole('tab').first().focus();
    await press(page, 'End');
    await expect(disabled).toBeFocused();
    await expect(disabled).toHaveAttribute('aria-selected', 'false');
    expect(errors).toEqual([]);
  });
});
