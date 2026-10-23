import { type Page, expect, test } from '../../test';

// Every shortcut of the editor page's Keyboard table, in the full demo (it
// has every feature): each is pressed, and the HTML it makes is checked.

const article = (page: Page) => page.getByRole('textbox', { name: 'Article' });
const output = (page: Page) => page.locator('pre').last();

/** An empty document, with `text` typed and selected. */
async function select(page: Page, text: string): Promise<void> {
  await page.getByRole('button', { name: 'Clear Content' }).click();
  await expect(output(page)).toHaveText('');
  await article(page).click();
  await page.keyboard.type(text);
  await page.keyboard.press('ControlOrMeta+a');
}

const SHORTCUTS: [keys: string, html: string][] = [
  ['ControlOrMeta+b', '<strong>Word</strong>'],
  ['ControlOrMeta+i', '<em>Word</em>'],
  ['ControlOrMeta+u', '<u>Word</u>'],
  ['ControlOrMeta+Shift+s', '<s>Word</s>'],
  ['ControlOrMeta+e', '<code>Word</code>'],
  ['ControlOrMeta+Alt+2', '<h2>Word</h2>'],
  ['ControlOrMeta+Shift+7', '<ol>'],
  ['ControlOrMeta+Shift+8', '<ul>'],
  ['ControlOrMeta+Shift+9', 'data-type="taskList"'],
  ['ControlOrMeta+Shift+b', '<blockquote>'],
  ['ControlOrMeta+Alt+c', '<pre>'],
  ['ControlOrMeta+Shift+h', '<mark'],
  ['ControlOrMeta+.', '<sup>Word</sup>'],
  ['ControlOrMeta+,', '<sub>Word</sub>'],
  ['ControlOrMeta+Shift+e', 'text-align: center'],
  ['ControlOrMeta+Shift+r', 'text-align: right'],
  ['ControlOrMeta+Shift+j', 'text-align: justify'],
];

test.describe('Keyboard shortcuts (Full Featured Editor Demo)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/full-featured-editor-demo');
    await expect(article(page).locator('h1')).toHaveText('Getting started');
  });

  for (const [keys, html] of SHORTCUTS) {
    test(`${keys} makes ${html}`, async ({ page }) => {
      await select(page, 'Word');
      await page.keyboard.press(keys);
      await expect(output(page)).toContainText(html);
    });
  }

  test('ControlOrMeta+Shift+l aligns left again', async ({ page }) => {
    await select(page, 'Word');
    await page.keyboard.press('ControlOrMeta+Shift+e');
    await expect(output(page)).toContainText('text-align: center');
    await page.keyboard.press('ControlOrMeta+Shift+l');
    await expect(output(page)).not.toContainText('text-align: center');
  });

  test('undo and redo', async ({ page }) => {
    await select(page, 'Word');
    await page.keyboard.press('ControlOrMeta+b');
    await expect(output(page)).toHaveText('<p><strong>Word</strong></p>');
    await page.keyboard.press('ControlOrMeta+z');
    await expect(output(page)).toHaveText('<p>Word</p>');
    await page.keyboard.press('ControlOrMeta+Shift+z');
    await expect(output(page)).toHaveText('<p><strong>Word</strong></p>');
    await page.keyboard.press('ControlOrMeta+z');
    await page.keyboard.press('ControlOrMeta+y');
    await expect(output(page)).toHaveText('<p><strong>Word</strong></p>');
  });

  test('Markdown as you type', async ({ page }) => {
    const typed: [input: string, html: string][] = [
      ['# Title', '<h1>Title</h1>'],
      ['- Item', '<ul>'],
      ['[ ] Task', 'data-type="taskList"'],
      ['> Quote', '<blockquote>'],
      ['``` code', '<pre>'],
    ];
    for (const [input, html] of typed) {
      await select(page, 'x');
      await page.keyboard.press('Backspace');
      await page.keyboard.type(input);
      await expect(output(page), input).toContainText(html);
    }
  });

  test('Tab in a table moves to the next cell', async ({ page }) => {
    await select(page, 'x');
    await page.keyboard.press('Backspace');
    await page.getByRole('button', { name: 'Table', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Insert table' }).click();
    // The menu closes first: the document has focus a moment later.
    await expect(article(page)).toBeFocused();
    await page.keyboard.type('A');
    await page.keyboard.press('Tab');
    await page.keyboard.type('B');
    await expect(article(page).locator('th').nth(1)).toHaveText('B');
  });
});
