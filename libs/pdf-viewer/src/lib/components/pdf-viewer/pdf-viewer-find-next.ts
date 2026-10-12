import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Goes to the next match; disabled while there are none. Use on a `scButton`, which it disables.
 */
@Directive({
  selector: 'button[scPdfViewerFindNext]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.findNext()',
  },
})
export class ScPdfViewerFindNext {
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
