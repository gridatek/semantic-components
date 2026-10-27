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
  await editor.getByText('Select some of this text').dblclick({
    position: { x: 10, y: 8 },
  });
  const toolbar = bubble(page);
  await expect(toolbar).toBeInViewport({ ratio: 1 });
  const text = await editor.boundingBox();
  const box = await toolbar.boundingBox();
  // Just above the text, not anywhere else in the view.
  expect(
    Math.abs((box?.y ?? 0) + (box?.height ?? 0) - (text?.y ?? 0)),
  ).toBeLessThan(60);
});
