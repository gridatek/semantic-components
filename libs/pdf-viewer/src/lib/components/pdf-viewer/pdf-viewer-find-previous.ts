import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Goes to the previous match; disabled while there are none. Use on a `scButton`, which it disables.
 */
@Directive({
  selector: 'button[scPdfViewerFindPrevious]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.findPrevious()',
  },
})
export class ScPdfViewerFindPrevious {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => this.pdfViewer.findTotalMatches() === 0),
    );
  }
}
