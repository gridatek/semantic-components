import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfSignatureData } from './pdf-viewer-next-types';

/**
 * Removes a saved signature (`viewer.savedSignatures()`). Name it.
 */
@Directive({
  selector: 'button[scPdfViewerNextSignatureRemove]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.removeSavedSignature(signature().id)',
  },
})
export class ScPdfViewerNextSignatureRemove {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly signature = input.required<ScPdfSignatureData>({
    alias: 'scPdfViewerNextSignatureRemove',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('xs');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
