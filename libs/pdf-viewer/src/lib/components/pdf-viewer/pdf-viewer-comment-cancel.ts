import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Gives up on the comment being placed or written. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerCommentCancel]',
  host: {
    '[class]': 'class()',
    '(click)': 'pdfViewer.cancelComment()',
  },
})
export class ScPdfViewerCommentCancel {
  protected readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
