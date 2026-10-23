import { expect, test } from '../../test';

test.describe('Readonly Editor Demo', () => {
  test('the document is read-only and keeps its content', async ({ page }) => {
    await page.goto('/demos/editor/readonly-editor-demo');
    const article = page.getByRole('textbox', { name: 'Article' });
    await expect(article).toHaveAttribute('aria-readonly', 'true');
    await expect(article).toHaveAttribute('contenteditable', 'false');

    await article.click();
    await page.keyboard.type('changed');
    await expect(article).not.toContainText('changed');
    await expect(article.locator('h3')).toHaveText('Readonly Content');
  });
});
