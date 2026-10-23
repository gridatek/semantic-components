import { expect, test } from '../../test';

test.describe('Signal Forms Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/signal-forms-editor-demo');
  });

  test('left empty, it is invalid and described by the error', async ({
    page,
  }) => {
    const post = page.getByRole('textbox', { name: 'Post' });
    await expect(post).not.toHaveAttribute('aria-invalid');
    await post.click();
    await post.blur();

    const error = page.getByRole('alert');
    await expect(error).toHaveText('Write the post.');
    await expect(post).toHaveAttribute('aria-invalid', 'true');
    const errorId = await error.getAttribute('id');
    await expect(post).toHaveAttribute(
      'aria-describedby',
      new RegExp(`(^| )${errorId}( |$)`),
    );

    await post.click();
    await page.keyboard.type('Hi');
    await expect(post).not.toHaveAttribute('aria-invalid');
    await expect(error).toBeHidden();
    await expect(page.locator('pre')).toContainText('"value": "<p>Hi</p>"');
  });

  test('the value from the form fills the document', async ({ page }) => {
    const post = page.getByRole('textbox', { name: 'Post' });
    await page.getByRole('button', { name: 'Fill' }).click();
    await expect(post.locator('strong')).toHaveText('world');
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(post.locator('strong')).toHaveCount(0);
  });

  test('disabled from the schema', async ({ page }) => {
    const post = page.getByRole('textbox', { name: 'Post' });
    const bold = page.getByRole('button', { name: 'Bold' });
    const lock = page.getByRole('checkbox', { name: 'Lock the post' });
    await lock.check();
    await expect(post).toHaveAttribute('aria-disabled', 'true');
    await expect(post).toHaveAttribute('contenteditable', 'false');
    await expect(bold).toBeDisabled();

    await lock.uncheck();
    await expect(post).toHaveAttribute('contenteditable', 'true');
    await expect(bold).toBeEnabled();
  });

  test('the text stops at the character limit', async ({ page }) => {
    const post = page.getByRole('textbox', { name: 'Post' });
    const count = page.getByText(/\d+ \/ 280/);
    await expect(count).toHaveText('0 / 280');

    await post.click();
    await page.keyboard.type('x'.repeat(285));
    await expect(count).toHaveText('280 / 280');
    await expect(count).toHaveAttribute('data-limit-reached');
    await expect(post).toHaveText('x'.repeat(280));

    await page.keyboard.press('Backspace');
    await expect(count).toHaveText('279 / 280');
    await expect(count).not.toHaveAttribute('data-limit-reached');
  });
});
