import { expect, test } from '../test';

test.describe('AI Elements page', () => {
  test('Browse the patterns: to the patterns, on this page', async ({
    page,
  }) => {
    await page.goto('/ai-elements');
    await page.getByRole('link', { name: 'Browse the patterns' }).click();
    // The section's address on this page, not the home page's (`/#patterns`).
    await expect(page).toHaveURL(/\/ai-elements#patterns$/);
    await expect(
      page.getByRole('region', { name: 'Patterns' }).first(),
    ).toBeInViewport();
  });
});
