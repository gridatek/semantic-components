import { expect, test } from '@playwright/test';

test.describe('View Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/view-editor-demo');
  });

  test('displays the document as the editor shows it', async ({ page }) => {
    const post = page.getByRole('article', { name: 'Published post' });
    await expect(post.locator('h2')).toHaveText('Release notes');
    await expect(post).toHaveAttribute('data-slot', 'editor-document');

    // The same styles as in the editor.
    const editorHeading = page
      .getByRole('textbox', { name: 'Post' })
      .locator('h2');
    const size = await editorHeading.evaluate(
      (h) => getComputedStyle(h).fontSize,
    );
    await expect(post.locator('h2')).toHaveCSS('font-size', size);
  });

  test('follows the editor as you write', async ({ page }) => {
    const post = page.getByRole('article', { name: 'Published post' });
    await page.getByRole('textbox', { name: 'Post' }).locator('h2').click();
    await page.keyboard.press('End');
    await page.keyboard.type(' 2');
    await expect(post.locator('h2')).toHaveText('Release notes 2');
  });

  test('shows tasks without changing them', async ({ page }) => {
    const post = page.getByRole('article', { name: 'Published post' });
    const done = post.getByRole('checkbox', { name: 'Ship the editor' });
    await expect(done).toBeChecked();
    await expect(done).toBeDisabled();
    await expect(
      post.getByRole('checkbox', { name: 'Write the docs' }),
    ).not.toBeChecked();
  });
});
