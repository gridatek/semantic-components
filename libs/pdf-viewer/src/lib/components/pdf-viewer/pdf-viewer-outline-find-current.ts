import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens the current bookmark's parents and brings it into view (as
 * pdf.js's "find current outline item"). Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerOutlineFindCurrent]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.revealCurrentOutlineItem()',
  },
})
export class ScPdfViewerOutlineFindCurrent {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.pdfViewer.currentOutlineItem()),
    );
  }
}
