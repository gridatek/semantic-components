import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';
import { findPdf, lockedPdf, openPdf, taggedPdf } from './pdf-fixtures';

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
    const tree = page.locator('.page[data-page-number="1"] canvas .structTree');

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

  test('another file dropped while the first still fetches its pages: the first let go quietly (no "Transport destroyed")', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    // A busy worker, as on CI: pdf.js's requests for the sample's other pages
    // still being worked on when the file is dropped — held 1s, answered
    // before the worker hears it's done with (Terminate), as a busy one would.
    await page.addInitScript(() => {
      const send = Worker.prototype.postMessage;
      const held: (() => void)[] = [];
      const flush = () => held.splice(0).forEach((go) => go());
      Worker.prototype.postMessage = function (
        this: Worker,
        message: unknown,
        ...rest: never[]
      ) {
        const m = message as { action?: string; data?: { pageIndex?: number } };
        const go = () => send.call(this, message, ...rest);
        if (m?.action === 'GetPage' && (m.data?.pageIndex ?? 0) > 0) {
          held.push(go);
          setTimeout(flush, 1000);
        } else {
          if (m?.action === 'Terminate') flush();
          go();
        }
      } as typeof send;
    });
    await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
    // Dropped the moment the sample's first page is drawn: pdf.js has just
    // asked for all the others, none answered yet.
    const bytes = [...findPdf()];
    await page.evaluate((bytes) => {
      const observer = new MutationObserver(() => {
        if (
          !document.querySelector('.page[data-page-number="1"] .textLayer span')
        )
          return;
        observer.disconnect();
        const data = new DataTransfer();
        data.items.add(
          new File([new Uint8Array(bytes)], 'find.pdf', {
            type: 'application/pdf',
          }),
        );
        const content = document.querySelector(
          '[data-slot=pdf-viewer-content]',
        );
        content?.dispatchEvent(
          new DragEvent('drop', {
            dataTransfer: data,
            bubbles: true,
            cancelable: true,
          }),
        );
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }, bytes);
    await expect(page.getByTestId('page-count')).toHaveText('/ 1', {
      timeout: 20_000,
    });
    await expect(
      page.locator('.page[data-page-number="1"] .textLayer'),
    ).toContainText('cat and cat and cat');
    // The sample was let go once its pages were in: nothing came late.
    await expect(page.locator('.page')).toHaveCount(1);
    expect(errors).toEqual([]);
  });

  test('permissions: a locked document cannot be printed, copied or annotated', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    const print = page.getByRole('button', { name: 'Print' });
    const tools = page.getByRole('group', { name: 'Annotation tool' });

    // An ordinary document first: all allowed.
    await openPdf(page, 'find.pdf', findPdf());
    await expect(print).toBeEnabled();
    await expect(
      tools.getByRole('button', { name: 'Highlight' }),
    ).toBeEnabled();

    await openPdf(page, 'locked.pdf', lockedPdf());
    await expect(
      page.locator('.page[data-page-number="1"] .textLayer'),
    ).toContainText('A locked document');
    await expect(print).toBeDisabled();
    await expect(
      tools.getByRole('button', { name: 'Highlight' }),
    ).toBeDisabled();

    // Copying the text puts nothing on the clipboard.
    const copied = await page.evaluate(() => {
      const span = document.querySelector(
        '.page[data-page-number="1"] .textLayer span[role="presentation"]',
      ) as HTMLElement;
      document.getSelection()?.selectAllChildren(span);
      const clipboardData = new DataTransfer();
      const event = new ClipboardEvent('copy', {
        clipboardData,
        bubbles: true,
        cancelable: true,
      });
      span.dispatchEvent(event);
      return {
        text: clipboardData.getData('text/plain'),
        prevented: event.defaultPrevented,
      };
    });
    expect(copied).toEqual({ text: '', prevented: true });

    // Ctrl+P doesn't print either.
    await page.locator('[role="document"]').focus();
    await page.keyboard.press('Control+p');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test('document properties', async ({ page }) => {
    const errors = collectErrors(page);
    await openPdf(page, 'find.pdf', findPdf());
    await page.getByRole('button', { name: 'More' }).click();
    await page.getByRole('menuitem', { name: 'Document properties…' }).click();
    const dialog = page.getByRole('dialog', { name: 'Document properties' });
    await expect(dialog).toBeVisible();
    const value = (term: string) =>
      dialog.locator(`dt:text-is("${term}") + dd`);
    await expect(value('File name')).toHaveText('find.pdf');
    await expect(value('Page count')).toHaveText('1');
    await expect(value('PDF version')).toHaveText('1.7');
    // 612 × 792 points.
    await expect(value('Page size')).toHaveText(
      '8.50 × 11.00 in (216 × 279 mm, Letter, portrait)',
    );
    await dialog.getByRole('button', { name: 'Close' }).click();
    await expect(dialog).toBeHidden();
    expect(errors).toEqual([]);
  });

  test.describe('on a dense screen', () => {
    test.use({ deviceScaleFactor: 2 });

    test('high zoom: the visible part is drawn sharp', async ({ page }) => {
      const errors = collectErrors(page);
      await openPdf(page, 'find.pdf', findPdf());
      // pdf.js's detail canvas: the second one in the page's canvas wrapper.
      const DETAIL =
        '.page[data-page-number="1"] .canvasWrapper canvas + canvas';
      const detail = page.locator(DETAIL);
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
      await expect.poll(() => density(DETAIL)).toBe(2);
      expect(
        await density('.page[data-page-number="1"] .canvasWrapper canvas'),
      ).toBeLessThan(2);
      expect(errors).toEqual([]);
    });
  });

  test('high contrast mode: pages are drawn in the system colours', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === 'webkit',
      "pdf.js draws page colours with a canvas filter, which WebKit's canvas doesn't apply",
    );
    const errors = collectErrors(page);
    await page.emulateMedia({ forcedColors: 'active', colorScheme: 'dark' });
    await openPdf(page, 'find.pdf', findPdf());
    // The page's background: the system's Canvas colour (black in a dark
    // scheme where the browser emulates it; Firefox keeps it white).
    const canvasColour = await page.evaluate(() => {
      const probe = document.createElement('canvas');
      const context = probe.getContext('2d') as CanvasRenderingContext2D;
      const div = document.createElement('div');
      div.style.color = 'Canvas';
      document.body.append(div);
      context.fillStyle = getComputedStyle(div).color;
      div.remove();
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data.slice(0, 3));
    });
    await expect
      .poll(() =>
        page.evaluate(() => {
          const canvas = document.querySelector<HTMLCanvasElement>(
            '.page[data-page-number="1"] canvas',
          );
          const pixel = canvas?.getContext('2d')?.getImageData(2, 2, 1, 1).data;
          return pixel ? Array.from(pixel.slice(0, 3)) : null;
        }),
      )
      .toEqual(canvasColour);
    expect(errors).toEqual([]);
  });
});
