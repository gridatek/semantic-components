import { type Page, expect, test } from '../../test';

const comment = (page: Page) => page.getByRole('textbox', { name: 'Comment' });
const bubble = (page: Page) => page.getByRole('toolbar', { name: 'Selection' });
/**
 * The bubble menu listening: its plugin, once registered with the editor,
 * takes the toolbar out of the demo (to place it itself). A selection made
 * before is missed — under load, WebKit's first double-click came first.
 */
const listening = (page: Page) =>
  expect(
    page.locator('app-bubble-menu-editor-demo [aria-label=Selection]'),
  ).toHaveCount(0);

test.describe('Bubble Menu Editor Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/editor/bubble-menu-editor-demo');
    await expect(comment(page)).toContainText('Select some of this text');
    await listening(page);
  });

  test('shows by selected text and formats it', async ({ page }) => {
    await expect(bubble(page)).toBeHidden();
    await comment(page).click();
    // Focused before the keys: one typed while the editor takes the focus is lost.
    await expect(comment(page)).toBeFocused();
    await page.keyboard.press('End');
    await expect(bubble(page)).toBeHidden();

    // The line selected: shown. Again if it didn't take — WebKit, just
    // focused, puts the editor's caret back over a selection now and then
    // (Shift+Home selecting nothing, or a moment); a user selects again.
    await expect(async () => {
      await page.keyboard.press('End');
      await page.keyboard.press('Shift+Home');
      await expect(bubble(page)).toBeVisible({ timeout: 1_500 });
    }).toPass({ timeout: 15_000 });
    // By the text: its centre over the selection, not pushed to an edge.
    const text = await page.evaluate(() => {
      const r = getSelection()?.getRangeAt(0).getBoundingClientRect();
      return { left: r?.left ?? 0, right: r?.right ?? 0 };
    });
    await expect
      .poll(async () => {
        const box = (await bubble(page).boundingBox()) ?? { x: 0, width: 0 };
        return box.x + box.width / 2;
      })
      .toBeGreaterThan(text.left);
    const box = (await bubble(page).boundingBox()) ?? { x: 0, width: 0 };
    expect(box.x + box.width / 2).toBeLessThan(text.right);

    const italic = bubble(page).getByRole('button', { name: 'Italic' });
    await italic.click();
    await expect(italic).toHaveAttribute('aria-pressed', 'true');
    await expect(comment(page).locator('em')).toHaveText(
      'Select some of this text: the floating toolbar shows above it.',
    );
  });

  test('hides when the selection is empty', async ({ page }) => {
    await comment(page).click();
    // Focused before the keys: one typed while the editor takes the focus is lost.
    await expect(comment(page)).toBeFocused();
    await page.keyboard.press('End');
    await page.keyboard.press('Shift+Home');
    await expect(bubble(page)).toBeVisible();
    await page.keyboard.press('End');
    await expect(bubble(page)).toBeHidden();
  });
});

test('on a scrolled page, the first selection shows it by the text', async ({
  page,
}) => {
  // The editor's page: this demo far down it. The first place was off by
  // the page's scroll — out of view — until the toolbar was fixed from the
  // start (as Floating UI measures it).
  await page.goto('/docs/components/editor');
  const editor = page
    .getByTitle('A comment with a floating toolbar', { exact: true })
    .getByRole('textbox', { name: 'Comment' });
  await editor.scrollIntoViewIfNeeded();
  await listening(page);
  const toolbar = bubble(page);
  // Again if the word wasn't kept: under load, WebKit's double-click focuses
  // the editor but its selection is lost (the editor's late focus handling).
  await expect(async () => {
    await editor.getByText('Select some of this text').dblclick({
      position: { x: 10, y: 8 },
    });
    await expect(toolbar).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 15_000 });
  await expect(toolbar).toBeInViewport({ ratio: 1 });
  const text = await editor.boundingBox();
  const box = await toolbar.boundingBox();
  // Just above the text, not anywhere else in the view.
  expect(
    Math.abs((box?.y ?? 0) + (box?.height ?? 0) - (text?.y ?? 0)),
  ).toBeLessThan(60);
});

test('it follows the text as the page scrolls', async ({ page }) => {
  // Shown, then the page (not the document) scrolled: it was fixed where it
  // first showed, the text going on without it.
  await page.goto('/docs/components/editor');
  const editor = page
    .getByTitle('A comment with a floating toolbar', { exact: true })
    .getByRole('textbox', { name: 'Comment' });
  await editor.scrollIntoViewIfNeeded();
  await listening(page);
  const toolbar = bubble(page);
  await expect(async () => {
    await editor.getByText('Select some of this text').dblclick({
      position: { x: 10, y: 8 },
    });
    await expect(toolbar).toBeVisible({ timeout: 2000 });
  }).toPass({ timeout: 15_000 });

  // The gap from the toolbar's bottom to the text's top.
  const gap = async () => {
    const text = await editor.boundingBox();
    const box = await toolbar.boundingBox();
    return (text?.y ?? 0) - ((box?.y ?? 0) + (box?.height ?? 0));
  };
  const before = await gap();
  const top = (await editor.boundingBox())?.y ?? 0;

  await editor.hover();
  await page.mouse.wheel(0, 120);
  // The page has scrolled…
  await expect
    .poll(async () => (await editor.boundingBox())?.y ?? 0)
    .toBeLessThan(top - 50);
  // …and the toolbar with it.
  await expect
    .poll(async () => Math.abs((await gap()) - before))
    .toBeLessThan(2);
  await expect(toolbar).toBeVisible();
});
