import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens the `signature` dialog to make a new signature. Use on a
 * `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerSignatureNew]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.openSignatureDialog()',
  },
})
export class ScPdfViewerSignatureNew {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
