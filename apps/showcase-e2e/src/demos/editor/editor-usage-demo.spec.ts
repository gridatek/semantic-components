import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Editor Usage Demo', () => {
  test('the library’s toolbar: one Tab stop, the arrows between its toggles', async ({
    page,
  }) => {
    await page.goto('/demos/editor/editor-usage-demo');
    const toolbar = page.getByRole('toolbar', { name: 'Formatting' });
    await expect(toolbar).toHaveAttribute('data-slot', 'toolbar');
    const bold = toolbar.getByRole('button', { name: 'Bold' });
    const italic = toolbar.getByRole('button', { name: 'Italic' });
    // The look and the pressed state are scToggle's, beside the command.
    await expect(bold).toHaveAttribute('data-state', 'off');
    await bold.focus();
    await press(page, 'ArrowRight');
    await expect(italic).toBeFocused();
  });

  test('Bold: pressed while the selection is bold', async ({ page }) => {
    await page.goto('/demos/editor/editor-usage-demo');
    const document = page.getByRole('textbox', { name: 'Message' });
    const bold = page.getByRole('button', { name: 'Bold' });
    await expect(bold).toHaveAttribute('aria-pressed', 'false');
    await document.click();
    await page.keyboard.type('Hello');
    await page.keyboard.press('ControlOrMeta+a');
    await bold.click();
    await expect(document.locator('strong')).toHaveText('Hello');
    await expect(bold).toHaveAttribute('aria-pressed', 'true');
    await bold.click();
    await expect(document.locator('strong')).toHaveCount(0);
    await expect(bold).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('Editor Usage Demo: a command that runs once', () => {
  test('Undo: off until there is something to undo, then it undoes; never pressed', async ({
    page,
  }) => {
    await page.goto('/demos/editor/editor-usage-demo');
    const document = page.getByRole('textbox', { name: 'Message' });
    const undo = page.getByRole('button', { name: 'Undo' });
    await expect(undo).toBeDisabled();
    await document.click();
    await page.keyboard.type('Hello');
    await expect(undo).toBeEnabled();
    await undo.click();
    await expect(document).toHaveText('');
    await expect(undo).toHaveAttribute('aria-pressed', 'false');
  });
});
