import { Directive, computed, inject, input } from '@angular/core';
import { type ScButtonVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_PDF_VIEWER_NEXT } from './pdf-viewer-next';
import type { ScPdfComment } from './pdf-viewer-next-types';

/**
 * Edits a comment written in the viewer, in your comment form (it's then
 * `viewer.pendingComment()`, with its text). Use and name it.
 */
@Directive({
  selector: 'button[scPdfViewerNextCommentEdit]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'pdfViewer.editComment(comment().id)',
  },
})
export class ScPdfViewerNextCommentEdit {
  private readonly buttonStyles = injectStyle().button;

  private readonly pdfViewer = inject(SC_PDF_VIEWER_NEXT);
  readonly comment = input.required<ScPdfComment>({
    alias: 'scPdfViewerNextCommentEdit',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
