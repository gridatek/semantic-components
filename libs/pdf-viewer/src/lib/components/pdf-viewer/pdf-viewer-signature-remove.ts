import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfSignatureData } from './pdf-viewer-types';

/**
 * Removes a saved signature (`viewer.savedSignatures()`). Use on a
 * `scButton` and name it.
 */
@Directive({
  selector: 'button[scPdfViewerSignatureRemove]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.removeSavedSignature(signature().id)',
  },
})
export class ScPdfViewerSignatureRemove {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly signature = input.required<ScPdfSignatureData>({
    alias: 'scPdfViewerSignatureRemove',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
