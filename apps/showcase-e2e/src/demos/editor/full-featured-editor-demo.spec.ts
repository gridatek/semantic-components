import { type Page, expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

const toolbar = (page: Page) =>
  page.getByRole('toolbar', { name: 'Formatting' });
const article = (page: Page) => page.getByRole('textbox', { name: 'Article' });
const output = (page: Page) => page.locator('pre').last();

/** Empties the document and puts the cursor in it. */
async function startEmpty(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Clear Content' }).click();
  await expect(output(page)).toHaveText('');
  await article(page).click();
}

test.describe('Full Featured Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/full-featured-editor-demo');
    await expect(article(page).locator('h1')).toHaveText('Getting started');
  });

  test('the document is a named multi-line textbox', async ({ page }) => {
    await expect(article(page)).toHaveAttribute('aria-multiline', 'true');
    await expect(article(page)).toHaveAttribute('contenteditable', 'true');
  });

  test('typing updates the value', async ({ page }) => {
    const errors = collectErrors(page);
    await startEmpty(page);
    await page.keyboard.type('Hello editor');
    await expect(output(page)).toHaveText('<p>Hello editor</p>');
    await expect(page.getByText('2 words')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('the toolbar is one tab stop', async ({ page }) => {
    await expect(toolbar(page).locator('[tabindex="0"]')).toHaveCount(1);
  });

  test('undo and redo follow the history', async ({ page }) => {
    const undo = toolbar(page).getByRole('button', { name: 'Undo' });
    const redo = toolbar(page).getByRole('button', { name: 'Redo' });
    await expect(undo).toBeDisabled();
    await expect(redo).toBeDisabled();

    await article(page).locator('h1').click();
    await page.keyboard.press('End');
    await page.keyboard.type('!');
    await expect(article(page).locator('h1')).toHaveText('Getting started!');
    await expect(undo).toBeEnabled();

    await undo.click();
    await expect(article(page).locator('h1')).toHaveText('Getting started');
    await expect(redo).toBeEnabled();
  });

  test('bold is pressed and makes strong text', async ({ page }) => {
    const bold = toolbar(page).getByRole('button', {
      name: 'Bold',
      exact: true,
    });
    await startEmpty(page);
    await expect(bold).toHaveAttribute('aria-pressed', 'false');

    await bold.click();
    await expect(bold).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.type('Loud');
    await expect(output(page)).toHaveText('<p><strong>Loud</strong></p>');
  });

  test('superscript and subscript exclude each other', async ({ page }) => {
    await startEmpty(page);
    await page.keyboard.type('x2');
    await page.keyboard.press('Shift+ArrowLeft');
    await toolbar(page).getByRole('button', { name: 'Superscript' }).click();
    await expect(output(page)).toHaveText('<p>x<sup>2</sup></p>');
    await toolbar(page).getByRole('button', { name: 'Subscript' }).click();
    await expect(output(page)).toHaveText('<p>x<sub>2</sub></p>');
  });

  test('the heading menu sets the block type', async ({ page }) => {
    await startEmpty(page);
    await page.keyboard.type('Title');
    await toolbar(page).getByRole('button', { name: 'Paragraph' }).click();
    await page.getByRole('menuitem', { name: 'Heading 2' }).click();
    await expect(output(page)).toHaveText('<h2>Title</h2>');
    await expect(
      toolbar(page).getByRole('button', { name: 'Heading 2' }),
    ).toBeVisible();
  });

  test('the list menu makes a task list', async ({ page }) => {
    await startEmpty(page);
    await page.keyboard.type('Buy milk');
    const list = toolbar(page).getByRole('button', {
      name: 'List',
      exact: true,
    });
    await list.click();
    await page.getByRole('menuitem', { name: 'Task list' }).click();
    await expect(list).toHaveAttribute('data-state', 'on');
    const task = article(page).getByRole('checkbox', { name: 'Buy milk' });
    await expect(task).not.toBeChecked();
    await task.check();
    await expect(output(page)).toContainText('data-checked="true"');
  });

  test('the code block button makes a code block', async ({ page }) => {
    await startEmpty(page);
    await page.keyboard.type('let a = 1;');
    const codeBlock = toolbar(page).getByRole('button', { name: 'Code block' });
    await codeBlock.click();
    await expect(codeBlock).toHaveAttribute('aria-pressed', 'true');
    await expect(article(page).locator('pre code')).toHaveText('let a = 1;');
  });

  test('the highlight popover colours and clears the selection', async ({
    page,
  }) => {
    await startEmpty(page);
    await page.keyboard.type('Note');
    await page.keyboard.press('ControlOrMeta+a');
    const highlight = toolbar(page).getByRole('button', {
      name: 'Highlight',
      exact: true,
    });
    await highlight.click();
    await page.getByRole('button', { name: 'Green' }).click();
    await expect(article(page).locator('mark')).toHaveAttribute(
      'data-color',
      'var(--editor-highlight-green)',
    );
    await expect(highlight).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name: 'Remove highlight' }).click();
    await expect(article(page).locator('mark')).toHaveCount(0);
  });

  test('the link popover adds and removes a link', async ({ page }) => {
    const link = toolbar(page).getByRole('button', {
      name: 'Link',
      exact: true,
    });
    await startEmpty(page);
    await page.keyboard.type('Docs');
    await page.keyboard.press('ControlOrMeta+a');

    await link.click();
    const address = page.getByRole('textbox', { name: 'Address' });
    await address.fill('https://example.com');
    await page.getByRole('button', { name: 'Apply' }).click();
    await expect(address).toBeHidden();
    await expect(
      article(page).locator('a[href="https://example.com"]'),
    ).toHaveText('Docs');
    await expect(link).toHaveAttribute('aria-pressed', 'true');

    await link.click();
    await expect(address).toHaveValue('https://example.com');
    await expect(page.getByRole('link', { name: 'Open link' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
    await page.getByRole('button', { name: 'Remove', exact: true }).click();
    await expect(article(page).locator('a')).toHaveCount(0);
    await expect(output(page)).toHaveText('<p>Docs</p>');
  });

  test('an image is uploaded and inserted', async ({ page }) => {
    await startEmpty(page);
    const chooser = page.waitForEvent('filechooser');
    await toolbar(page).getByRole('button', { name: 'Add image' }).click();
    await (
      await chooser
    ).setFiles({
      name: 'diagram.png',
      mimeType: 'image/png',
      // A 1×1 transparent PNG.
      buffer: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        'base64',
      ),
    });
    await expect(page.getByText('Uploading diagram.png')).toBeVisible();
    await expect(article(page).locator('img')).toHaveAttribute(
      'alt',
      'diagram',
    );
    await expect(page.getByText('Uploading diagram.png')).toBeHidden();
  });

  test('search finds, steps through and replaces matches', async ({ page }) => {
    const search = toolbar(page).getByRole('button', {
      name: 'Search and replace',
    });
    await search.click();
    const bar = page.getByRole('search', { name: 'Search and replace' });
    const input = bar.getByRole('searchbox', { name: 'Search' });
    await expect(input).toBeFocused();

    await input.fill('list');
    const results = bar.getByRole('status');
    await expect(results).toHaveText(/1 of \d+/);
    await input.press('Enter');
    await expect(results).toHaveText(/2 of \d+/);

    await input.fill('nothing-like-this');
    await expect(results).toHaveText('No results');
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    await input.fill('Lists');
    await expect(results).toHaveText('1 of 1');
    await bar.getByRole('textbox', { name: 'Replace with' }).fill('Checklists');
    await bar.getByRole('button', { name: 'Replace all' }).click();
    await expect(article(page).locator('h2').first()).toHaveText('Checklists');

    await input.press('Escape');
    await expect(bar).toBeHidden();
    await expect(article(page)).toBeFocused();
  });

  test('Ctrl / ⌘ + F in the document opens the search', async ({ page }) => {
    await article(page).locator('h1').click();
    await page.keyboard.press('ControlOrMeta+f');
    await expect(
      page
        .getByRole('search', { name: 'Search and replace' })
        .getByRole('searchbox', { name: 'Search' }),
    ).toBeFocused();
  });

  test('the value from outside fills and clears the document', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Clear Content' }).click();
    await expect(article(page).locator('h1')).toHaveCount(0);
    await expect(output(page)).toHaveText('');
    await page.getByRole('button', { name: 'Insert Sample Content' }).click();
    await expect(article(page).locator('h1')).toHaveText('Getting started');
  });
});
