import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER } from './pdf-viewer';

/**
 * Writes the comment just placed on a page (`viewer.pendingComment()`):
 * submitting posts it (`#form="scPdfViewerCommentForm"`, `form.text()`).
 * Show it while a comment is pending; put a `scPdfViewerCommentInput` and a
 * `scPdfViewerCommentCancel` button in it.
 */
@Directive({
  selector: 'form[scPdfViewerCommentForm]',
  exportAs: 'scPdfViewerCommentForm',
  host: {
    'data-slot': 'pdf-viewer-comment-form',
    '[class]': 'class()',
    '(submit)': 'submit($event)',
  },
})
export class ScPdfViewerCommentForm {
  private readonly pdfViewer = inject(SC_PDF_VIEWER);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  readonly text = signal('');

  private submit(event: Event): void {
    event.preventDefault();
    const text = this.text().trim();
    if (!text) return;
    this.pdfViewer.postComment(text);
    this.text.set('');
  }
}
