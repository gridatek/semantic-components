import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

test.describe('Full Featured Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/full-featured-editor-demo');
  });

  test('the document is a named multi-line textbox', async ({ page }) => {
    const article = page.getByRole('textbox', { name: 'Article' });
    await expect(article).toHaveAttribute('aria-multiline', 'true');
    await expect(article).toHaveAttribute('contenteditable', 'true');
  });

  test('typing updates the value', async ({ page }) => {
    const errors = collectErrors(page);
    await page.getByRole('textbox', { name: 'Article' }).click();
    await page.keyboard.type('Hello editor');
    await expect(page.locator('pre')).toHaveText('<p>Hello editor</p>');
    await expect(page.getByText('2 words')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('the toolbar is one tab stop', async ({ page }) => {
    const toolbar = page.getByRole('toolbar', { name: 'Text formatting' });
    await expect(toolbar.locator('[tabindex="0"]')).toHaveCount(1);
  });

  test('undo and redo are disabled until there is a change', async ({
    page,
  }) => {
    const toolbar = page.getByRole('toolbar', { name: 'Text formatting' });
    const undo = toolbar.getByRole('button', { name: 'Undo' });
    const redo = toolbar.getByRole('button', { name: 'Redo' });
    await expect(undo).toBeDisabled();
    await expect(redo).toBeDisabled();

    await page.getByRole('textbox', { name: 'Article' }).click();
    await page.keyboard.type('Draft');
    await expect(undo).toBeEnabled();

    await undo.click();
    await expect(page.locator('pre')).toHaveText('');
    await expect(redo).toBeEnabled();
  });

  test('bold is pressed and makes strong text', async ({ page }) => {
    const bold = page
      .getByRole('toolbar', { name: 'Text formatting' })
      .getByRole('button', { name: 'Bold' });
    await page.getByRole('textbox', { name: 'Article' }).click();
    await expect(bold).toHaveAttribute('aria-pressed', 'false');

    await bold.click();
    await expect(bold).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.type('Loud');
    await expect(page.locator('pre')).toHaveText(
      '<p><strong>Loud</strong></p>',
    );
  });

  test('the heading menu sets the block type', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Article' }).click();
    await page.keyboard.type('Title');
    await page.getByRole('button', { name: 'Paragraph' }).click();
    await page.getByRole('menuitem', { name: 'Heading 1' }).click();
    await expect(page.locator('pre')).toHaveText('<h1>Title</h1>');
    await expect(page.getByRole('button', { name: 'Heading 1' })).toBeVisible();
  });

  test('the link popover adds and removes a link', async ({ page }) => {
    const article = page.getByRole('textbox', { name: 'Article' });
    const link = page
      .getByRole('toolbar', { name: 'Text formatting' })
      .getByRole('button', { name: 'Link' });
    await article.click();
    await page.keyboard.type('Docs');
    await page.keyboard.press('ControlOrMeta+a');

    await link.click();
    const address = page.getByRole('textbox', { name: 'Address' });
    await address.fill('https://example.com');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(address).toBeHidden();
    await expect(article.locator('a[href="https://example.com"]')).toHaveText(
      'Docs',
    );
    await expect(link).toHaveAttribute('aria-pressed', 'true');

    await link.click();
    await expect(address).toHaveValue('https://example.com');
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(article.locator('a')).toHaveCount(0);
    await expect(page.locator('pre')).toHaveText('<p>Docs</p>');
  });

  test('the value from outside fills and clears the document', async ({
    page,
  }) => {
    const article = page.getByRole('textbox', { name: 'Article' });
    await page.getByRole('button', { name: 'Insert Sample Content' }).click();
    await expect(article.locator('h1')).toHaveText('Article Title');
    await page.getByRole('button', { name: 'Clear Content' }).click();
    await expect(article.locator('h1')).toHaveCount(0);
    await expect(page.locator('pre')).toHaveText('');
  });
});
