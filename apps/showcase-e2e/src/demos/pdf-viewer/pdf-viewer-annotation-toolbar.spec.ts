import type { Page } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

/** Highlights the first word long enough, with the highlight tool. */
async function highlightWord(page: Page): Promise<void> {
  const text = page.locator('.textLayer span').filter({ hasText: /\w{4,}/ });
  // The first load fetches pdf.js's worker.
  await expect(text.first()).toBeVisible({ timeout: 20_000 });
  const tool = page
    .getByRole('group', { name: 'Annotation tool' })
    .getByRole('button', { name: 'Highlight' });
  await tool.click();
  await expect(tool).toHaveAttribute('aria-pressed', 'true');
  // pdf.js highlights the selection once its editors are ready: the
  // selection again until it does.
  await expect(async () => {
    const box = await text.first().boundingBox();
    if (!box) throw new Error('no text');
    await page.mouse.move(box.x + 1, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width - 1, box.y + box.height / 2, {
      steps: 8,
    });
    await page.mouse.up();
    await expect(page.locator('svg.highlight').first()).toBeAttached({
      timeout: 2_000,
    });
  }).toPass({ timeout: 20_000 });
}

// The toolbar on a selected annotation is the app's template
// (scPdfViewerAnnotationToolbar), in place of pdf.js's buttons.
test.describe('PDF Viewer annotation toolbar', () => {
  test('colours, comments and removes the annotation selected', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
    await highlightWord(page);

    const toolbar = page.locator('[data-slot="pdf-viewer-annotation-toolbar"]');
    await expect(toolbar).toBeVisible();
    // pdf.js's own buttons aren't shown.
    await expect(page.locator('.editToolbar > .buttons')).toBeHidden();

    // A colour: the annotation's, its swatch pressed.
    const highlight = page.locator('svg.highlight').first();
    const fill = await highlight.getAttribute('fill');
    const green = toolbar.getByRole('button', { name: 'Green' });
    await green.click();
    await expect(green).toHaveAttribute('aria-pressed', 'true');
    await expect(highlight).not.toHaveAttribute('fill', fill ?? '');
    // Still selected: the toolbar stays.
    await expect(toolbar).toBeVisible();

    // Its comment, written in the app's comment form.
    await toolbar.getByRole('button', { name: 'Comment' }).click();
    await expect(page.getByPlaceholder('Add a comment…')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Removed from the keyboard; the undo bar brings it back.
    // Selected again: pdf.js's element for it.
    await page.locator('.highlightEditor').first().click();
    const remove = toolbar.getByRole('button', { name: 'Delete' });
    await expect(remove).toBeVisible();
    await remove.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('svg.highlight')).toHaveCount(0);
    await expect(toolbar).toHaveCount(0);
    await page.getByRole('button', { name: 'Undo' }).click();
    await expect(page.locator('svg.highlight')).toHaveCount(1);

    expect(errors).toEqual([]);
  });

  test('an image: its alt text, from the toolbar', async ({ page }) => {
    await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
    await expect(page.locator('.textLayer span').first()).toBeVisible({
      timeout: 20_000,
    });
    const [chooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.getByRole('button', { name: 'Add image' }).click(),
    ]);
    await chooser.setFiles('apps/showcase/public/images/barcode-ean13.png');

    const toolbar = page.locator('[data-slot="pdf-viewer-annotation-toolbar"]');
    const altText = toolbar.getByRole('button', { name: 'Alt text' });
    await expect(altText).toBeVisible({ timeout: 10_000 });
    await expect(altText).not.toHaveAttribute('data-done');
    await altText.click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
