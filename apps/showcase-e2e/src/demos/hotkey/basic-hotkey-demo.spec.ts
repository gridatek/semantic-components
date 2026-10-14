import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

test.describe('Hotkey', () => {
  test('the shortcut does what the button does, written for the platform', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/hotkey/basic-hotkey-demo');
    const save = page.getByRole('button', { name: /^Save/ });
    const status = page.getByRole('status');
    await expect(save.locator('kbd')).toHaveText(/^(Ctrl\+S|⌘S)$/);
    await expect(status).toHaveText('Saved 0 times.');

    await save.click();
    await expect(status).toHaveText('Saved 1 times.');

    // Anywhere on the page: mod is ⌘ on a Mac, Ctrl elsewhere.
    await page.locator('body').click({ position: { x: 5, y: 5 } });
    await page.keyboard.press('ControlOrMeta+s');
    await expect(status).toHaveText('Saved 2 times.');

    // The modifiers must match exactly.
    await page.keyboard.press('ControlOrMeta+Shift+s');
    await page.keyboard.press('s');
    await expect(status).toHaveText('Saved 2 times.');
    expect(errors).toEqual([]);
  });
});
