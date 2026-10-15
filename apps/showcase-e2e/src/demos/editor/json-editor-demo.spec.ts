import { type Page, expect, test } from '@playwright/test';

const editor = (page: Page) => page.getByRole('textbox', { name: 'Note' });
const view = (page: Page) => page.getByRole('article', { name: 'Saved note' });
const value = (page: Page) => page.locator('pre');

test.describe('JSON Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/json-editor-demo');
    await expect(editor(page)).toBeVisible();
  });

  test('starts empty, as null', async ({ page }) => {
    await expect(value(page)).toHaveText('null');
    await expect(page.getByText('Value (empty)')).toBeVisible();
  });

  test('writing gives Tiptap’s JSON back', async ({ page }) => {
    await editor(page).click();
    await page.keyboard.type('Hello ');
    await page.keyboard.press('ControlOrMeta+b');
    await page.keyboard.type('world');

    const json = JSON.parse((await value(page).textContent()) ?? 'null');
    expect(json).toEqual({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: { textAlign: null },
          content: [
            { type: 'text', text: 'Hello ' },
            { type: 'text', marks: [{ type: 'bold' }], text: 'world' },
          ],
        },
      ],
    });
    await expect(page.getByText('Value (valid)')).toBeVisible();
    await expect(view(page).locator('strong')).toHaveText('world');
  });

  test('a JSON value fills the editor and the display', async ({ page }) => {
    await page.getByRole('button', { name: 'Load sample' }).click();
    await expect(editor(page).locator('h2')).toHaveText('Stored as JSON');
    await expect(view(page).locator('h2')).toHaveText('Stored as JSON');
    await expect(
      view(page).getByRole('checkbox', { name: 'Start from null' }),
    ).toBeChecked();

    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(editor(page).locator('h2')).toHaveCount(0);
    await expect(value(page)).toHaveText('null');
  });
});
