import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfSignatureData } from './pdf-viewer-types';

/**
 * Removes a saved signature (`viewer.savedSignatures()`). Name it.
 */
@Directive({
  selector: 'button[scPdfViewerSignatureRemove]',
  host: {
    type: 'button',
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
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('xs');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
