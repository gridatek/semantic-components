import { expect, test } from '../../test';

// pdf.js's icons on the pages are the app's templates (scPdfViewerIcon): the
// library's stylesheet has no images.
test.describe('PDF Viewer icons', () => {
  test("the app's icons in pdf.js's places", async ({ page }) => {
    await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
    const text = page.locator('.textLayer span').filter({ hasText: /\w{4,}/ });
    // The first load fetches pdf.js's worker.
    await expect(text.first()).toBeVisible({ timeout: 20_000 });

    // A page being drawn: its spinner shows while it is, then hides.
    const firstPage = page.locator('.pdfViewer .page').first();
    const spinner = firstPage.locator('[data-icon="page-loading"]');
    await expect(spinner).toBeHidden();
    await firstPage.evaluate((div) => div.classList.add('loadingIcon'));
    await expect(spinner).toBeVisible();
    await expect(spinner.getByRole('status')).toHaveAccessibleName(
      'Drawing the page',
    );
    await firstPage.evaluate((div) => div.classList.remove('loadingIcon'));
    await expect(spinner).toBeHidden();

    // A comment: the button by its annotation shows the app's icon.
    const tool = page
      .getByRole('group', { name: 'Annotation tool' })
      .getByRole('button', { name: 'Highlight' });
    await tool.click();
    await expect(tool).toHaveAttribute('aria-pressed', 'true');
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
    await page
      .locator('[data-slot="pdf-viewer-annotation-toolbar"]')
      .getByRole('button', { name: 'Comment' })
      .click();
    const input = page.getByPlaceholder('Add a comment…');
    await input.fill('A note');
    await page.locator('form[scPdfViewerCommentForm] [type="submit"]').click();

    const button = page.locator('.annotationCommentButton').first();
    await expect(button.locator('[data-icon="comment"] svg')).toBeVisible();
    // pdf.js's image is off.
    expect(
      await button.evaluate(
        (element) => getComputedStyle(element, '::before').content,
      ),
    ).toBe('none');
  });
});
