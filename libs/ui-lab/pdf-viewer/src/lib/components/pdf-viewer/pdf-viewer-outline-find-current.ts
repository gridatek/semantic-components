import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Opens the current bookmark's parents and brings it into view (as
 * pdf.js's "find current outline item").
 */
@Directive({
  selector: 'button[scPdfViewerOutlineFindCurrent]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'pdfViewer.revealCurrentOutlineItem()',
  },
})
export class ScPdfViewerOutlineFindCurrent {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly disabled = computed(
    () => !this.pdfViewer.currentOutlineItem(),
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
