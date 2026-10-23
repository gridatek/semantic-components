import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
} from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfComment } from './pdf-viewer-types';

/**
 * Deletes a comment. Use and name it.
 */
@Directive({
  selector: 'button[scPdfViewerCommentRemove]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.removeComment(comment().id)',
  },
})
export class ScPdfViewerCommentRemove {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly comment = input.required<ScPdfComment>({
    alias: 'scPdfViewerCommentRemove',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
