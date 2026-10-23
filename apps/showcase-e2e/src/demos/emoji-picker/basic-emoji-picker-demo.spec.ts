import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';
import { serveEmojibase } from './emojibase';

test.describe('Emoji picker', () => {
  test.beforeEach(async ({ page }) => {
    await serveEmojibase(page);
    await page.goto('/demos/emoji-picker/basic-emoji-picker-demo');
    await expect(page.getByRole('grid', { name: 'Emojis' })).toBeVisible();
  });

  test('only the rows in view are drawn; headers stick', async ({ page }) => {
    const errors = collectErrors(page);
    const grid = page.getByRole('grid', { name: 'Emojis' });
    const total = Number(await grid.getAttribute('aria-rowcount'));
    expect(total).toBeGreaterThan(100);
    expect(await grid.getByRole('row').count()).toBeLessThan(20);

    const viewport = page.locator('[data-slot=emoji-picker-viewport]');
    await viewport.evaluate((v) => (v.scrollTop = 3000));
    await expect(grid.getByRole('row').first()).toHaveAttribute(
      'aria-rowindex',
      /^[1-9]\d+$/,
    );
    // The category under the top edge shows its header there.
    const top = await viewport.evaluate((v) => v.getBoundingClientRect().top);
    const stuck = await page
      .locator('[data-slot=emoji-picker-category-header]')
      .evaluateAll(
        (headers, viewportTop) =>
          headers.filter(
            (h) => Math.abs(h.getBoundingClientRect().top - viewportTop) < 1,
          ).length,
        top,
      );
    expect(stuck).toBe(1);
    expect(errors).toEqual([]);
  });

  test('search, then the arrow keys and Enter from the search field', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    const search = page.getByRole('searchbox', { name: 'Search emojis' });
    await search.fill('grinning');
    // The first result is active: Enter picks it.
    const active = page.locator('[data-slot=emoji-picker-emoji][data-active]');
    await expect(active).toHaveAttribute('aria-label', 'Grinning face');
    await search.press('ArrowRight');
    await expect(active).not.toHaveAttribute('aria-label', 'Grinning face');
    const label = await active.getAttribute('aria-label');
    // Announced, and previewed in the footer.
    await expect(page.locator('[data-slot=emoji-picker-announcer]')).toHaveText(
      label ?? '',
    );
    await expect(page.locator('[data-slot=emoji-picker-footer]')).toContainText(
      label ?? '',
    );
    await search.press('Enter');
    await expect(page.getByText(`Selected:`)).toContainText(label ?? '');
    await expect(search).toBeFocused();

    await search.fill('zzzz');
    await expect(page.getByText('No emoji found.')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('skin tone', async ({ page }) => {
    const errors = collectErrors(page);
    const tone = page.getByRole('button', { name: 'Change skin tone' });
    await expect(tone).toHaveText('✋');
    await tone.click();
    await expect(tone).toHaveText('✋🏻');
    await page
      .getByRole('searchbox', { name: 'Search emojis' })
      .fill('waving hand');
    await expect(
      page.locator('[data-slot=emoji-picker-emoji]').first(),
    ).toHaveText('👋🏻');
    expect(errors).toEqual([]);
  });
});
