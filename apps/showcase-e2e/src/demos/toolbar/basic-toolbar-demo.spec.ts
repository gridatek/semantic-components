import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Basic Toolbar Demo', () => {
  test('named, one tab stop, Home/End, toggles', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/toolbar/basic-toolbar-demo');
    const toolbar = page.getByRole('toolbar', { name: 'Text formatting' });
    await expect(toolbar).toBeVisible();
    await expect(toolbar.locator('button:not([tabindex="-1"])')).toHaveCount(1);

    const buttons = toolbar.getByRole('button');
    await buttons.first().focus();
    await press(page, 'End');
    await expect(buttons.last()).toBeFocused();
    await press(page, 'Home');
    await expect(buttons.first()).toBeFocused();

    const italic = toolbar.getByRole('button', { name: 'Italic' });
    await italic.focus();
    await press(page, 'Enter');
    await expect(italic).toHaveAttribute('aria-pressed', 'true');
    expect(errors).toEqual([]);
  });
});
