import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Emoji picker in a popover', () => {
  test('the search field takes focus; a pick closes it', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/emoji-picker/trigger-emoji-picker-demo');
    const trigger = page.getByRole('button', { name: 'Status' });
    await trigger.click();
    const search = page.getByRole('searchbox', { name: 'Search emojis' });
    await expect(search).toBeFocused();

    await search.fill('grinning');
    const active = page.locator('[data-slot=emoji-picker-emoji][data-active]');
    await expect(active).toHaveAttribute('aria-label', 'Grinning face');
    await search.press('Enter');

    // Closed by the pick (closeOnPick), the trigger shows it.
    await expect(search).toBeHidden();
    await expect(trigger).toHaveAccessibleName('Grinning face Status');
    expect(errors).toEqual([]);
  });
});
