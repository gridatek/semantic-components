import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  ScPopoverProvider,
  injectStyle,
} from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfSignatureData } from './pdf-viewer-next-types';

/**
 * Places a saved signature (`viewer.savedSignatures()`) on the current
 * page. Use and name it.
 */
@Directive({
  selector: 'button[scPdfViewerNextSignaturePlace]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)':
      'pdfViewer.placeSignature(signature().dataUrl, signature().description); popover?.open.set(false)',
  },
})
export class ScPdfViewerNextSignaturePlace {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  /** The popover of your list of signatures, which closes. */
  private readonly popover = inject(ScPopoverProvider, { optional: true });
  readonly signature = input.required<ScPdfSignatureData>({
    alias: 'scPdfViewerNextSignaturePlace',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
