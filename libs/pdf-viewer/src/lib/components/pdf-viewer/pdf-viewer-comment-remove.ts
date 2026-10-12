import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfComment } from './pdf-viewer-types';

/**
 * Deletes a comment. Use on a `scButton` and name it.
 */
@Directive({
  selector: 'button[scPdfViewerCommentRemove]',
  host: {
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

  protected readonly class = computed(() => cn(this.classInput()));
}
