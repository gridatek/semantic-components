import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Cuts the selected pages: copies, then deletes them — paste them elsewhere
 * to move them. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerCutPages]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.cutPages(pdfViewer.pageSelection())',
  },
})
export class ScPdfViewerCutPages {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(
        () =>
          !this.pdfViewer.pageSelection().length || this.pdfViewer.organizing(),
      ),
    );
  }
}
