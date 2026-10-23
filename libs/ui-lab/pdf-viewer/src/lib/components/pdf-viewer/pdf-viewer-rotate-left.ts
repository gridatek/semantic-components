import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Rotates the pages 90° counterclockwise.
 */
@Directive({
  selector: 'button[scPdfViewerRotateLeft]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.rotateLeft()',
  },
})
export class ScPdfViewerRotateLeft {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
