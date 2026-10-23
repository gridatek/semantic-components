import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';
import { serveEmojibase } from './emojibase';

test.describe('Emoji picker categories', () => {
  test('category buttons: a toolbar that scrolls to them; recent first', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await serveEmojibase(page);
    await page.goto('/demos/emoji-picker/categories-emoji-picker-demo');
    const grid = page.getByRole('grid', { name: 'Emojis' });
    await expect(grid).toBeVisible();

    const toolbar = page.getByRole('toolbar', { name: 'Emoji categories' });
    const buttons = toolbar.getByRole('button');
    // The recent emojis come first.
    await expect(buttons.first()).toHaveAccessibleName('Recently used');
    await expect(buttons.first()).toHaveAttribute('aria-pressed', 'true');
    await expect(buttons.nth(1)).toHaveAttribute('tabindex', '-1');

    // One Tab stop, arrow keys; a category scrolls to the top.
    await buttons.first().focus();
    await press(page, 'ArrowRight');
    await press(page, 'ArrowRight');
    await expect(buttons.nth(2)).toBeFocused();
    await press(page, 'Enter');
    await expect(buttons.nth(2)).toHaveAttribute('aria-pressed', 'true');
    await expect(buttons.first()).toHaveAttribute('aria-pressed', 'false');

    // A pick goes first in the recent ones.
    await page.getByRole('searchbox', { name: 'Search emojis' }).fill('rocket');
    await page.getByRole('gridcell', { name: 'Rocket' }).click();
    await page.getByRole('searchbox', { name: 'Search emojis' }).fill('');
    await expect(grid.getByRole('row').first()).toContainText('🚀');
    expect(errors).toEqual([]);
  });
});
