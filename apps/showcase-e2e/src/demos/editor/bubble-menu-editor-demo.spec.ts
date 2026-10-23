import { type Page, expect, test } from '../../test';

const comment = (page: Page) => page.getByRole('textbox', { name: 'Comment' });
const bubble = (page: Page) => page.getByRole('toolbar', { name: 'Selection' });

test.describe('Bubble Menu Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/bubble-menu-editor-demo');
    await expect(comment(page)).toContainText('Select some of this text');
  });

  test('shows by selected text and formats it', async ({ page }) => {
    await expect(bubble(page)).toBeHidden();
    await comment(page).click();
    await page.keyboard.press('End');
    await expect(bubble(page)).toBeHidden();

    await page.keyboard.press('Shift+Home');
    await expect(bubble(page)).toBeVisible();
    const italic = bubble(page).getByRole('button', { name: 'Italic' });
    await italic.click();
    await expect(italic).toHaveAttribute('aria-pressed', 'true');
    await expect(comment(page).locator('em')).toHaveText(
      'Select some of this text: the floating toolbar shows above it.',
    );
  });

  test('hides when the selection is empty', async ({ page }) => {
    await comment(page).click();
    await page.keyboard.press('End');
    await page.keyboard.press('Shift+Home');
    await expect(bubble(page)).toBeVisible();
    await page.keyboard.press('End');
    await expect(bubble(page)).toBeHidden();
  });
});
