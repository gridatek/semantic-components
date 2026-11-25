import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

test.describe('Emoji picker with your own data', () => {
  test('your categories, names and search words', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/emoji-picker/custom-data-emoji-picker-demo');
    const grid = page.getByRole('grid', { name: "The team's emojis" });
    await expect(grid).toBeVisible();
    await expect(
      page.locator('[data-slot=emoji-picker-category-header]'),
    ).toHaveText(['Reactions', 'Status', 'Away']);

    // A search word, not a name: "wfh".
    const search = page.getByRole('searchbox', {
      name: "Search the team's emojis",
    });
    await search.fill('wfh');
    await expect(grid.getByRole('gridcell')).toHaveCount(1);
    await expect(grid.getByRole('gridcell')).toHaveAccessibleName(
      'Working from home',
    );
    await search.press('Enter');
    await expect(
      page.getByText('Selected: 🏠 Working from home'),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
});
