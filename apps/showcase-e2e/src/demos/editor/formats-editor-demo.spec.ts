import { type Page, expect, test } from '@playwright/test';

const editor = (page: Page) => page.getByRole('textbox', { name: 'Note' });
const view = (page: Page) => page.getByRole('article', { name: 'Saved note' });
const format = (page: Page, name: 'HTML' | 'JSON' | 'Markdown' | 'Text') =>
  page
    .getByRole('group', { name: 'Format' })
    .getByRole('button', { name, exact: true });

/** The stored value, as the demo writes it out. */
async function value(page: Page): Promise<unknown> {
  return JSON.parse((await page.locator('pre').textContent()) ?? '');
}

async function write(page: Page): Promise<void> {
  await editor(page).click();
  await page.keyboard.type('Hello ');
  await page.keyboard.press('ControlOrMeta+b');
  await page.keyboard.type('world');
  await page.keyboard.press('ControlOrMeta+b');
  await page.keyboard.press('Enter');
  await page.keyboard.type('Bye');
}

test.describe('Formats Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/formats-editor-demo');
    await expect(editor(page)).toBeVisible();
  });

  test('JSON: starts as null, gives Tiptap’s JSON back', async ({ page }) => {
    await expect(page.locator('pre')).toHaveText('null');
    await expect(page.getByText('JSON value (empty)')).toBeVisible();

    await write(page);
    await expect(page.getByText('JSON value (valid)')).toBeVisible();
    const json = (await value(page)) as {
      type: string;
      content: { type: string; content: { text: string; marks?: unknown }[] }[];
    };
    expect(json.type).toBe('doc');
    expect(json.content.map((block) => block.type)).toEqual([
      'paragraph',
      'paragraph',
    ]);
    expect(json.content[0].content).toEqual([
      { type: 'text', text: 'Hello ' },
      { type: 'text', marks: [{ type: 'bold' }], text: 'world' },
    ]);
    await expect(view(page).locator('strong')).toHaveText('world');
  });

  test('HTML gives HTML back', async ({ page }) => {
    await format(page, 'HTML').click();
    await expect(page.getByText('HTML value')).toBeVisible();
    await write(page);
    await expect
      .poll(() => value(page))
      .toBe('<p>Hello <strong>world</strong></p><p>Bye</p>');
  });

  test('Markdown gives Markdown back', async ({ page }) => {
    await format(page, 'Markdown').click();
    await write(page);
    await expect.poll(() => value(page)).toBe('Hello **world**\n\nBye');
    await expect(view(page).locator('strong')).toHaveText('world');
  });

  test('text gives plain text back, a line per paragraph', async ({ page }) => {
    await format(page, 'Text').click();
    await write(page);
    await expect.poll(() => value(page)).toBe('Hello world\nBye');
    await expect(view(page).locator('p')).toHaveText(['Hello world', 'Bye']);
  });

  test('switching the format rewrites the value', async ({ page }) => {
    await write(page);
    await format(page, 'HTML').click();
    await expect
      .poll(() => value(page))
      .toBe('<p>Hello <strong>world</strong></p><p>Bye</p>');
    await format(page, 'Text').click();
    await expect.poll(() => value(page)).toBe('Hello world\nBye');
    // Only the value is plain: the document keeps its formatting.
    await expect(editor(page).locator('strong')).toHaveText('world');
  });

  test('each format loads into the editor and the display', async ({
    page,
  }) => {
    for (const name of ['HTML', 'Markdown', 'Text', 'JSON'] as const) {
      await format(page, name).click();
      await page.getByRole('button', { name: 'Load sample' }).click();
      await expect(editor(page)).toContainText('Formats');
      await expect(view(page)).toContainText('Formats');
      await page.getByRole('button', { name: 'Clear' }).click();
      await expect(editor(page)).toHaveText('');
      await expect(page.getByText(`${name} value (empty)`)).toBeVisible();
    }
  });
});
