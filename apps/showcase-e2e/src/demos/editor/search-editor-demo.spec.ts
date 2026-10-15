import { type Page, expect, test } from '@playwright/test';

const draft = (page: Page) => page.getByRole('textbox', { name: 'Draft' });
const bar = (page: Page) =>
  page.getByRole('search', { name: 'Search and replace' });

test.describe('Search Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/search-editor-demo');
    await expect(draft(page)).toContainText('The colour of the sky');
  });

  test('finds, steps through and replaces every match', async ({ page }) => {
    const search = page.getByRole('button', { name: 'Search and replace' });
    await search.click();
    await expect(search).toHaveAttribute('aria-pressed', 'true');
    const input = bar(page).getByRole('searchbox', { name: 'Search' });
    await expect(input).toBeFocused();

    await input.fill('colour');
    const results = bar(page).getByRole('status');
    await expect(results).toHaveText('1 of 5');
    await input.press('Enter');
    await expect(results).toHaveText('2 of 5');
    await input.press('Shift+Enter');
    await expect(results).toHaveText('1 of 5');

    await bar(page)
      .getByRole('textbox', { name: 'Replace with' })
      .fill('color');
    await bar(page).getByRole('button', { name: 'Replace all' }).click();
    await expect(draft(page)).not.toContainText('colour');
    await expect(results).toHaveText('No results');
  });

  test('Ctrl / ⌘ + F opens it, Escape closes it', async ({ page }) => {
    await draft(page).click();
    await page.keyboard.press('ControlOrMeta+f');
    const input = bar(page).getByRole('searchbox', { name: 'Search' });
    await expect(input).toBeFocused();

    await input.press('Escape');
    await expect(bar(page)).toBeHidden();
    await expect(draft(page)).toBeFocused();
  });
});
