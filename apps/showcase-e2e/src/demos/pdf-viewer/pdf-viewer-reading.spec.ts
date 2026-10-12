import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { findPdf, openPdf, taggedPdf } from './pdf-fixtures';

test.describe('PDF Viewer reading', () => {
  test('find: hyphenated words, phrases across lines, several matches in a line', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await openPdf(page, 'find.pdf', findPdf());
    await page.getByRole('button', { name: 'Find in document' }).click();
    const input = page.getByRole('searchbox', { name: 'Find in document' });
    const results = page.locator('[scPdfViewerFindResultsInfo]');
    const highlights = page.locator('.textLayer .highlight');

    // "infor-" / "mation" on two lines.
    await input.fill('information');
    await expect(results).toHaveText('1 of 1');
    await expect(highlights).toHaveText(['infor-', 'mation']);

    // A phrase wrapping to the next line.
    await input.fill('phrase that wraps');
    await expect(results).toHaveText('1 of 1');
    await expect(highlights).toHaveText(['phrase that', 'wraps']);

    // Three matches in one line, all highlighted.
    await page.getByRole('checkbox', { name: 'Highlight all' }).check();
    await input.fill('cat');
    await expect(results).toHaveText('1 of 3');
    await expect(highlights).toHaveText(['cat', 'cat', 'cat']);
    await expect(page.locator('.textLayer .highlight.selected')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test('tagged PDF: its structure is exposed to assistive technology', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await openPdf(page, 'tagged.pdf', taggedPdf());
    const tree = page.locator('canvas[data-page="1"] .structTree');

    // The heading owns its text in the text layer.
    const heading = tree.locator('[role="heading"][aria-level="1"]');
    await expect(heading).toHaveAttribute('aria-owns', /.+/);
    const owned = await heading.getAttribute('aria-owns');
    await expect(page.locator(`[id="${owned}"]`)).toHaveText('Annual report');
    await expect(tree.locator('[role="paragraph"]')).toHaveCount(1);

    // The figure, named by its alt text, where it is on the page.
    await expect(page.locator('.textLayer [role="img"]')).toHaveAttribute(
      'aria-label',
      'A blue square',
    );
    // The link owns its text; the footer (an artifact) is hidden.
    await expect(page.locator('.annotationLayer a')).toHaveAttribute(
      'aria-owns',
      /.+/,
    );
    await expect(
      page.locator('.textLayer .markedContent[aria-hidden="true"]'),
    ).toHaveText('Footer');
    expect(errors).toEqual([]);
  });

  test.describe('on a dense screen', () => {
    test.use({ deviceScaleFactor: 2 });

    test('high zoom: the visible part is drawn sharp', async ({ page }) => {
      const errors = collectErrors(page);
      await openPdf(page, 'find.pdf', findPdf());
      const detail = page.locator('canvas[data-detail-page="1"]');
      await expect(detail).toBeHidden();

      // 400%: too big a canvas at twice the density.
      await page.getByRole('combobox', { name: 'Zoom' }).selectOption('4');
      await expect(detail).toBeVisible();

      // Once drawn at the final zoom: the page's canvas below the screen's
      // density, the detail at it.
      const density = (selector: string) =>
        page.evaluate((s) => {
          const canvas = document.querySelector<HTMLCanvasElement>(s);
          return canvas
            ? Math.round(
                (canvas.width / canvas.getBoundingClientRect().width) * 10,
              ) / 10
            : 0;
        }, selector);
      await expect.poll(() => density('canvas[data-detail-page="1"]')).toBe(2);
      expect(await density('canvas[data-page="1"]')).toBeLessThan(2);
      expect(errors).toEqual([]);
    });
  });

  test('high contrast mode: pages are drawn in the system colours', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.emulateMedia({ forcedColors: 'active', colorScheme: 'dark' });
    await openPdf(page, 'find.pdf', findPdf());
    // The page's background: the system's dark Canvas, not white.
    await expect
      .poll(() =>
        page.evaluate(() => {
          const canvas = document.querySelector<HTMLCanvasElement>(
            'canvas[data-page="1"]',
          );
          const pixel = canvas?.getContext('2d')?.getImageData(2, 2, 1, 1).data;
          return pixel ? Array.from(pixel.slice(0, 3)) : null;
        }),
      )
      .toEqual([0, 0, 0]);
    expect(errors).toEqual([]);
  });
});
