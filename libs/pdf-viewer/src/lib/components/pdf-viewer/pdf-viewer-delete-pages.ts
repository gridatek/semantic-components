import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Deletes the selected pages (not all of them); undoable from the undo bar.
 * Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerDeletePages]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.deletePages(pdfViewer.pageSelection())',
  },
})
export class ScPdfViewerDeletePages {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(
        () =>
          !this.pdfViewer.pageSelection().length ||
          this.pdfViewer.pageSelection().length >=
            this.pdfViewer.totalPages() ||
          this.pdfViewer.organizing(),
      ),
    );
  }
}
