import { Directive, computed, inject, input } from '@angular/core';
import { ScButton, bindInput, cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Prints the document (with a progress dialog); disabled until it has loaded. Use on a `scButton`, which it disables.
 */
@Directive({
  selector: 'button[scPdfViewerPrint]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.printWithProgress()',
  },
})
export class ScPdfViewerPrint {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    bindInput(
      inject(ScButton).disabled,
      computed(() => !this.pdfViewer.pdfDocument()),
    );
  }
}
