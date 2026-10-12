import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Moves the selected pages one place earlier; they stay selected. Use on a
 * `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerMovePagesEarlier]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.moveSelectedPages(-1)',
  },
})
export class ScPdfViewerMovePagesEarlier {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(
        () =>
          !this.pdfViewer.pageSelection().length ||
          this.pdfViewer.pageSelection()[0] === 1 ||
          this.pdfViewer.organizing(),
      ),
    );
  }
}
