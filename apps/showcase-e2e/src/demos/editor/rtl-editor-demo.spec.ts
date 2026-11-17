import { type Page, expect, test } from '../../test';

const text = (page: Page) => page.getByRole('textbox', { name: 'النص' });

test.describe('RTL Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/rtl-editor-demo');
    await expect(text(page)).toBeVisible();
  });

  test('the text runs right to left, list markers on the right', async ({
    page,
  }) => {
    await expect(text(page)).toHaveCSS('direction', 'rtl');
    const list = text(page).locator('ul');
    await expect(list).toHaveCSS('padding-left', '0px');
    await expect(list).not.toHaveCSS('padding-right', '0px');
  });

  test('in the toolbar, Left moves to the next button', async ({ page }) => {
    const toolbar = page.getByRole('toolbar', { name: 'التنسيق' });
    const bold = toolbar.getByRole('button', { name: 'عريض' });
    await bold.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(toolbar.getByRole('button', { name: 'مائل' })).toBeFocused();
  });
});
