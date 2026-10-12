import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer';
import type { ScPdfComment } from './pdf-viewer-types';

/**
 * Selects a comment and shows its page. Use on a `scButton`.
 */
@Directive({
  selector: 'button[scPdfViewerCommentShow]',
  host: {
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

  protected readonly class = computed(() => cn(this.classInput()));
}
