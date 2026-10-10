import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Basic Emoji Picker Demo', () => {
  test('categories: one tab stop, arrows, pressed state', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/emoji-picker/basic-emoji-picker-demo');
    let toolbar = page.getByRole('toolbar', { name: 'Emoji categories' });
    if (!(await toolbar.count())) {
      await page.getByRole('button').first().click();
      toolbar = page.getByRole('toolbar', { name: 'Emoji categories' });
    }
    await expect(toolbar).toBeVisible();
    const buttons = toolbar.getByRole('button');
    await expect(buttons.first()).toHaveAttribute('aria-pressed', 'true');
    await expect(buttons.nth(1)).toHaveAttribute('tabindex', '-1');

    await buttons.first().focus();
    await press(page, 'ArrowRight');
    await expect(buttons.nth(1)).toBeFocused();
    await press(page, 'Enter');
    await expect(buttons.nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect(buttons.first()).toHaveAttribute('aria-pressed', 'false');
    expect(errors).toEqual([]);
  });
});
