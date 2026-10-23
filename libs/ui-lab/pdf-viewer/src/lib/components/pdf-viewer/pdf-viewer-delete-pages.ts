import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Deletes the selected pages (not all of them); undoable from the undo bar.
 *
 */
@Directive({
  selector: 'button[scPdfViewerDeletePages]',
  host: {
    type: 'button',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
    '(click)': 'pdfViewer.deletePages(pdfViewer.pageSelection())',
  },
})
export class ScPdfViewerDeletePages {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly disabled = computed(
    () =>
      !this.pdfViewer.pageSelection().length ||
      this.pdfViewer.pageSelection().length >= this.pdfViewer.totalPages() ||
      this.pdfViewer.organizing(),
  );

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
