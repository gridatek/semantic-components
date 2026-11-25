import { Directive, computed, inject, input, signal } from '@angular/core';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';

/**
 * Writes an annotation's comment (`viewer.pendingComment()`, asked by the
 * comment button of pdf.js's toolbar on the annotation), starting from its
 * text: submitting posts it (`#form="scPdfViewerNextCommentForm"`,
 * `form.text()`). Show it while a comment is pending; put a
 * `scPdfViewerNextCommentInput` and a `scPdfViewerNextCommentCancel` button in it.
 */
@Directive({
  selector: 'form[scPdfViewerNextCommentForm]',
  exportAs: 'scPdfViewerNextCommentForm',
  host: {
    'data-slot': 'pdf-viewer-comment-form',
    '[class]': 'class()',
    '(submit)': 'submit($event)',
  },
})
export class ScPdfViewerNextCommentForm {
  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.classInput()));

  readonly text = signal(this.pdfViewer.pendingComment()?.text ?? '');

  private submit(event: Event): void {
    event.preventDefault();
    const text = this.text().trim();
    if (!text) return;
    this.pdfViewer.postComment(text);
    this.text.set('');
  }
}
