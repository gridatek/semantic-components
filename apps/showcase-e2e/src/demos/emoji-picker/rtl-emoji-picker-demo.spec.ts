import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

// Right to left: the rows run from the right, and so do the arrow keys.
test.describe('Emoji picker, right to left', () => {
  test('← moves to the next emoji, → back', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/emoji-picker/rtl-emoji-picker-demo');
    const grid = page.getByRole('grid', { name: 'الرموز التعبيرية' });
    await expect(grid).toBeVisible();
    const cells = grid.getByRole('row').first().getByRole('gridcell');
    await expect(cells.nth(1)).toBeVisible();

    // The first emoji is the rightmost.
    const first = await cells.nth(0).boundingBox();
    const second = await cells.nth(1).boundingBox();
    expect(first?.x).toBeGreaterThan(second?.x ?? Infinity);

    const search = page.getByRole('searchbox', {
      name: 'البحث عن الرموز التعبيرية',
    });
    await search.focus();
    await expect(search).toBeFocused();
    const active = page.locator('[data-slot=emoji-picker-emoji][data-active]');
    // The first arrow makes the first emoji active.
    await search.press('ArrowDown');
    const firstLabel = await cells.nth(0).getAttribute('aria-label');
    const secondLabel = await cells.nth(1).getAttribute('aria-label');
    await expect(active).toHaveAttribute('aria-label', firstLabel ?? '');
    await search.press('ArrowLeft');
    await expect(active).toHaveAttribute('aria-label', secondLabel ?? '');
    await search.press('ArrowRight');
    await expect(active).toHaveAttribute('aria-label', firstLabel ?? '');

    expect(errors).toEqual([]);
  });
});
