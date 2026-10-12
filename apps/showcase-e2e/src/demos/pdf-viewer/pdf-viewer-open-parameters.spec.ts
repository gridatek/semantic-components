import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

// handbook.pdf: 6 pages labelled i, ii, 1, 2, 3, 4; "chapter-2" is page 5.
test.describe('PDF Viewer open parameters', () => {
  test('applies the src fragment, applyHash and page labels', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/pdf-viewer/pdf-viewer-open-parameters-demo');
    const labelInput = page.getByRole('textbox', { name: 'Page' });
    const pageCount = page.locator('[data-slot="pdf-viewer-page-info"] span');

    // #nameddest=chapter-2 in src (the first load fetches pdf.js's worker).
    await expect(labelInput).toHaveValue('3', { timeout: 20_000 });
    await expect(pageCount).toHaveText('(5 of 6)');

    // A page and a position on it.
    await page.getByRole('button', { name: '#page=3&zoom=auto,0,420' }).click();
    await expect(pageCount).toHaveText('(3 of 6)');
    await expect(labelInput).toHaveValue('1');

    // A bare named destination.
    await page.getByRole('button', { name: '#chapter-2' }).click();
    await expect(pageCount).toHaveText('(5 of 6)');

    // Labels and numbers in the page field.
    await labelInput.fill('ii');
    await labelInput.press('Enter');
    await expect(pageCount).toHaveText('(2 of 6)');
    await labelInput.fill('4');
    await labelInput.press('Enter');
    await expect(pageCount).toHaveText('(6 of 6)');
    await expect(labelInput).toHaveValue('4');

    // A search.
    await page.getByRole('button', { name: '#search=Configuration' }).click();
    await expect(page.locator('[scPdfViewerFindResultsInfo]')).toHaveText(
      '1 of 1',
    );

    expect(errors).toEqual([]);
  });
});
