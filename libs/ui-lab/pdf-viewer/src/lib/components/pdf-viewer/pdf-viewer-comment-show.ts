import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfComment } from './pdf-viewer-types';

/**
 * Selects a comment and shows its page.
 */
@Directive({
  selector: 'button[scPdfViewerCommentShow]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.showComment(comment().id)',
  },
})
export class ScPdfViewerCommentShow {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly comment = input.required<ScPdfComment>({
    alias: 'scPdfViewerCommentShow',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('link');
  readonly size = input<ScButtonVariants['size']>('xs');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
