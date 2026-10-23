import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfSignatureData } from './pdf-viewer-types';

/**
 * Places a saved signature (`viewer.savedSignatures()`) on the current
 * page. Use and name it.
 */
@Directive({
  selector: 'button[scPdfViewerSignaturePlace]',
  host: {
    type: 'button',
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
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
