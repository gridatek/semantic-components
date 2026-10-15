import { type Page, expect, test } from '@playwright/test';

const editor = (page: Page) => page.getByRole('textbox', { name: 'Post' });
const view = (page: Page) =>
  page.getByRole('article', { name: 'Published post' });

/** Every kind of element in the demo's document, as the first of its kind. */
const ELEMENTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'strong',
  'em',
  'u',
  's',
  'p code',
  'a',
  'mark',
  'mark + mark',
  'sup',
  'sub',
  'ul:not([data-type])',
  'ul:not([data-type]) ul',
  'ul:not([data-type]) ul ul',
  'ul:not([data-type]) > li',
  'ol',
  'ol ol',
  'ol ol ol',
  'ol > li',
  'li p',
  'ul[data-type="taskList"]',
  'ul[data-type="taskList"] ul[data-type="taskList"]',
  'li[data-type="taskItem"]',
  'li[data-type="taskItem"] > label',
  'li[data-checked="true"] > div > p',
  'li[data-checked="false"] > div > p',
  'p[style*="center"]',
  'p[style*="right"]',
  'p[style*="justify"]',
  'img',
  'blockquote',
  'blockquote p',
  'pre',
  'pre code',
  'hr',
];

/** What makes an element look as it does. */
const PROPERTIES = [
  'display',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'line-height',
  'letter-spacing',
  'color',
  'background-color',
  'text-decoration-line',
  'text-align',
  'vertical-align',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'border-left-width',
  'border-top-width',
  'border-radius',
  'list-style-type',
  // Not the height: an image's depends on when it has loaded.
  'width',
];

test.describe('View Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/view-editor-demo');
    await expect(editor(page).locator('h1')).toHaveText('Release notes');
    await expect(view(page).locator('h1')).toHaveText('Release notes');
  });

  test('the display has the document’s elements', async ({ page }) => {
    for (const selector of ELEMENTS) {
      const inEditor = await editor(page).locator(selector).count();
      expect.soft(inEditor, `${selector} in the editor`).toBeGreaterThan(0);
      await expect
        .soft(view(page).locator(selector), selector)
        .toHaveCount(inEditor);
    }
  });

  test('every element looks as it does in the editor', async ({ page }) => {
    // Side by side, the editor's text and the display are the same width.
    await page.setViewportSize({ width: 1400, height: 900 });
    const styles = await page.evaluate(
      ({ elements, properties }) => {
        const read = (root: Element | null) =>
          Object.fromEntries(
            elements.map((selector) => {
              const element = root?.querySelector(selector);
              if (!element) return [selector, null];
              const style = getComputedStyle(element);
              return [
                selector,
                Object.fromEntries(
                  properties.map((p) => [p, style.getPropertyValue(p)]),
                ),
              ];
            }),
          );
        return {
          editor: read(
            document.querySelector('[role="textbox"][aria-label="Post"]'),
          ),
          view: read(
            document.querySelector('article[aria-label="Published post"]'),
          ),
        };
      },
      { elements: ELEMENTS, properties: PROPERTIES },
    );
    for (const selector of ELEMENTS) {
      expect
        .soft(styles.editor[selector], `${selector} in the editor`)
        .not.toBeNull();
      expect
        .soft(styles.view[selector], selector)
        .toEqual(styles.editor[selector]);
    }
  });

  test('the task boxes look the same', async ({ page }) => {
    for (const pseudo of ['::before', '::after']) {
      const read = (root: ReturnType<typeof editor>) =>
        root.locator('li[data-checked="true"] > label').evaluate((label, p) => {
          const style = getComputedStyle(label, p);
          return [
            style.backgroundColor,
            style.borderColor,
            style.opacity,
            style.width,
            style.borderRadius,
          ];
        }, pseudo);
      expect(await read(view(page)), pseudo).toEqual(await read(editor(page)));
    }
  });

  test('follows the editor as you write', async ({ page }) => {
    await editor(page).locator('h1').click();
    await page.keyboard.press('End');
    await page.keyboard.type(' 2');
    await expect(view(page).locator('h1')).toHaveText('Release notes 2');
  });

  test('shows tasks without changing them', async ({ page }) => {
    const done = view(page).getByRole('checkbox', { name: 'Ship the editor' });
    await expect(done).toBeChecked();
    await expect(done).toBeDisabled();
    await expect(
      view(page).getByRole('checkbox', { name: 'Write the docs' }),
    ).not.toBeChecked();
  });
});
