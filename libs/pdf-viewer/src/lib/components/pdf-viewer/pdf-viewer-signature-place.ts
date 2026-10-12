import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfSignatureData } from './pdf-viewer-types';

/**
 * Places a saved signature (`viewer.savedSignatures()`) on the current
 * page. Use on a `scButton` and name it.
 */
@Directive({
  selector: 'button[scPdfViewerSignaturePlace]',
  host: {
    '[class]': 'class()',
    '(click)':
      'pdfViewer.placeSignature(signature().dataUrl, signature().description)',
  },
})
export class ScPdfViewerSignaturePlace {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly signature = input.required<ScPdfSignatureData>({
    alias: 'scPdfViewerSignaturePlace',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
