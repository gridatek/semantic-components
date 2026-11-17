import { type Page, expect, test } from '../../test';

const title = (page: Page) => page.getByRole('textbox', { name: 'العنوان' });
const text = (page: Page) => page.getByRole('textbox', { name: 'النص' });

test.describe('RTL Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/rtl-editor-demo');
    await expect(text(page)).toBeVisible();
  });

  test('the title and the text run right to left, list markers on the right', async ({
    page,
  }) => {
    await expect(title(page)).toHaveCSS('direction', 'rtl');
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

  test('← at the end of the title (forward) goes to the text; → at its start (back) returns', async ({
    page,
  }) => {
    await title(page).fill('ملاحظات الربيع');
    await title(page).press('ArrowLeft');
    await expect(text(page)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(title(page)).toBeFocused();
    await page.keyboard.type('!');
    await expect(title(page)).toHaveValue('ملاحظات الربيع!');
  });

  test('→ inside the title moves within it (it is not forward in RTL)', async ({
    page,
  }) => {
    await title(page).fill('ملاحظات الربيع');
    await title(page).press('ArrowRight');
    await expect(title(page)).toBeFocused();
  });
});
